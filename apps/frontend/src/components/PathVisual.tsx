import { motion } from "framer-motion";

function PathVisual(props: { path: number[][]; image: string; width: number; height: number; scale:number; showPath: boolean} ) {
    const pathArray = props.path;

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

    function createPath() {
        if(props.showPath){
            let path = `M ${pathArray[0][0]} ${pathArray[0][1]}`;
            for (let i = 1; i < pathArray.length; i++) {
                path += ` L ${pathArray[i][0]} ${pathArray[i][1]}`;
            }
            return path;
        }
    }

    const viewBox = "0 0 " + (props.width)  + " " + (props.height);

    return (
        <motion.svg width={props.width * props.scale}
                    height={props.height * props.scale}
                    viewBox={viewBox}
                    initial="hidden"
                    animate="visible"
                    variants={draw}>
            <image xlinkHref={props.image} width={props.width} height={props.height}></image>
            <motion.path d={createPath()} stroke="#009CA6" fill="none" initial="hidden" stroke-width={4}
                         animate="visible"
                         variants={draw}/>
            <circle cx={pathArray[pathArray.length - 1][0]} cy={pathArray[pathArray.length - 1][1]} r={8}
                    fill="#F6BD38"/>
            <circle cx={pathArray[0][0]} cy={pathArray[0][1]} r={8} fill="#012D5A"/>
        </motion.svg>
    );
}

export default PathVisual;
