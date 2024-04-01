import maze from "../assets/MazeHero/MazeHero.svg";
import MazeLineComponent from "../components/mazeLineComponent.tsx";

export default function HeroImage() {
    return <div className="relative max-w-lg">
        <img src={maze} alt="Maze"
             className="left-column mt-5 rounded-full bg-white p-3 drop-shadow-md  z-0"/>
        <MazeLineComponent/>
    </div>;
}
