import PathfindingStrategy from "./PathfindingStrategy.ts";
import Stack from "../stack.ts";
import Node from "../node.ts";

class DFSStrategy extends PathfindingStrategy {
    execute(startNode: Node, endNode: Node): Node[] {
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

    reconstructPath(cameFrom: Map<Node, Node>, startNode: Node, endNode: Node): Node[] {
        const path: Node[] = [];
        let current = endNode;
        while (current.nodeID != startNode.nodeID) {
            path.unshift(current);
            current = cameFrom.get(current)!;
        }
        path.unshift(startNode);
        return path;
    }
}
export default DFSStrategy;
