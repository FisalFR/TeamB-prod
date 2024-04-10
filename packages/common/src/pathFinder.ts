import Node from "./node";
import Edge from "./edge";
import Queue from "./Queue";
import PriorityQueue from "./PriorityQueue";
import Stack from "./Stack";

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

  static convertFloor(floor: string): number {
      let result: number = 0;

      switch (floor){
          case "3":
              result = 5;
              break;
          case "2":
              result = 4;
              break;
          case "1":
              result = 3;
              break;
          case "L1":
              result = 2;
              break;
          case "L2":
              result = 1;
              break;
      }
      return result;

  }


  // Heuristics
    heuristic(a: Node, b: Node): number {
      const endFloor: number  = Path.convertFloor(a.floor);
      const nextFloor: number = Path.convertFloor(b.floor);

      const EuclideanDistance = Math.sqrt((a.ycoord - b.ycoord) ** 2 + (a.xcoord - b.xcoord) ** 2);


      if((b.nodeType=== "ELEV" || b.nodeType === "STAI")){
          if(nextFloor !== endFloor){
              return 0;
          } else if (nextFloor === endFloor){
              return 1000000;
          }
      }

      if (endFloor === nextFloor){
          return EuclideanDistance/1000000;
      } else if (endFloor !== nextFloor){
          return EuclideanDistance *1000000;
      }

        return EuclideanDistance;
    }


  // Function to return the path from startNode to endNode using A* algorithm
    AStar(startNode: Node, endNode: Node): Node[] {
        console.log("I MADE IT TO A STAR");
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
        if (cameFrom.has(endNode)) {
            return this.reconstructPath(cameFrom, startNode, endNode);
        }
        else {
            return [];
        }
    }


  // Function to return the path from startNode to endNode using DFS
  DFS(startNode: Node, endNode: Node): Node[] {
    console.log("I MADE IT TO DFS");
    const frontier: Stack<Node> = new Stack<Node>();
    frontier.push(startNode);
    const cameFrom = new Map();
    cameFrom.set(startNode, null);

    while (!frontier.isEmpty()) {
      const current = frontier.pop()!;
      if (current.nodeID == endNode.nodeID) {
        break;
      }
      for (const next of current.neighbors) {
        if (!cameFrom.has(next)) {
          frontier.push(next);
          cameFrom.set(next, current);
        }
      }
    }
      if (cameFrom.has(endNode)) {
          return this.reconstructPath(cameFrom, startNode, endNode);
      }
      else {
          return [];
      }
  }

  // Function to return the path from startNode to endNode using BFS
  BFS(startNode: Node, endNode: Node): Node[] {
    console.log("I MADE IT TO BFS");
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
    if (cameFrom.has(endNode)) {
        return this.reconstructPath(cameFrom, startNode, endNode);
    }
    else {
        return [];
    }
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
    cameFrom: Map<Node, Node>,
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
