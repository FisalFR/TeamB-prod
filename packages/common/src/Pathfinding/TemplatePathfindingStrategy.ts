import PathfindingStrategy from "./PathfindingStrategy.ts";
import Node from "../node.ts";
import PriorityQueue from "../PriorityQueue.ts";

abstract class TemplatePathfindingStrategy extends PathfindingStrategy {
    execute(startNode: Node, endNode: Node): Node[] {
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

    abstract heuristic(endNode: Node, nextNode: Node, currentNode: Node): number;
}

export default TemplatePathfindingStrategy;
