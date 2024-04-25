import fs from "fs";
import { PrismaClient } from "database/.prisma/client";
import client from "../bin/database-connection";
const prisma = client;

class writeEdge {
  static async edgesBackToCSV() {
    //fetch the data from the table
    const edgesData = await prisma.edges.findMany();

    //creates the header row in the csv file
    const headersEdges = ["startNodeID", "endNodeID"];

    // create the rows for the csv file
    let finalEdgesString = headersEdges.join(",") + "\n";
    edgesData.forEach((edge) => {
      const row = [edge.startNodeID, edge.endNodeID];
      finalEdgesString += row.join(",") + "\n";
    });
    // use fs to write to the csv file
    fs.writeFileSync("../../data/edgesBack.csv", finalEdgesString);
    console.log("Wrote to the data edgesBack.csv file");
  }

  static async edgeDownload() {
    //fetch the data from the table
    const edgesData = await prisma.edges.findMany();

    //creates the header row in the csv file
    const headersEdges = ["edgeID", "startNodeID", "endNodeID"];

    // create the rows for the csv file
    let finalEdgesString = headersEdges.join(",") + "\n";
    edgesData.forEach((edge) => {
      const row = [edge.edgeID, edge.startNodeID, edge.endNodeID];
      finalEdgesString += row.join(",") + "\n";
    });
    // use fs to write to the csv file
    return finalEdgesString;
  }
}
export default writeEdge;
