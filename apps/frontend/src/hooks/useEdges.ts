import {useEffect, useState} from "react";
import axios from "axios";
// import Edge from "common/src/edge.ts";
import EdgeType from "common/src/EdgeType.ts";
export function useEdges() {
    const [edges, setEdges] = useState<EdgeType[]>([]);

    function reload() {
        axios.get("/api/edges/").then((response) => {
            setEdges(response.data);
        });
    }
    useEffect( () => {
        axios.get("/api/edges/").then((response) => {
            setEdges(response.data);
        });
    }, []);

    return {edges:edges, reloadEdges: reload};
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
