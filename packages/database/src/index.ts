export * from "../.prisma/client";

import { PrismaClient } from "../.prisma/client";
const prisma = new PrismaClient();
import readNode from "../../../apps/backend/src/readNode";
import readEdge from "../../../apps/backend/src/readEdge";
import populateNode from "../../../apps/backend/src/populateNode";
import populateEdge from "../../../apps/backend/src/populateEdge";
import writeNode from "../../../apps/backend/src/writeNode";
import writeEdge from "../../../apps/backend/src/writeEdge";
import Path from "../../common/src/pathFinder";
import Node from "../../common/src/node";
import Parser from "../../common/src/parser";


async function main() {
    //const nodeData = await readNode.readNodeCSV("../../data/L1Nodes.csv");
    // await populateNode.populateNodeDB(nodeData);
    //const edgeData = await readEdge.readEdgeCSV("../../data/L1Edges.csv");
    //await populateEdge.populateEdgeDB(edgeData);
    //await writeNode.nodeBackToCSV();
    //await writeEdge.edgesBackToCSV();

    try {
        const finalPath: Path = new Path();

        finalPath.nodeList = await Parser.parseNode("../../../data/L1Nodes.csv");
        finalPath.edgeList = await Parser.parseEdge("../../../data/L1Edges.csv");
        finalPath.generateNodeMap();

        const node1: Node = finalPath.nodeMap.get("CCONF002L1")!;
        const node2: Node = finalPath.nodeMap.get("CHALL012L1")!;
        const temp: Node[] = finalPath.BFS(node1, node2);
        for (let i = 0; i < temp.length; i++) {
            console.log("Path", i, ":", temp[i].nodeID);
        }
    } catch (error) {
        console.error(error);
    }

}

export default Node;

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

