import Path from "./Path";
import Node from "./node";
import Parser from "./parser";

// Main function
async function main() {
  try {
    const finalPath: Path = new Path();

    finalPath.nodeList = await Parser.parseNode("node_edge_info/L1Nodes.csv");
    finalPath.edgeList = await Parser.parseEdge("node_edge_info/L1Edges.csv");
    finalPath.generateNodeMap();

    const node1: Node = finalPath.nodeMap.get("CCONF002L1")!;
    const node2: Node = finalPath.nodeMap.get("CHALL012L1")!;
    const temp: Node[] = finalPath.BFS(node1, node2);
    for (let i = 0; i < temp.length; i++) {
      console.log("Path", i, ":", temp[i].nodeID);
    }
  } catch (error) {
    console.error(error);
  }
}

export default Node;
main();
