import { motion } from "framer-motion";
import Node from "common/src/node.ts";
import CircleFrom from '../../assets/from_to_icons/circle_from.svg';
import IconTo from '../../assets/from_to_icons/icon_to.svg';
import React, {useRef, useState} from "react";

function PathVisual(props: {width: number; height: number;
    showPath: boolean; floormap: Map<string, Node[][]>; pathNodes: Node[]; images: Map<string, string>; currentFloor: string; onClickCircle: (Node: Node) => void; allNodes: Node[]}) {
    let startCoord: number[] = [];
    let endCoord: number[] = [];
    if (props.pathNodes[0] != null) {
        startCoord = [props.pathNodes[0].xcoord, props.pathNodes[0].ycoord];
        endCoord = [props.pathNodes[props.pathNodes.length - 1].xcoord, props.pathNodes[props.pathNodes.length - 1].ycoord];
    }
    // const [nodeOpacity, setNodeOpacity] = useState<number[]>(Array(props.allNodes.length).fill(0));
    // const [replaceThis, setReplaceThis] = useState(0);
    const [mouseCoord, setMouseCoord] = useState([0, 0]);

    const draw = {
        hidden: { pathLength: 0, opacity: 1 },
        visible: {
            opacity: 1,
            pathLength: 1,
            transition: {
                duration: 1,
                ease: "linear",
            },
        }
    };

    function createPath(pathArray) {
        if(props.showPath){
            let path = `M ${pathArray[0][0]} ${pathArray[0][1]}`;
            for (let i = 1; i < pathArray.length; i++) {
                path += ` L ${pathArray[i][0]} ${pathArray[i][1]}`;
            }
            return path;
        }
    }

    const imgRef = useRef<HTMLDivElement>(null);

    function getSVGCoords(e: MouseEvent) {

        console.log(imgRef);
        if (imgRef.current == null) {
            return [0,0];
        }



        const offsetLeft = imgRef.current.getBoundingClientRect().left;
        const offsetTop = imgRef.current.getBoundingClientRect().top;
        console.log(imgRef.current.getBoundingClientRect());
        const initialZoomX = 5000/imgRef.current.getBoundingClientRect().width;
        const initialZoomY = 3400/imgRef.current.getBoundingClientRect().height;
        const x = (e.clientX - offsetLeft) * initialZoomX;
        const y= (e.clientY - offsetTop) * initialZoomY;
        console.log([Math.round(x), Math.round(y)]);

        return ([Math.round(x), Math.round(y)]);
    }

    function getOpacity(node): number {
        if (Math.abs(mouseCoord[0] - node.xcoord) < 100 && Math.abs(mouseCoord[1] - node.ycoord) < 100) {
            return 1;
        }
        return 0;
    }

    function createFloors() {
        const floorSVGs: JSX.Element[] = [];
        const keys = Object.keys(props.images);
        for (let x = 0; x < keys.length; x++) {
            let classname = "block";
            if (keys[x] != props.currentFloor) {
                classname = "hidden";
            }
            floorSVGs.push(
                <>
                    <motion.svg width={props.width}
                                height={props.height}
                                viewBox={viewBox}
                                initial="hidden"
                                animate="visible"
                                variants={draw}
                                className={classname}
                                onMouseMove={ (e) => {setMouseCoord(getSVGCoords(e));}}
                                key = {JSON.stringify(keys[x] + "svg")}
                    >
                        {createFloor(keys[x])}
                        {props.allNodes.filter(node => {
                            return node.floor === props.currentFloor && !node.longName.includes("Hall");
                        }).map((node) => {
                            return <>

                                <circle id={`node-${node.nodeID}`} cx={node.xcoord } cy={node.ycoord } r={8} // smaller visible circle
                                        fill="#F6BD38"
                                        opacity={getOpacity(node)}
                                        onClick={ () => {
                                            props.onClickCircle(node);
                                        }}/>
                            </>;
                        })}
                    </motion.svg>
                </>
            );
        }
        return floorSVGs;
    }

    function createFloor(floor: string) {
        const floorImage = props.images[floor];
        const pathDivs = [];
        pathDivs.push(
            <image xlinkHref={floorImage} width={props.width} height={props.height} key = {JSON.stringify(floorImage)} ref={imgRef}
            ></image>
        );
        if (Object.prototype.hasOwnProperty.call(props.floormap, floor)) {
            const floorPaths: Node[][] | undefined = props.floormap[floor];

            if (floorPaths != null && props.currentFloor == floor) {
                for (let i = 0; i < floorPaths.length; i++) {
                    const pathCoords = [];
                    for (let j = 0; j < floorPaths[i].length; j++) {
                        pathCoords.push([floorPaths[i][j].xcoord, floorPaths[i][j].ycoord]);
                    }
                    pathDivs.push(
                        <>
                            //border
                            <motion.path d={createPath(pathCoords)} stroke="#009CA6" fill="none" initial="hidden"
                                         strokeWidth={16}
                                         strokeLinecap={"round"}
                                         strokeLinejoin={"round"}/>
                            //background
                            <motion.path d={createPath(pathCoords)} stroke="#012D5A" fill="none" initial="hidden"
                                         strokeWidth={9}
                                         strokeLinecap={"round"}
                                         strokeLinejoin={"round"}/>
                            //strokes
                            <motion.path d={createPath(pathCoords)} stroke="#89D4E3" fill="none" initial="hidden"
                                         strokeWidth={9}
                                         animate={{ strokeDashoffset: [0, -30] }}
                                         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                         strokeDasharray="10,20"
                                         strokeLinecap={"round"}
                                         strokeLinejoin={"round"}
                                         key = {JSON.stringify(pathCoords)}/>
                            {createStartEnd(floorPaths[i][0], floorPaths[i][floorPaths[i].length-1])}
                        </>
                    );
                }
            }
        }
        return pathDivs;
    }

    function createStartEnd(start: Node, end: Node) {
        const returnDivs = [];
        let nodePos = 0;
        //Beginning
        if (props.pathNodes[0].nodeID == start.nodeID) {
            returnDivs.push(
                <svg x={startCoord[0] - 20 } y={startCoord[1] - 20}>
                    <image xlinkHref={CircleFrom} width={40}></image>
                </svg>
            );
        } else {
            nodePos = props.pathNodes.findIndex((node) => node.nodeID == start.nodeID);
            returnDivs.push(<svg>
                    <circle cx={start.xcoord + (props.pathNodes[nodePos-1].floor.length-1)*12 + 16} cy={start.ycoord - 16}
                            r={36} fill="#F6BD38"
                            key={JSON.stringify(startCoord[0] + startCoord[1])}/>
                    <text x={start.xcoord} y={start.ycoord} key={JSON.stringify(startCoord[0] + startCoord[1] + "text")}
                          className="text-5xl font-bold fill-deep-blue font-OpenSans">
                        {props.pathNodes[nodePos - 1].floor}</text>
                </svg>
            );
        }
        //End
        if (props.pathNodes[props.pathNodes.length-1].nodeID == end.nodeID) {
            returnDivs.push(
                <svg x={endCoord[0] - 24} y={endCoord[1] -60}>
                    <image xlinkHref = {IconTo} width={50}></image>
                </svg>
            );
        } else {
            nodePos = props.pathNodes.findIndex((node) => node.nodeID == end.nodeID);
            returnDivs.push(
                <svg>
                    <circle cx={end.xcoord + (props.pathNodes[nodePos + 1].floor.length - 1)*12 + 16} cy={end.ycoord - 16} r={36} fill="#012D5A"
                            key={JSON.stringify(endCoord[0] + endCoord[1])}/>
                    <text x={end.xcoord} y={end.ycoord} key={JSON.stringify(endCoord[0] + endCoord[1] + "text")}
                          className="text-5xl font-bold fill-gold-yellow font-OpenSans ">
                        {props.pathNodes[nodePos + 1].floor}</text>
                </svg>
            );
        }
        return (returnDivs);
    }

    function createBlankFloor(floor: string) {
        const floorImage = props.images[floor];
        return (
            <image key={JSON.stringify(floorImage + "placeholder")} xlinkHref={floorImage} width={props.width}
                   height={props.height}></image>
        );
    }

    const viewBox = "0 0 " + (props.width) + " " + (props.height);
    if (props.pathNodes[0] != null) {
        return (
            <>
                <div className="flex flex-col" key = {JSON.stringify("floors" + props.pathNodes)}
                    ref={imgRef}>
                    {createFloors()}
                </div>
            </>
        );
    }
    else {
        return (
            <>

                <motion.svg width="100%"
                            height={props.height}
                            viewBox={viewBox}
                            initial="hidden"
                            animate="visible"
                            variants={draw}
                            key = {JSON.stringify("allfloors")}>
                    {createBlankFloor("L2")}
                </motion.svg>

            </>
        );
    }

}

export default PathVisual;
