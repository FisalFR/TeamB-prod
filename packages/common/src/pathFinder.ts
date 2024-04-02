import Node from "./node";
import Edge from "./edge";
import Queue from "./Queue";
import PriorityQueue from "./PriorityQueue.ts";

class Path {
  nodeList: Node[];
  edgeList: Edge[];
  finalPath: Node[];
  nodeMap: Map<string, Node>;

  constructor() {
    this.nodeList = [];
    this.edgeList = [];
    this.finalPath = [];
    this.nodeMap = new Map<string, Node>();
  }

  // Heuristics
    heuristic(a: Node, b: Node): number {
      return Math.sqrt((a.xcoord - b.xcoord) ** 2 + (a.ycoord - b.ycoord) ** 2);
    }


  // Function to return the path from startNode to endNode using A*
    AStar(startNode: Node, endNode: Node): Node[] {
        const frontier: PriorityQueue<Node> = new PriorityQueue<Node>();
        frontier.insert(startNode, 0);
        const cameFrom = new Map();
        const costSoFar: Map<Node, number> = new Map();
        cameFrom.set(startNode, null);
        costSoFar.set(startNode, 0);

        while (!frontier.isEmpty()) {
        const current = frontier.pop()!;
        if (current.nodeID == endNode.nodeID) {
            break;
        }
        for (const next of current.neighbors) {
            const newCost = costSoFar.get(current)! + 1;
            if (!costSoFar.has(next) || newCost < costSoFar.get(next)!) {
            costSoFar.set(next, newCost);
            const priority = newCost + this.heuristic(endNode, next);
            frontier.insert(next, priority);
            cameFrom.set(next, current);
            }
        }
        }
        return this.reconstructPath(cameFrom, startNode, endNode);
    }

  // Function to return the path from startNode to endNode using BFS
  BFS(startNode: Node, endNode: Node): Node[] {
    const frontier: Queue<Node> = new Queue<Node>();
    frontier.enqueue(startNode);
    const cameFrom = new Map();
    cameFrom.set(startNode, null);

    while (!frontier.isEmpty()) {
      const current = frontier.dequeue()!;
      if (current.nodeID == endNode.nodeID) {
        break;
      }
      for (const next of current.neighbors) {
        if (!cameFrom.has(next)) {
          frontier.enqueue(next);
          cameFrom.set(next, current);
        }
      }
    }
    return this.reconstructPath(cameFrom, startNode, endNode);
  }

  // Function to generate Node Maps
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

  private reconstructPath(
    cameFrom: Map<any, any>,
    startNode: Node,
    endNode: Node,
  ) {
    const path = [];
    while (endNode != startNode) {
      path.push(endNode);
      endNode = cameFrom.get(endNode);
    }
    path.push(startNode);
    return path.reverse();
  }
}

export default Path;
