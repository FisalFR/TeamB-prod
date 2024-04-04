import client from "./bin/database-connection";
const prisma = client;

class populateEdge {
  //Populates the database by looping through the array for each attribute and for each
  //attribute add it to the column for the database
  static async populateEdgeDB(edgeData: string[][]) {
    try {
      for (let i = 0; i < edgeData.length; i++) {
        //Checks for empty space at the end of the csv file
        if (edgeData[i][0] == "") {
          break;
        }
        await prisma.l1Edges.create({
          data: {
            startNodeID: edgeData[i][0],
            endNodeID: edgeData[i][1],
          },
        });
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default populateEdge;
