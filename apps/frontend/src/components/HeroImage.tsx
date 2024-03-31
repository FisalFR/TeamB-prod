import maze from "../assets/MazeHero/MazeHero.svg";
import mazeLine from "../assets/MazeHero/MazeLine.svg";
import { useSpring, animated } from 'react-spring';


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
