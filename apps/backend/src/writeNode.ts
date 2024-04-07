import fs from "fs";
import { PrismaClient } from "../../../packages/database/.prisma/client";
import client from "./bin/database-connection";
const prisma = client;

export class writeNode {
  //gets data from nodes table, and puts them into a csv file
  static async nodeBackToCSV() {
    //nodes
    //fetch the data from the table
    const nodesData = await prisma.nodes.findMany();

    //creates the header row in the csv file
    const headersNodes = [
      "nodeID",
      "xcoord",
      "ycoord",
      "floor",
      "building",
      "nodeType",
      "longName",
      "shortName",
    ];
    let finalNodesString = headersNodes.join(",") + "\n";

    // create the rows for the csv file
    nodesData.forEach((node) => {
      const row = [
        node.nodeID,
        node.xcoord,
        node.ycoord,
        node.floor,
        node.building,
        node.nodeType,
        node.longName,
        node.shortName,
      ];
      finalNodesString += row.join(",") + "\n";
    });

    // use fs to write to the data to csv file
    fs.writeFileSync("../../data/nodesBack.csv", finalNodesString);
    console.log("Wrote to the data nodesBack.csv file");
  }

  static async nodeDownload() {
    //nodes
    //fetch the data from the table
    const nodesData = await prisma.nodes.findMany();

    //creates the header row in the csv file
    const headersNodes = [
      "nodeID",
      "xcoord",
      "ycoord",
      "floor",
      "building",
      "nodeType",
      "longName",
      "shortName",
    ];
    let finalNodesString = headersNodes.join(",") + "\n";

    // create the rows for the csv file
    nodesData.forEach((node) => {
      const row = [
        node.nodeID,
        node.xcoord,
        node.ycoord,
        node.floor,
        node.building,
        node.nodeType,
        node.longName,
        node.shortName,
      ];
      finalNodesString += row.join(",") + "\n";
    });
    return finalNodesString;
  }
}
export default writeNode;
