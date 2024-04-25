import PriorityQueue from "../PriorityQueue.ts";
import Node from "../node.ts";
import TemplatePathfindingStrategy from "./TemplatePathfindingStrategy.ts";

class AStarStrategy extends TemplatePathfindingStrategy {
    initialDirection: string | null = null; // Add this line to keep track of the initial direction

    heuristic(endNode: Node, nextNode: Node, currentNode: Node): number {
        const endFloor: number  = this.convertFloor(endNode.floor);
        const nextFloor: number = this.convertFloor(nextNode.floor);
        const currentFloor: number = this.convertFloor(currentNode.floor);
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
            finalCost += 10000000000000000000000000;
        }

        // if (currentNode.building === "BTM" && currentFloor === 1 && endFloor === 5 && endNode.building !== currentNode.building){
        //     if (nextFloor === 4){
        //         return 0;
        //     }
        // }

        // // Add a penalty if the next node's floor is higher than the current node's floor but lower than the end node's floor, or vice versa
        // if ((nextFloor > currentFloor && nextFloor < endFloor) || (nextFloor < currentFloor && nextFloor > endFloor)) {
        //     finalCost += 1000000;
        // }

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
