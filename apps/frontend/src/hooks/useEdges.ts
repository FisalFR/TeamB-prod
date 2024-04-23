import {useEffect, useState} from "react";
import axios from "axios";
// import Edge from "common/src/edge.ts";
import EdgeType from "common/src/EdgeType.ts";
export function useEdges() {
    const [edges, setEdges] = useState<EdgeType[]>([]);
    const [edgeMap, setEdgeMap] = useState<Map<string,string[]>>(new Map());
    useEffect( () => {
        axios.get("/api/edges/").then((response) => {
            const edges:EdgeType[] = response.data;
            setEdges(edges);
            const newEdgeMap = edgeMap;
            edges.forEach((edge:EdgeType) => {
                const Start = newEdgeMap.get(edge.startNodeID)!;
                Start.push(edge.endNodeID);
                const End = newEdgeMap.get(edge.endNodeID)!;
                Start.push(edge.startNodeID);
                newEdgeMap.set(edge.startNodeID,Start);
                newEdgeMap.set(edge.endNodeID,End);
            });
            setEdgeMap(newEdgeMap);
        });
    }, [edgeMap]);

    return {edges:edges,edgeMap:edgeMap};
}

export function useEdgesID() {
    const [edges, setEdges] = useState<string[]>([]);
    useEffect( () => {
        axios.get("/api/edges/getID").then((response) => {
            setEdges(response.data);
        });
    }, []);
    return {edges};
}


export default useEdges;
