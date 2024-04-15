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
    heuristic(endNode: Node, nextNode: Node, currentNode:Node): number {
      const endFloor: number  = Path.convertFloor(endNode.floor);
      const nextFloor: number = Path.convertFloor(nextNode.floor);
      // const currentFloor: number = Path.convertFloor(currentNode.floor);
      let EuclideanDistance = Math.sqrt((endNode.ycoord - nextNode.ycoord) ** 2 + (endNode.xcoord - nextNode.xcoord) ** 2);
      const DistToElevL: number = Math.sqrt((924 -nextNode.ycoord) ** 2 + (1785 - nextNode.xcoord) ** 2);
      const DistToElevQ: number = Math.sqrt((1825 -nextNode.ycoord) ** 2 + (1751 - nextNode.xcoord) ** 2);
      const floorDifference = Math.abs(endFloor - nextFloor);

      if ((endNode.building === "Shapiro" || endNode.building === "BTM") && (nextNode.building !== endNode.building )){
          if((nextFloor === 1 && endFloor == 1) && endNode.building === "Shapiro"){
              return EuclideanDistance/2;
          } else if(nextFloor === 4 || (nextFloor === 4 && endNode.building === "BTM")){
              return EuclideanDistance/2;
          }
      }

      if (endNode.building === "Shapiro" && nextNode.building === "Shapiro" && endNode.floor === "L1"){
          if(nextNode.nodeType === "ELEV" && nextNode.longName.includes("Elevator Q")){
                return 0;
          } else if (nextNode.nodeType === "ELEV" && !nextNode.longName.includes("Elevator Q")){
              return 10000;
          } else {
              return DistToElevQ;
          }
      }

        if(endNode.building === "Tower" && nextNode.building !== endNode.building) {
            if (nextNode.nodeType === "ELEV" && nextNode.shortName.includes("Elevator L")) {
                return 0;
            } else if (nextNode.nodeType === "ELEV" && !nextNode.shortName.includes("Elevator L")) {
                return 10000;
            } else {
                return DistToElevL;
            }
        }

      // If we approach an ELEVATOR, prioritize if we're on the wrong floor
      // Otherwise,  DON'T TAKE THE ELEVATOR
      if((nextNode.nodeType === "ELEV" && currentNode.nodeType !== "ELEV")){
          if(nextFloor !== endFloor){
                return EuclideanDistance + floorDifference;
          } else if (nextFloor === endFloor){
              return EuclideanDistance + 10;
          }
      }

        // If we approach a STAIR, prioritize if we're on the wrong floor
        // Otherwise,  DON'T TAKE THE STAIRS
      if((nextNode.nodeType === "STAI" && currentNode.nodeType !== "STAI")){
            if(nextFloor !== endFloor){
                return EuclideanDistance + (floorDifference *2);
            } else if (nextFloor === endFloor){
                return EuclideanDistance + 10;
            }
      }

      if (endFloor === nextFloor){
          return EuclideanDistance + 10;
      } else if (endFloor !== nextFloor){
          return EuclideanDistance + 1000;
      }

    }


  // Function to return the path from startNode to endNode using A* algorithm
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
                    const priority = newCost + this.heuristic(endNode, next, current);
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

    // Function to return the path from startNode to endNode using Dijkstra's algorithm
    Dijkstra(startNode: Node, endNode: Node): Node[] {
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
                    const priority = newCost;
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
