import PathfindingStrategy from "./PathfindingStrategy.ts";
import Node from "../node.ts";
import PathfindingTemplate from "./TemplatePathfindingStrategy.ts";

class DijkstraStrategy extends PathfindingTemplate implements  PathfindingStrategy {
    heuristic(endNode: Node, nextNode: Node, currentNode:Node): number {
        console.log(endNode);
        console.log(nextNode);
        console.log(currentNode);
        return 0;
    }
}

export default DijkstraStrategy;
