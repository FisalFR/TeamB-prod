// import maze from "../assets/MazeHero/MazeHero.svg";
import MazeLineComponent from "../components/mazeLineComponent.tsx";

export default function HeroImage() {
    return (
        <div className=" absolute -right-96 -top-10 flex-grow w-10/12 max-w-full max-h-lg p-3 drop-shadow-md overflow-hidden">
            <MazeLineComponent />
        </div>
    );
}
