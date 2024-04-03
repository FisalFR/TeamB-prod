export * from "../.prisma/client";

import { PrismaClient } from "../.prisma/client";
const prisma = new PrismaClient();
import readNode from "../../../apps/backend/src/readNode";
import readEdge from "../../../apps/backend/src/readEdge";
import populateNode from "../../../apps/backend/src/populateNode";
import populateEdge from "../../../apps/backend/src/populateEdge";
import writeNode from "../../../apps/backend/src/writeNode";
import writeEdge from "../../../apps/backend/src/writeEdge";


async function main() {
    //FOR DATABASES DONT TOUCH, IT AFFECTS THE WHOLE DATABASE -COLIN
    //const nodeData = await readNode.readNodeCSV("../../data/L1Nodes.csv");
    //await populateNode.populateNodeDB(nodeData);
    //const edgeData = await readEdge.readEdgeCSV("../../data/L1Edges.csv");
    //await populateEdge.populateEdgeDB(edgeData);
    //await writeNode.nodeBackToCSV();
    //await writeEdge.edgesBackToCSV();
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

