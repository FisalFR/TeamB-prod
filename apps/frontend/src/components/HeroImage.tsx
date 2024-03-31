import maze from "../assets/MazeHero/MazeHero.svg";
import mazeLine from "../assets/MazeHero/MazeLine.svg";
import { useSpring, animated } from 'react-spring';
// import {useEffect, useState} from "react";


 function AnimateHeroLine() {
    const props = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        config: { duration: 1000 }, // Adjust duration as needed
        loop: { reverse: true }, // Loop animation with reverse
    });

    return <animated.div style={props}><HeroLine/></animated.div>;
}


export default function HeroImage() {
    return <div className="relative max-w-lg">
        <img src={maze} alt="Maze"
             className="left-column mt-5 rounded-full bg-white p-3 drop-shadow-md  z-0"/>
        <AnimateHeroLine/>
    </div>;
}
function HeroLine() {
    return <img src={mazeLine} alt="MazeLine" className="absolute top-0 left-0 z-10 mt-5 p-3"/>;
}

//--EXPERIMENTAL--

// export default function HeroImage() {
//     const [toggle, setToggle] = useState(false);
//
//     useEffect(() => {
//         // setImmediate(() =>{
//             setToggle(true);
//         // }
//
//     }, []);
//
//     return <div className="relative max-w-lg">
//         <img src={maze} alt="Maze"
//              className="left-column mt-5 rounded-full bg-white p-3 drop-shadow-md  z-0"/>
//         <MySVG toggle={toggle} className ="z-20"/>
//     </div>;
// }
//
// function MySVG({toggle}) {
//     const [length, setLength] = useState(null);
//     const animatedStyle = useSpring({
//         strokeDasharray: length,
//         strokeDashoffset: toggle ? 0: length
//     });
//     return (
//         <svg>
//         <animated.path
//             style={animatedStyle}
//             ref={(ref) => {
//                 console.log(ref);
//                 if(ref){
//                     setLength(ref.getTotalLength());
//                 }
//             }}
//             stroke="#009ca6"
//             strokeWidth= "8px"
//             d="m10.9,467.55l62.44.91c.26,36.04,5.6,103.08,42.56,175.89,29.51,58.12,67.39,96.7,92.77,118.78,14.42-16.34,28.84-32.69,43.26-49.03,98.7,81.88,235.68,99.84,350.42,45.98,108.7-51.03,180.95-158.77,187.95-279.85-21.77-.72-43.54-1.43-65.31-2.15.77-16.33,3.7-112.76-71.21-189.45-63.53-65.05-141.58-73.42-161.8-74.98v64.49c15.11,1.13,56.98,6.24,96.44,38.35,40.62,33.05,53.89,74.53,57.82,89.01-20.98,1.09-41.96,2.17-62.94,3.26-5.41-10.33-16.17-27.62-35.59-42.98-21.46-16.97-42.99-23.3-54.67-25.85.71,42.18,1.41,84.36,2.12,126.54h-31.62v134.77c-11.46-.05-37.46-1.69-64.77-17.95-26.52-15.79-40.25-37.03-45.88-47.01-17.02,14.62-34.03,29.24-51.05,43.86-8.48-14.78-18.49-35.73-25.23-62.22-7.32-28.78-8.18-53.83-7.42-71.66h-60.67c2.29-22.38,8.44-56.16,26.3-93.35,19.94-41.54,45.89-69.43,63.22-85.4-13.99-14.37-27.98-28.75-41.97-43.12,19.6-16.64,98.53-79.71,216.62-78.28,124.92,1.51,205.08,74.14,222.62,90.84,15.4-14.31,30.79-28.62,46.19-42.92-23.34-23.38-62.65-57.07-119.46-82.9-51.76-23.53-98.51-31.65-130.06-34.62V15.39"
//         />
//         </svg>
//     );
// }
