import Button from "@/components/Button.tsx";
import HoverDivs from "@/components/arcade/HoverDivs.tsx";

function VaseBox(props:{x1: number, x2: number,playerX: number, currentLoc: string; grabVase: () => void; hasVase: boolean}) {

    function newButton() {
        if (!props.hasVase) {
            return (<><Button onClick={() => props.grabVase()}>New Vase</Button></>);
        }
    }

    return(
        <>
            <HoverDivs showLoc="Pots" currentLoc={props.currentLoc} playerX={props.playerX} x1={props.x1} x2={props.x2}>
                {newButton()}
            </HoverDivs>
        </>
    );
}

export default VaseBox;
