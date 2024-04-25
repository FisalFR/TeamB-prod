import HoverDivs from "@/components/arcade/HoverDivs.tsx";
import ArcadeButton from "@/components/arcade/ArcadeButton.tsx";

function VaseTrash(props:{x1: number, x2: number,playerX: number, currentLoc: string; trashVase: () => void}) {

    /*function trashVase() {
        console.log();
    }*/

    return(
        <>
            <HoverDivs showLoc="Pots" currentLoc={props.currentLoc} playerX={props.playerX} x1={props.x1} x2={props.x2}>
                <ArcadeButton onClick={() => props.trashVase()}>Trash Vase</ArcadeButton>
            </HoverDivs>
        </>
    );
}

export default VaseTrash;
