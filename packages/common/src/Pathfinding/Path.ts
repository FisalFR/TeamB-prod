import PathfindingStrategy from "./PathfindingStrategy.ts";
import Node from "../node.ts";
import Edge from "../edge.ts";

class Path {
  private strategy: PathfindingStrategy;
  nodeList: Node[];
  edgeList: Edge[];
  finalPath: Node[];
  nodeMap: Map<string, Node>;

  constructor(strategy: PathfindingStrategy) {
    this.nodeList = [];
    this.edgeList = [];
    this.finalPath = [];
    this.nodeMap = new Map<string, Node>();
    this.strategy = strategy;
  }

  findPath(startNode: Node, endNode: Node): Node[] {
    return this.strategy.execute(startNode, endNode);
  }

  setStrategy(strategy: PathfindingStrategy) {
    this.strategy = strategy;
  }

  generateNodeMap(): Map<string, Node> {
        for (const node of this.nodeList) {
            node.neighbors = []; // Initialize neighbors array
            this.nodeMap.set(node.nodeID, node);
        }
        // Assign neighbors to nodes using edge information
        for (const edge of this.edgeList) {
            const startNode = this.nodeMap.get(edge.startNodeID);
            const endNode = this.nodeMap.get(edge.endNodeID);
            if (startNode && endNode) {
                startNode.neighbors.push(endNode);
                endNode.neighbors.push(startNode); // If bidirectional edges are considered
            }
        }

        return this.nodeMap;
  }

}
export default Path;
