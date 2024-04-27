import { motion } from "framer-motion";
import Node from "common/src/nodes-and-edges/node.ts";
import CircleFrom from '@/assets/icons/from_to_icons/circle_from.svg';
import IconTo from '@/assets/icons/from_to_icons/icon_to.svg';
import React, {useRef} from "react";

function PathVisual(props: {width: number; height: number;
    showPath: boolean; floormap: Map<string, Node[][]>;
    pathNodes: Node[]; images: Map<string, string>;
    currentFloor: string; onClickCircle: (Node: Node) => void;
    allNodes: Node[]; showNodes: boolean;
    onChangeFloor: (floor: string) => void;
    startNodeID: string;
    endNodeID: string}) {
    let startCoord: number[] = [];
    let endCoord: number[] = [];
    if (props.pathNodes[0] != null) {
        startCoord = [props.pathNodes[0].xcoord, props.pathNodes[0].ycoord];
        endCoord = [props.pathNodes[props.pathNodes.length - 1].xcoord, props.pathNodes[props.pathNodes.length - 1].ycoord];
    }
    // const [mouseCoord, setMouseCoord] = useState([0, 0]);

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
                        // onMouseMove={ (e) => {setMouseCoord(getSVGCoords(e));}}
                                key = {JSON.stringify(keys[x] + "svg")}
                    >
                        {createFloor(keys[x])}

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
            <image xlinkHref={floorImage} width={props.width} height={props.height} key={JSON.stringify(floorImage)}
                   ref={imgRef}
            ></image>
        );
        {props.allNodes.filter(node => {
            return node.floor === props.currentFloor && !node.longName.includes("Hall");
        }).map((node) => {
            let fillColor = '#FFFFFF'; // Default color
            if (node.nodeID === props.startNodeID) {
                fillColor = '#89D4E3'; // Color for start node
            } else if (node.nodeID === props.endNodeID) {
                fillColor = '#009CA6'; // Color for end node
            }

            pathDivs.push(<>

                <circle  className={"hover:cursor-pointer"}
                         cx={node.xcoord} cy={node.ycoord}
                         r={12} // smaller visible circle
                         fill={fillColor}
                         stroke= "#012D5A"
                         strokeWidth= "4"
                         display={props.showNodes ? "block" : "none"}
                         onClick={() => {
                             props.onClickCircle(node);
                         }}/>
                {fillColor !== '#FFFFFF' &&
                    Array.from({ length: 3 }).map((_, index) => (
                        <motion.circle
                            cx={node.xcoord}
                            cy={node.ycoord}
                            r={index*48}
                            fill={fillColor}
                            display={props.showNodes ? "block" : "none"}
                            initial={{ scale: 1, opacity: 0.65 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 1, repeat: Infinity, delay: index * 0.3 }}
                            key={index}
                        />
                    ))
                }
            </>);
            return;
        });}
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
            returnDivs.push(
                <svg>
                    <motion.circle cx={start.xcoord + (props.pathNodes[nodePos-1].floor.length-1)*12 + 16} cy={start.ycoord - 16}
                                   r={36} fill="#F6BD38"
                                   key={JSON.stringify(startCoord[0] + startCoord[1])}
                                   onClick={() => props.onChangeFloor(props.pathNodes[nodePos-1].floor)}
                                   className={"hover: cursor-pointer"}
                                   whileHover={{scale: 1.1}}
                                   whileTap={{scale: 0.9}}
                    />
                    <text x={start.xcoord} y={start.ycoord} key={JSON.stringify(startCoord[0] + startCoord[1] + "text")}
                          className="text-5xl font-bold fill-deep-blue font-OpenSans hover: cursor-pointer"
                          onClick={() => props.onChangeFloor(props.pathNodes[nodePos-1].floor)}>
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
                    <motion.circle cx={end.xcoord + (props.pathNodes[nodePos + 1].floor.length - 1)*12 + 16} cy={end.ycoord - 16} r={36} fill="#012D5A"
                                   key={JSON.stringify(endCoord[0] + endCoord[1])}
                                   onClick={() => props.onChangeFloor(props.pathNodes[nodePos+1].floor)}
                                   className={"hover: cursor-pointer"}
                                   whileHover={{scale: 1.1}}
                                   whileTap={{scale: 0.9}}
                    />
                    <text x={end.xcoord} y={end.ycoord} key={JSON.stringify(endCoord[0] + endCoord[1] + "text")}
                          className="text-5xl font-bold fill-gold-yellow font-OpenSans hover: cursor-pointer"
                          onClick={() => props.onChangeFloor(props.pathNodes[nodePos+1].floor)}>
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
