import {useEffect, useState} from "react";
import axios from "axios";
import Node from "common/src/node.ts";
// import Edge from "common/src/edge.ts";

export function useNodes() {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [nodeMap, setNodeMap] = useState<Map<string, Node>>(new Map<string, Node>());
    // const [edges,setEdges] = useState<Edge[]>([]);
    useEffect( () => {
        axios.get("/api/pathfinding/nodemap").then((response) => {
            console.log();
            setNodes(response.data.nodeList);
            const nodeMap = new Map<string, Node>();
            for (let i = 0; i < response.data.nodeList.length; i++) {
                nodeMap.set(response.data.nodeList[i].nodeID, response.data.nodeList[i]);
            }
            console.log(nodeMap);
            setNodeMap(nodeMap);
        });
    }, []);
    nodes.sort((a, b) => a.longName.localeCompare(b.longName));
    return {nodes:nodes,nodeMap:nodeMap};
}

export default useNodes;
