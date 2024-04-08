import { motion } from "framer-motion";
import Node from "../../../../packages/common/src/node";

function PathVisual(props: {width: number; height: number; scale:number;
    showPath: boolean; floormap: Map<string, Node[][]>; nodes: Node[]; images: Map<string, string>; currentFloor: string}) {
    let startCoord: number[] = [];
    let endCoord: number[] = [];
    if (props.nodes[0] != null) {
        startCoord = [props.nodes[0].xcoord, props.nodes[0].ycoord];
        endCoord = [props.nodes[props.nodes.length - 1].xcoord, props.nodes[props.nodes.length - 1].ycoord];
    }

    const draw = {
        hidden: { pathLength: 0, opacity: 1 },
        visible: {
            opacity: 1,
            pathLength: 1,
            transition: {
                duration: 2,
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
                <motion.svg width={props.width * props.scale}
                            height={props.height * props.scale}
                            viewBox={viewBox}
                            initial="hidden"
                            animate="visible"
                            variants={draw}
                            className={classname}
                            key = {JSON.stringify(keys[x] + "svg")}>
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
            <image xlinkHref={floorImage} width={props.width} height={props.height} key = {JSON.stringify(floorImage)}></image>
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
                            <motion.path d={createPath(pathCoords)} stroke="#009CA6" fill="none" initial="hidden"
                                         strokeWidth={4}
                                         animate="visible"
                                         variants={draw}
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
        //add if statements to display circles or floor name depending on connections
        const returnDivs = [];
        let nodePos = 0;
        if (props.nodes[props.nodes.length-1].nodeID == end.nodeID) {
            returnDivs.push(<circle cx={endCoord[0]} cy={endCoord[1]} r={8} fill="#F6BD38"
                                    key = {JSON.stringify(endCoord[0] + endCoord[1])}/>);
        }
        else {
            nodePos = props.nodes.findIndex((node) => node.nodeID == end.nodeID);
            returnDivs.push(<text x={end.xcoord} y={end.ycoord} key = {JSON.stringify(endCoord[0] + endCoord[1] + "text")} className="text-5xl font-bold fill-gold-yellow font-OpenSans">
                {props.nodes[nodePos + 1].floor}</text>);
        }
        if (props.nodes[0].nodeID == start.nodeID) {
            returnDivs.push(<circle cx={startCoord[0]} cy={startCoord[1]} key = {JSON.stringify(startCoord[0] + startCoord[1])} r={8} fill="#012D5A"/>);
        }
        else {
            nodePos = props.nodes.findIndex((node) => node.nodeID == start.nodeID);
            returnDivs.push(<text x={start.xcoord} y={start.ycoord} key = {JSON.stringify(startCoord[0] + startCoord[1] + "text")} className="text-5xl font-bold fill-deep-blue font-OpenSans">
                {props.nodes[nodePos - 1].floor}</text>);
        }
        return (returnDivs);
    }

    function createBlankFloor(floor: string) {
        const floorImage = props.images[floor];
        return (
            <image key = {JSON.stringify(floorImage + "placeholder")} xlinkHref={floorImage} width={props.width} height={props.height}></image>
        );
    }

    const viewBox = "0 0 " + (props.width) + " " + (props.height);
    if (props.nodes[0] != null) {
        return (
            <>
                <div className="flex flex-col" key = {JSON.stringify("floors" + props.nodes)}>
                    {createFloors()}
                </div>
            </>
        );
    }
    else {
        return (
            <>

                <motion.svg width={props.width * props.scale}
                            height={props.height * props.scale}
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
