import {useEffect, useState} from "react";
import axios from "axios";
//import Node from "common/src/node.ts";
import NodeType from "common/src/nodes-and-edges/node-type.ts";
// import Edge from "common/src/edge.ts";

export function useNodes() {
    const [nodes, setNodes] = useState<NodeType[]>([]);
    const [nodeMap, setNodeMap] = useState<Map<string, NodeType>>(new Map<string, NodeType>());
    // const [edges,setEdges] = useState<Edge[]>([]);
    function reload() {
        axios.get("/api/pathfinding/nodemap").then((response) => {
            setNodes(response.data.nodeList);
            const nodeMap = new Map<string, NodeType>();
            for (let i = 0; i < response.data.nodeList.length; i++) {
                nodeMap.set(response.data.nodeList[i].nodeID, response.data.nodeList[i]);
            }
            setNodeMap(nodeMap);
        });
    }
    useEffect( () => {
        axios.get("/api/pathfinding/nodemap").then((response) => {
            setNodes(response.data.nodeList);
            const nodeMap = new Map<string, NodeType>();
            for (let i = 0; i < response.data.nodeList.length; i++) {
                nodeMap.set(response.data.nodeList[i].nodeID, response.data.nodeList[i]);
            }
            setNodeMap(nodeMap);
        });
    }, []);
    nodes.sort((a, b) => a.longName.localeCompare(b.longName));
    return {nodes:nodes,nodeMap:nodeMap,reloadNodes: reload};
}

export default useNodes;
