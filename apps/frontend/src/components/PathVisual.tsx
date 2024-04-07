import { motion } from "framer-motion";
import Node from "../../../../packages/common/src/node";

function PathVisual(props: { path: number[][]; image: string; width: number; height: number; scale:number;
    showPath: boolean; floormap: Map<string, Node[][]>; nodes: Node[]; images: Map<string, string>}) {
    //const pathCoords = props.path;
    let startCoord = [];
    let endCoord = [];
    if (props.nodes[0] != null) {
        startCoord = [props.nodes[0].xcoord, props.nodes[0].ycoord];
        endCoord = [props.nodes[props.nodes.length - 1].xcoord, props.nodes[props.nodes.length - 1].ycoord];
        alert ("here");
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
        const floorSVGs = [];
        for (const key in props.floormap) {
            floorSVGs.push(
                <>
                <motion.svg width={props.width * props.scale}
                            height={props.height * props.scale}
                            viewBox={viewBox}
                            initial="hidden"
                            animate="visible"
                            variants={draw}>
                    {createFloor(key)}
                    {createStartEnd()}
                </motion.svg>
                </>
            );
            return floorSVGs;
        }
    }

    function createFloor(floor: string) {
        const floorImage = props.images[floor];
        const floorPaths = props.floormap[floor];
        const pathDivs = [];
        pathDivs.push(
            <image xlinkHref={floorImage} width={props.width} height={props.height}></image>
        );
        for (let i = 0; i < floorPaths.length; i++) {
            const pathCoords = [];
            for (let j = 0; j < floorPaths[i]; j++) {
                pathCoords.push([floorPaths[i].xcoord, floorPaths[i].ycoord]);
            }
            pathDivs.push(
                <>
                    <motion.path d={createPath(pathCoords)} stroke="#009CA6" fill="none" initial="hidden"
                                 stroke-width={4}
                                 animate="visible"
                                 variants={draw}/>
                </>
            );
        }
        return pathDivs;

    }

    function createStartEnd() {
        //add if statements to display circles or floor name depending on connections
        return (
            <>
                <circle cx={startCoord[0]} cy={startCoord[1]} r={8}
                        fill="#F6BD38"/>
                <circle cx={endCoord[0]} cy={endCoord[1]} r={8} fill="#012D5A"/>
            </>
        );
    }

    function createBlankFloor(floor) {
        const floorImage = props.images[floor];
        return (
            <image xlinkHref={floorImage} width={props.width} height={props.height}></image>
        );
    }

    const viewBox = "0 0 " + (props.width) + " " + (props.height);
    if (props.nodes[0] != null) {
        return (
            <>
                {createFloors()}
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
                            variants={draw}>
                    {createBlankFloor("L1")}
                </motion.svg>

            </>
        );
    }

}

export default PathVisual;
