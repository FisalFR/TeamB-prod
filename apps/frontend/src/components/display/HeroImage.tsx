// import maze from "../assets/MazeHero/MazeHero.svg";
import MazeLineComponent from "./MazeLineComponent.tsx";

export default function HeroImage() {
    return (
        <div className=" absolute -right-2/5 -top-1/3 flex-grow w-10/12 max-w-full max-h-lg p-3 drop-shadow-md overflow-hidden">
            <MazeLineComponent />
        </div>
    );
}
