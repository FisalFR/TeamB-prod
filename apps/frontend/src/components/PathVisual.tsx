import { motion } from "framer-motion";
import Node from "../../../../packages/common/src/node";

function PathVisual(props: { path: number[][]; image: string; width: number; height: number; scale:number;
    showPath: boolean; floormap: Map<string, Node[][]>; nodes: Node[]}) {
    //const pathCoords = props.path;
    const startCoord = [props.nodes[0].xcoord, props.nodes[0].ycoord];
    const endCoord = [props.nodes[props.nodes.length - 1].xcoord, props.nodes[props.nodes.length - 1].ycoord];

    const draw = {
        hidden: { pathLength: 0, opacity: 1 },
        visible: {
            opacity: 1,
            pathLength: 1,
            transition: {
                duration: 5,
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
        for (const [floor, paths] of Object.entries(props.floormap)) {

        }
        return selectOptions.map((option) =>
            <option value={option}>{option}</option>);
    }

    function createFloor() {


    }

    const viewBox = "0 0 " + (props.width)  + " " + (props.height);

    return (
        <>
        <motion.svg width={props.width * props.scale}
                    height={props.height * props.scale}
                    viewBox={viewBox}
                    initial="hidden"
                    animate="visible"
                    variants={draw}>
            <image xlinkHref={props.image} width={props.width} height={props.height}></image>
            <motion.path d={createPath(props.path)} stroke="#009CA6" fill="none" initial="hidden" stroke-width={4}
                         animate="visible"
                         variants={draw}/>
            <circle cx={startCoord[0]} cy={startCoord[1]} r={8}
                    fill="#F6BD38"/>
            <circle cx={endCoord[0]} cy={endCoord[1]} r={8} fill="#012D5A"/>
        </motion.svg>
        </>
    );
}

export default PathVisual;
