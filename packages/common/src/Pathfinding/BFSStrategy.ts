import PathfindingStrategy from "./PathfindingStrategy.ts";
import Node from "../node.ts";
import Queue from "../Queue.ts";

class BFSStrategy implements  PathfindingStrategy {
    execute(startNode: Node, endNode: Node): Node[] {
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
        } else {
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

export default BFSStrategy;
