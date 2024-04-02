// import { JSX } from "react/jsx-runtime";
// import { motion } from "framer-motion";
//
// function PathVisual(props: { path: number[][]; image: string; width: number; height: number; scale:number; showPath: boolean} ) {
//     const pathArray = props.path;
//
//     const draw = {
//         hidden: { pathLength: 0, opacity: 1 },
//         visible: {
//             opacity: 1,
//             pathLength: 1,
//             transition: {
//                 duration: 5,
//                 ease: "linear",
//             },
//         }
//     };
//
//     function createPaths() {
//         const lines: JSX.Element[] = [];
//         for (let i = 0; i < pathArray.length - 1; i++){
//             lines.push(
//                 <line
//                     x1={pathArray[i][0]}
//                     y1={pathArray[i][1]}
//                     x2={pathArray[i+1][0]}
//                     y2={pathArray[i+1][1]}
//                     stroke="#009CA6"
//                     strokeWidth={4}
//                 />);
//         }
//         return lines;
//     }
//
//     function LinesToPath({ lines }) {
//         const pathD = lines.reduce((acc, line) => {
//             const { props } = line;
//             const { x1, y1, x2, y2 } = props;
//             return acc + `M ${x1} ${y1} L ${x2} ${y2} `;
//         }, '');
//
//         // Close the path by connecting the last point to the first point
//         const fullPathD = pathD + 'Z';
//
//         return (
//             <motion.path d={fullPathD} stroke="#009CA6" fill="none" variants={draw} initial="hidden" animate="visible"/>
//         );
//     }
//
//
//     const viewBox = "0 0 " + (props.width)  + " " + (props.height);
//
//     return (
//         <motion.svg width={props.width * props.scale}
//                     height={props.height * props.scale}
//                     viewBox={viewBox}
//                     initial="hidden"
//                     animate="visible"
//                     variants={draw}>
//             <image xlinkHref={props.image} width={props.width} height={props.height}></image>
//             <LinesToPath lines={createPaths()} />
//             function
//             <circle cx={pathArray[0][0]} cy={pathArray[0][1]} r={8} fill="blue"/>
//             <circle cx={pathArray[pathArray.length - 1][0]} cy={pathArray[pathArray.length - 1][1]} r={8} fill="blue"/>
//         </motion.svg>
//     );
//
// }
//
// export default PathVisual;



// import { JSX } from "react/jsx-runtime";
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
        let path = `M ${pathArray[0][0]} ${pathArray[0][1]}`;
        for (let i = 1; i < pathArray.length; i++) {
            path += ` L ${pathArray[i][0]} ${pathArray[i][1]}`;
        }
        console.log(path);
        return path;
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
            <motion.path d={createPath()} stroke="#009CA6" fill="none" initial="hidden"
                         animate="visible"
                         variants={draw}/>
            <circle cx={pathArray[0][0]} cy={pathArray[0][1]} r={8} fill="blue"/>
            <circle cx={pathArray[pathArray.length - 1][0]} cy={pathArray[pathArray.length - 1][1]} r={8}
                    fill="blue"/>
        </motion.svg>
    );
}

export default PathVisual;
