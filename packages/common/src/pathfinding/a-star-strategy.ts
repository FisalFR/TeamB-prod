// import PriorityQueue from "../priority-queue.ts";
import Node from "../nodes-and-edges/node.ts";
import TemplatePathfindingStrategy from "./template-pathfinding-strategy.ts";

class AStarStrategy extends TemplatePathfindingStrategy {
    initialDirection: string | null = null; // Add this line to keep track of the initial direction

    heuristic(endNode: Node, nextNode: Node, currentNode: Node): number {
        const endFloor: number  = this.convertFloor(endNode.floor);
        const nextFloor: number = this.convertFloor(nextNode.floor);
        const currentFloor: number = this.convertFloor(currentNode.floor);
        const floorDiff: number = Math.abs(endFloor - nextFloor);
        let finalCost = 1000;

        // Determine the initial direction if it's not set
        if (this.initialDirection === null) {
            this.initialDirection = endFloor > currentFloor ? 'up' : 'down';
        }

        if (endFloor === nextFloor) {
            const ManhattanDistance  =+ Math.abs(endNode.ycoord - nextNode.ycoord) + Math.abs(endNode.xcoord - nextNode.xcoord);
            finalCost = ManhattanDistance;
        } else {
            // Use Euclidean distance for nodes on different floors
            const EuclideanDistance =+ Math.sqrt(((endNode.ycoord - nextNode.ycoord) ** 2) + ((endNode.xcoord - nextNode.xcoord) ** 2)) + (((endFloor-nextFloor) * 1000)**2);
            finalCost = EuclideanDistance;
        }

        if (nextNode.floor !== currentNode.floor) {
            finalCost += 10000000000000000000000000 + (floorDiff*10000000000000000000000000);
        }

        // Add a penalty if the direction changes
        if ((this.initialDirection === 'up' && nextFloor < currentFloor) || (this.initialDirection === 'down' && nextFloor > currentFloor)) {
            finalCost += 100000000000000000000000;
        }

        return finalCost;

    }


    convertFloor(floor: string): number {
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
}
export default AStarStrategy;
