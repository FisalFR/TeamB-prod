import {useEffect, useState} from "react";
import axios from "axios";
import Edge from "common/src/edge.ts";
export function useEdges() {
    const [edges, setEdges] = useState<Edge[]>([]);
    useEffect( () => {
        axios.get("/api/edges/").then((response) => {
            setEdges(response.data);
        });
    }, []);

    return {edges:edges};
}

export default useEdges;
