// import maze from "../assets/MazeHero/MazeHero.svg";
import MazeLineComponent from "./MazeLineComponent.tsx";

export default function HeroImage() {
    return (
        <div className="absolute -right-[30%] top-[1%] flex-grow w-8/12 overflow-hidden">
            <MazeLineComponent />
        </div>
    );
}
