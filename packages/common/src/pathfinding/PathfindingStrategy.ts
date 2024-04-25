import Node from "../node.ts";

abstract class  PathfindingStrategy {
    abstract execute(startNode: Node, endNode: Node): Node[];
    reconstructPath(cameFrom: Map<Node, Node>, startNode: Node, endNode: Node) {
        const path = [];
        while (endNode != startNode) {
            path.push(endNode);
            endNode = cameFrom.get(endNode);
        }
        path.push(startNode);
        return path.reverse();
    }
}
export default PathfindingStrategy;
