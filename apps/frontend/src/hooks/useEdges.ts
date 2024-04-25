import {useEffect, useState} from "react";
import axios from "axios";
// import Edge from "common/src/edge.ts";
import EdgeType from "common/src/edge-type.ts";
export function useEdges() {
    const [edges, setEdges] = useState<EdgeType[]>([]);
    const [edgeMap, setEdgeMap] = useState<Map<string, string[]>>(new Map());
    function reload() {
        axios.get("/api/edges/").then((response) => {
            setEdges(response.data);
        });
    }
    useEffect( () => {
        axios.get("/api/edges/").then((response) => {
            const edges: EdgeType[] = response.data;
            setEdges(edges);
            const newEdgeMap: Map<string, string[]> = new Map();
            edges.forEach((edge: EdgeType) => {
                let Start = newEdgeMap.get(edge.startNodeID);
                if (Start == undefined)
                    Start = [];
                Start.push(edge.endNodeID);
                newEdgeMap.set(edge.startNodeID, Start);
                let End = newEdgeMap.get(edge.startNodeID);
                if (End == undefined)
                    End = [];
                End.push(edge.startNodeID);
                newEdgeMap.set(edge.endNodeID, End);
            });
            setEdgeMap(newEdgeMap);
        });


    }, []);

    return {edges:edges, reloadEdges: reload, edgeMap: edgeMap};
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
