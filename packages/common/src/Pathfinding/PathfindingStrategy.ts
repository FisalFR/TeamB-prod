import Node from "../node.ts";

interface PathfindingStrategy {
    execute(startNode: Node, endNode: Node): Node[];
    reconstructPath(cameFrom: Map<Node, Node>, startNode: Node, endNode: Node):Node[];
}
export default PathfindingStrategy;
