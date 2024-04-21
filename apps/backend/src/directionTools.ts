import Node from 'common/src/node';
import {Instruction} from 'common/src/instruction';
import {useState} from "react";
const distThresh = 40;
const turnThresh = Math.PI / 3;
const backTrackThresh = Math.PI/4;

 function dist(node1: Node, node2: Node):number {
    return Math.sqrt(Math.pow(node1.xcoord - node2.xcoord, 2) + Math.pow(node1.ycoord - node2.ycoord, 2));
}

 function angle(node1: Node, node2: Node):number {
    return Math.atan2(node2.xcoord - node1.xcoord, node2.ycoord - node1.ycoord);
}

function angleDiff(angle1:number, angle2:number):number {
    return (angle1-angle2+180)%360 - 180;
}

function detectBranch(compAngle:number, branchNode:Node, curNode:Node):boolean  {
    let turn = false;
    for (const testNode of curNode.neighbors ) {
        if (testNode != branchNode && testNode.nodeType == `hall` ){
            if (Math.abs(angleDiff(compAngle + Math.PI, angle(testNode,curNode))) < backTrackThresh){
                continue;
            }
            else if (dist(branchNode, testNode) >  distThresh && Math.abs(angleDiff(compAngle , angle(testNode,curNode))) > turnThresh){
                turn = true;
            }
            else if (dist(branchNode, testNode) < distThresh){
                turn = detectBranch(compAngle, branchNode, testNode);
            }
        }
        if (turn)
            return turn;
    }
    return turn;
}

function pathTurn(path:Node[],index:number):string{
    let offset=1;
    if(index==0)
        return `Start`;
    while(index < path.length){
        if (dist(path[index],path[index+offset]) > distThresh){
            const dirDiff = angleDiff(angle(path[index-1],path[index]),angle(path[index+offset-1],path[index+offset]));
            if ( dirDiff > turnThresh){
                if (dirDiff<0)
                    return `Right`;
                else return `Left`;
            }
            else return `Forward`;
        }
        offset++;
    }
    return `End`;
}

export default function genInstructions(path:Node[]):Instruction[]{
    if (path.length<2)
        return [];
    let index = 1;
    const instructions:Instruction[] =[];
    const startString=`Starting from ${path[0].shortName}`;
    instructions.push({type:`Start`,content:startString });
    let amtIntersections = 0;
    while (index < path.length-1){
        const turn = pathTurn(path,index);
        let content:string;
        if (turn == `Right` || turn == `Left`){
            if (amtIntersections == 0){
                content=`Walk down the hallway and take the first hallway on the ${turn}.`;
            }
            else
                content=`Walk past ${amtIntersections} hallways and take the following hallway on the ${turn}.`;
            amtIntersections=0;
            instructions.push({type:turn,content:content});
        }
        else{
            if (detectBranch(angle(path[index-1],path[index]),path[index],path[index]))
                amtIntersections++;
        }
        index++;
    }
    let content:string;
    if (amtIntersections==0)
        content=`Walk down the hallway `;
    else content=` Walk past ${amtIntersections} hallways `;
    const finalDir = pathTurn(path,path.length-2);
    switch (finalDir) {
        case `Forward`:
        content = `${content} and your destination is at the end of the hallway.`;
        break;
        case `Left`:
            content = `${content} and your destination is on the left.`;
            break;
        case `Right`:
            content = `${content} and your destination is on the right.`;
            break;
        default:
            content=`${content} and you will arrive at your destination`;
    }
    instructions.push({type:"End",content:content});
    return instructions;
}
