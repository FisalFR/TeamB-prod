import Button from "@/components/Button.tsx";
import HoverDivs from "@/components/arcade/HoverDivs.tsx";

function VaseTrash(props:{x1: number, x2: number,playerX: number, currentLoc: string; trashVase: () => void}) {

    /*function trashVase() {
        console.log();
    }*/

    return(
        <>
            <HoverDivs showLoc="Pots" currentLoc={props.currentLoc} playerX={props.playerX} x1={props.x1} x2={props.x2}>
                <Button onClick={() => props.trashVase()}>Trash Vase</Button>
            </HoverDivs>
        </>
    );
}

export default VaseTrash;
