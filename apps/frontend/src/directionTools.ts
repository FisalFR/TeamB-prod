import Node from 'common/src/node.ts';
import {Instruction} from 'common/src/instruction.ts';
const distThresh = 40;
const nearThresh = 3;
const turnThresh = Math.PI / 2.1;
const tooShort = 4;
const minSeg = 10;
const pix2meters = .05;

 function dist(node1: Node, node2: Node):number {
    return Math.sqrt(Math.pow(node1.xcoord - node2.xcoord, 2) + Math.pow(node1.ycoord - node2.ycoord, 2));
}

 function angle(node1: Node, node2: Node):number {
    return Math.atan2(node2.ycoord - node1.ycoord, node2.xcoord - node1.xcoord);
}

function angleDiff(angle1:number, angle2:number):number {
    const diff = angle2-angle1;
    if (diff >= Math.PI)
        return diff-2*Math.PI;
    else if (diff <= (-Math.PI))
        return diff+2*Math.PI;
    return diff;
}


// function detectBranch(compAngle:number, branchNode:Node, curNode:Node):boolean  {
//     let turn = false;
//     for (const testNode of curNode.neighbors ) {
//         if (testNode != branchNode && testNode.nodeType == `HALL` ){
//             if (Math.abs(angleDiff(compAngle + Math.PI, angle(testNode,curNode))) < backTrackThresh || dist(curNode, testNode) < tooShort){
//                 continue;
//             }
//             else if (dist(branchNode, testNode) >  distThresh ){
//                 turn = true;
//             }
//             else if (dist(branchNode, testNode) < distThresh){
//                 turn = detectBranch(compAngle, branchNode, testNode);
//             }
//         }
//         if (turn)
//             return turn;
//     }
//     return turn;
// }

function pathTurn(path:Node[],index:number):[string,number]{
    let offset=1;


    // if (dist(path[index],path[path.length-1])<endRange)
    //     return ["End",index];

    if(index==0){
        return [`Start`,index];}
    while(index+offset < path.length){
        // const imaginary = path[index];
        // imaginary.ycoord = path[index].ycoord+Math.sin(angle(path[index-1],path[index]))*dist(path[index],path[index+offset]);
        // imaginary.xcoord = path[index].xcoord+Math.cos(angle(path[index-1],path[index]))*dist(path[index],path[index+offset]);
        if ( ((dist(path[index],path[index+offset])>distThresh) && dist(path[index],path[index+1])>minSeg) || (path[index+offset].nodeType=="ELEV" ||  path[index+offset].nodeType=="STAI")){
            const dirDiff = angleDiff(angle(path[index-1],path[index]),angle(path[index+offset-1],path[index+offset]));
            if ( Math.abs(dirDiff )> turnThresh){
                if (dirDiff>0)
                    return [`Right`,index+offset];
                else return [`Left`,index+offset];
            }
            else return [`Forward`,index+offset];
        }
        offset++;
    }
    return [`End`,index+offset];
}



