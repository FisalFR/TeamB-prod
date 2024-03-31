import fs from "fs";

class readNode {
  //Reads in a node csv file and returns it in an array variable
  static async readNodeCSV(nodeCSV: string) {
    const node = fs
      .readFileSync(nodeCSV, { encoding: "utf-8" })
      .split("\r\n")
      .map((row: string): string[] => {
        return row.split(",");
      });
    node.shift();
    console.log("Success reading in Node");
    //console.log(node);
    return node;
  }
}

export default readNode;
