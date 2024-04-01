//import {useState} from "react";
//import React, {useEffect, useState} from "react";
import { JSX } from "react/jsx-runtime";
//import axios from "axios";
// import {node} from "prop-types";



function PathVisual(props: { path: number[][]; image: string; width: number; height: number; scale:number} ) {
    const pathArray = props.path;
    //const [pathNodes, setPathNodes] = useState<Node[]>([]);
    //const [tempPathArray, setTempPathArray] = useState<number[][]>([]);
    //const [nodeMap, setNodeMap] = useState<Map<string, Node>>(new Map());

    /*useEffect(() => {
        const data = {
            startNode: 'CCONF001L1',
            endNode: 'CCONF002L1',
        };

        axios.post("http://localhost:3000/api/pathfinding", data)
            .then((response) => {
                console.log("DID A POST????");
                setPathNodes(response.data.nodes);
                console.log(pathNodes);
                setNodeMap(response.data.nodeMap);
                console.log(nodeMap);
            })
            .catch((error) => {
                console.error("There has been a problem with your fetch operation:", error);
            });
    }, );

    useEffect(() => {
        axios.get("http://localhost:3000/api/pathfinding").then((response) => {
            console.log("DID A GET????");
            setTempPathArray(response.data.path);
            console.log(tempPathArray);

        }).catch((error) => {
            console.error("There has been an a problem with your fetch operation:", error);
        });
    }, );*/



    function createPaths() {
        const lines: JSX.Element[] = [];
        for (let i = 0; i < pathArray.length - 1; i++){
            lines.push(<line x1={pathArray[i][0]} y1={pathArray[i][1]} x2={pathArray[i+1][0]} y2={pathArray[i+1][1]} stroke="red" strokeWidth={4} />);
        }
        return lines;
    }

    const viewBox = "0 0 " + (props.width)  + " " + (props.height);

    return (
        <svg width={props.width * props.scale} height={props.height * props.scale} viewBox={viewBox}>
            <image xlinkHref={props.image} width={props.width} height={props.height}></image>
            {createPaths()}
            <circle cx={pathArray[0][0]} cy={pathArray[0][1]} r={8} fill="blue"/>
            <circle cx={pathArray[pathArray.length-1][0]} cy={pathArray[pathArray.length-1][1]} r={8} fill="blue"/>
        </svg>
    );
}

export default PathVisual;
