import fs from "fs";

class readEdge {
  //Reads in an edge csv and returns it in an array variable
  static async readEdgeCSV(edgeCSV: string) {
    const edge = fs
      .readFileSync(edgeCSV, { encoding: "utf-8" })
      .split("\r\n")
      .map((row: string): string[] => {
        return row.split(",");
      });
    edge.shift();
    console.log("Success reading in Edge");
    //console.log(edge);
    return edge;
  }
}
export default readEdge;