export default function genInstructions(path:Node[],nodemap: Map<string,Node>, edgeMap:Map<string,string[]>):Instruction[]{
    const instructions:Instruction[] =[];
    if ((path.length < 2))
        return [];
    else if (dist(path[0],path[path.length-1]) < 100){
        instructions.push({type:"End",content:"You are already near your destination"});
        return instructions;
    }
    let index = 0;
    instructions.push({type: "Star",content:`Starting from ${path[0].shortName}`});
        for (const neighbor of edgeMap.get(path[3].nodeID)!){
            const compNode = nodemap.get(neighbor)!;

            if (compNode.nodeType != "HALL" && compNode.nodeType != "ELEV" && compNode.nodeType != "STAI" && compNode.nodeType != "WALK" && dist(path[3],compNode)*pix2meters<nearThresh){
                instructions.push({type:"Right",content:`Turn towards ${compNode.shortName}`});
                break;}}

    //let amtIntersections = 0;
    let prevTurn = path[0];
    let wait = 0;
    let turn;
    let leftElevator=false;
    while (index < path.length-1){
        if (index!=0 && (path[index].nodeType == "ELEV" || path[index].nodeType == "STAI") && (path[index-1].nodeType == "ELEV" || path[index-1].nodeType == "STAI")){
            index++;
            continue;}
        let content:string;
        if (index>=wait)
            [turn,wait] = pathTurn(path,index);
        if ((turn == `Right` || turn == `Left`)){
            if (dist(prevTurn,path[index])*pix2meters > tooShort || leftElevator){
                leftElevator=false;
                content=`Walk ${Math.round(dist(prevTurn,path[index])*pix2meters)} meters.`;
                for (const neighbor of edgeMap.get(path[3].nodeID)!){
                    const compNode = nodemap.get(neighbor)!;
                    if (compNode.nodeType != "HALL" && compNode.nodeType != "ELEV" && compNode.nodeType != "STAI" && compNode.nodeType != "WALK" && dist(path[index],compNode)*pix2meters<nearThresh){
                        content=`Walk ${Math.round(dist(prevTurn,path[index])*pix2meters)} meters to ${compNode.shortName}. `;
                        break;}}
                 instructions.push({type:"Forward",content:content});
                instructions.push({type:turn,content:`Take a ${turn.toLowerCase()} turn.`});
            prevTurn=path[index];}
        }
         if ((path[index].nodeType == "ELEV" || path[index].nodeType == "STAI") && path[index].floor!=path[index+1].floor){
            let ogfloor ;
            if (path[index].floor == "L1")
                ogfloor = -1;
            else if (path[index].floor == "L2")
                ogfloor = -2;
            else ogfloor = parseInt(path[index].floor);
            let newfloor ;
            if (path[index+1].floor == "L1")
                newfloor = -1;
            else if (path[index+1].floor == "L2")
                newfloor = -2;
            else newfloor = parseInt(path[index+1].floor);
            let direction;
            if (newfloor > ogfloor){ direction = 'up';}
            else  direction='down';
            content=(`Take the ${path[index].nodeType=="ELEV"?"elevator":"stairs"} ${direction} to floor ${path[index+1].floor}`);
            for (const neighbor of edgeMap.get(path[index+3].nodeID)!){
                const compNode = nodemap.get(neighbor)!;
                if (compNode.nodeType != "HALL" && compNode.nodeType != "ELEV" && compNode.nodeType != "STAI" && compNode.nodeType != "WALK" && dist(path[index],compNode)*pix2meters<nearThresh){
                    content=`Take the ${path[index].nodeType=="ELEV"?"elevator":"stairs"} ${newfloor>ogfloor?`up`:`down`} to floor ${path[index+2].floor} and turn towards ${compNode.shortName}.`;
                    break;}}
            leftElevator=false;
            instructions.push({type:path[index].nodeType=="ELEV"?"Elevator":"Stairs",content:content});
        }
        // else if (detectBranch(angle(path[index-1],path[index]),path[index],path[index]))
        //         amtIntersections++;

        index++;
    }
    // if (amtIntersections==0)
        let content=`Walk ${Math.round(dist(prevTurn,path[index]) * pix2meters)} meters`;
    // else content=` Walk past ${amtIntersections} hallways `;
    const finalDir = pathTurn(path,path.length-2)[0];
    switch (finalDir) {
        case `Forward`:
        content = `${content} and your destination is ahead.`;
            instructions.push({type:"Forward",content:content});
        break;
        case `Left`:
            content = `${content} and your destination is on the left.`;
            instructions.push({type:"Left",content:content});
            break;
        case `Right`:
            content = `${content} and your destination is on the right.`;
            instructions.push({type:"Right",content:content});
            break;
        default:
            content=`${content} and you will arrive at your destination`;
            instructions.push({type:"Forward",content:content});
    }

    return instructions;}

