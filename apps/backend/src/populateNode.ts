import client from "./bin/database-connection";
const prisma = client;

class populateNode {
  //Populates the database by looping through the array for each attribute and for each
  //attribute add it to the column for the database
  static async populateNodeDB(nodeData: string[][]) {
    for (let i = 0; i < nodeData.length; i++) {
      //Checks for empty space at the end of the csv file
      if (nodeData[i][0] == "") {
        break;
      }
      await prisma.l1Nodes.create({
        data: {
          nodeID: nodeData[i][0],
          xcoord: parseInt(nodeData[i][1]),
          ycoord: parseInt(nodeData[i][2]),
          floor: nodeData[i][3],
          building: nodeData[i][4],
          nodeType: nodeData[i][5],
          longName: nodeData[i][6],
          shortName: nodeData[i][7],
        },
      });
    }
  }
}

export default populateNode;
