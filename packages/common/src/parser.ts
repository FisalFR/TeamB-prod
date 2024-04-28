import path from "path";
import fs from "fs";
import { parse } from "csv-parse";
import Node from "./nodes-and-edges/node.ts";
import Edge from "./nodes-and-edges/edge.ts";

class Parser {
  static async parseNode(nodeFilePath: string): Promise<Node[]> {
    const csvFilePath = path.resolve(__dirname, nodeFilePath);
    const headers = [
      "nodeID",
      "xcoord",
      "ycoord",
      "floor",
      "building",
      "nodeType",
      "longName",
      "shortName",
    ];
    const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });

    return new Promise((resolve, reject) => {
      parse(
        fileContent,
        { delimiter: ",", columns: headers },
        (error, result: Node[]) => {
          if (error) {
            console.error(error);
            reject(error);
          }
          resolve(result);
        },
      );
    });
  }

  static async parseEdge(edgeFilePath: string): Promise<Edge[]> {
    const csvFilePath = path.resolve(__dirname, edgeFilePath);
    const headers = ["startNodeID", "endNodeID"];
    const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });

    return new Promise((resolve, reject) => {
      parse(
        fileContent,
        { delimiter: ",", columns: headers },
        (error, result: Edge[]) => {
          if (error) {
            console.error(error);
            reject(error);
          }
          resolve(result);
        },
      );
    });
  }
}

export default Parser;
