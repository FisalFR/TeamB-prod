import PathfindingStrategy from "./pathfinding-strategy.ts";
import Node from "../nodes-and-edges/node.ts";
import PathfindingTemplate from "./template-pathfinding-strategy.ts";

class DijkstraStrategy extends PathfindingTemplate implements  PathfindingStrategy {
    heuristic(endNode: Node, nextNode: Node, currentNode:Node): number {
        console.log(endNode);
        console.log(nextNode);
        console.log(currentNode);
        return 0;
    }
}

export default DijkstraStrategy;
