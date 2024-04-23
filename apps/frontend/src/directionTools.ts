import Node from 'common/src/node.ts';
import {Instruction} from 'common/src/instruction.ts';
const distThresh = 90;
const turnThresh = Math.PI / 2.5;
// const backTrackThresh = Math.PI/2.5;
const tooShort = 4;
const endRange = 150;
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

    if (path[index-1].nodeType == "ELEV"){
        return ["Elevator",index];
    }
    if (dist(path[index],path[path.length-1])<endRange)
        return ["End",index];

    if(index==0){
        return [`Start`,index];}
    while(index+offset < path.length-1){
        // const imaginary = path[index];
        // imaginary.ycoord = path[index].ycoord+Math.sin(angle(path[index-1],path[index]))*dist(path[index],path[index+offset]);
        // imaginary.xcoord = path[index].xcoord+Math.cos(angle(path[index-1],path[index]))*dist(path[index],path[index+offset]);
        if ( dist(path[index],path[index+offset])>distThresh ){
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
    let index = 1;
    let content = `Starting from ${path[0].shortName}`;
    console.log(nodemap.get(path[3].nodeID!)!);
        for (const neighbor of edgeMap.get(path[3].nodeID)!){
            const compNode = nodemap.get(neighbor)!;
            if (compNode.nodeType != "HALL"){
                content=`Starting from ${path[0].shortName}, turn towards ${compNode.longName}`;
                break;}}

        instructions.push({type:`Start`,content:content});
    //let amtIntersections = 0;
    let prevTurn = path[0];
    let wait = 0;
    let turn;
    while (index < path.length-1){
        let content:string;
        if (index>=wait)
            [turn,wait] = pathTurn(path,index);
        if ((turn == `Right` || turn == `Left`)){
            //
            // if (amtIntersections == 0){
            if (dist(prevTurn,path[index])*pix2meters > tooShort){
                content=`Walk ${Math.round(dist(prevTurn,path[index])*pix2meters)} meters and take a ${turn} turn.`;
                for (const neighbor of path[index].neighbors){
                    if (neighbor.nodeType != "HALL"){
                        content=`Walk ${Math.round(dist(prevTurn,path[index])*pix2meters)} meters until you read ${neighbor.longName}and take a ${turn} turn.` ;
                    break;}

                }


                 instructions.push({type:turn,content:content});
            prevTurn=path[index];}
        }
        else if (turn=="Elevator" && path[index+1].nodeType=="ELEV"){
            instructions.push({type:turn,content:`Take the elevator up to floor ${path[index+1].floor}`});
        }
        // else if (detectBranch(angle(path[index-1],path[index]),path[index],path[index]))
        //         amtIntersections++;

        index++;
    }
    // if (amtIntersections==0)
         content=`Walk ${Math.round(dist(prevTurn,path[index]) * pix2meters)} meters`;
    // else content=` Walk past ${amtIntersections} hallways `;
    const finalDir = pathTurn(path,path.length-3)[0];
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
    return instructions;}

