// import maze from "../assets/MazeHero/MazeHero.svg";
import MazeLineComponent from "../components/mazeLineComponent.tsx";

export default function HeroImage() {
    return (
        <div className="w-3/5 max-w-lg max-h-lg bg-white rounded-full p-3 drop-shadow-md overflow-hidden">
            <MazeLineComponent />
        </div>
    );
}
