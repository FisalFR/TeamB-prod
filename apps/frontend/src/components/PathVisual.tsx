//import {useState} from "react";

import { JSX } from "react/jsx-runtime";

function PathVisual(props: { path: number[][]; image: string; width: number; height: number; scale:number} ) {
    const path = props.path;

    function createPaths() {
        const lines: JSX.Element[] = [];
        for (let i = 0; i < path.length - 1; i++){
            lines.push(<line x1={path[i][0]} y1={path[i][1]} x2={path[i+1][0]} y2={path[i+1][1]} stroke="red" strokeWidth={4} />);
        }
        return lines;
    }

    const viewBox = "0 0 " + (props.width)  + " " + (props.height);

    return (
        <svg width={props.width * props.scale} height={props.height * props.scale} viewBox={viewBox}>
            <image xlinkHref={props.image} width={props.width} height={props.height}></image>
            {createPaths()}
            <circle cx={path[0][0]} cy={path[0][1]} r={8} fill="blue"/>
            <circle cx={path[path.length-1][0]} cy={path[path.length-1][1]} r={8} fill="blue"/>
        </svg>
    );
}

export default PathVisual;
