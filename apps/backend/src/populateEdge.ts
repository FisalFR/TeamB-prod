import client from "./bin/database-connection";
import EdgeType from "common/src/EdgeType";
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
        await prisma.l1Nodes.create({
          data: {
            eid: edgeData[i][0],
            startNodeID: edgeData[i][1],
            endNodeID: edgeData[i][2],
          },
        });
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  static async populateManyEdgeDB(edgeData: EdgeType[]) {
    try {
      edgeData.length;
      await prisma.l1Edges.createMany({
        data: edgeData,
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default populateEdge;
