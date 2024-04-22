import PriorityQueue from "../PriorityQueue.ts";
import Node from "../node.ts";
import TemplatePathfindingStrategy from "./TemplatePathfindingStrategy.ts";

class AStarStrategy extends TemplatePathfindingStrategy {

    heuristic(endNode: Node, nextNode: Node, currentNode:Node): number {
        const endFloor: number  = this.convertFloor(endNode.floor);
        const nextFloor: number = this.convertFloor(nextNode.floor);
        const EuclideanDistance = Math.sqrt((endNode.ycoord - nextNode.ycoord) ** 2 + (endNode.xcoord - nextNode.xcoord) ** 2 + ((endFloor - nextFloor) * 100) ** 2);
        const DistToElevL: number = Math.sqrt((924 -nextNode.ycoord) ** 2 + (1785 - nextNode.xcoord) ** 2);
        const DistToElevQ: number = Math.sqrt((1825 -nextNode.ycoord) ** 2 + (1751 - nextNode.xcoord) ** 2);
        const floorDifference = Math.abs(endFloor - nextFloor);
        let finalCost = EuclideanDistance;

        // If I'm not in the same building as the end node, and across the bridge, prioritize the bridge
        if ((nextNode.building !== endNode.building) && (endNode.building === "Shapiro" || endNode.building === "BTM") ){
            if((nextFloor === 1 && endFloor == 1) && endNode.building === "Shapiro"){
                return EuclideanDistance/2;
            } else if(nextFloor === 4 || (nextFloor === 4 && endNode.building === "BTM")){
                return EuclideanDistance/2;
            }
        } else if ((currentNode.building === "Shapiro" || currentNode.building === "BTM") && (nextNode.building !== endNode.building) && (endFloor >=3)){
            if(nextFloor === 4){
                return EuclideanDistance/2;
            }
        } else if ((currentNode.building === "BTM") && (nextNode.building !== endNode.building) && (endFloor <3)){
            if(nextFloor === 4){
                return EuclideanDistance/2;
            }
        }

        // If the end ndoe is in L1 Shapiro and we're in Shapiro, prioritize Elevator Q
        if (endNode.building === "Shapiro" && nextNode.building === "Shapiro" && endNode.floor === "L1"){
            if(nextNode.nodeType === "ELEV" && nextNode.longName.includes("Elevator Q")){
                return 0;
            } else if (nextNode.nodeType === "ELEV" && !nextNode.longName.includes("Elevator Q")){
                return 10000;
            } else {
                return DistToElevQ;
            }
        }

        // if(endNode.building === "Tower" && endNode.floor ==="3" && currentNode.floor === "3"){
        //     if (nextFloor === 4){
        //         return 0;
        //     }
        // }
        //
        // // If the node is in the Tower, and we're not in the right floor, get to Elevator L
        // if(endNode.building === "Tower" && endNode.floor !== currentNode.floor) {
        //     if (nextNode.nodeType === "ELEV" && nextNode.shortName.includes("Elevator L")) {
        //         return 0;
        //     } else if (nextNode.nodeType === "ELEV" && !nextNode.shortName.includes("Elevator L")) {
        //         return 10000;
        //     } else {
        //         return DistToElevL;
        //     }
        // }

        // If we approach an ELEVATOR, prioritize if we're on the wrong floor
        // Otherwise,  DON'T TAKE THE ELEVATOR
        if((nextNode.nodeType === "ELEV" && currentNode.nodeType !== "ELEV")){
            if(nextFloor !== endFloor){
                return EuclideanDistance - floorDifference;
            } else if (nextFloor === endFloor){
                return EuclideanDistance + 10;
            }
        } else if ((nextNode.nodeType === "ELEV" && currentNode.nodeType === "ELEV")){
            if(nextFloor === endFloor){
                return 0;
            } else if (nextFloor !== endFloor){
                return EuclideanDistance + 100000 + (floorDifference * 100);
            }
        }

        // If we approach a STAIR, prioritize if we're on the wrong floor
        // Otherwise,  DON'T TAKE THE STAIRS
        if((nextNode.nodeType === "STAI" && currentNode.nodeType !== "STAI")){
            if(nextFloor !== endFloor && floorDifference === 1){
                return EuclideanDistance - (floorDifference/2);
            } else if (nextFloor === endFloor){
                return EuclideanDistance + 10;
            }
        } else if ((nextNode.nodeType === "STAI" && currentNode.nodeType === "STAI")){
            if(nextFloor === endFloor){
                return 0;
            } else if (nextFloor !== endFloor){
                return EuclideanDistance + 100000;
            }
        }

        if (endFloor === nextFloor){
            return EuclideanDistance;
        } else if (endFloor !== nextFloor){
            return EuclideanDistance + 10000;
        }

        return EuclideanDistance+ 10;

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
