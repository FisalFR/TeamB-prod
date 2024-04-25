import HoverDivs from "@/components/arcade/HoverDivs.tsx";
import ArcadeButton from "@/components/arcade/ArcadeButton.tsx";

function DeliveryBike(props:{x1: number, x2: number,playerX: number, currentLoc: string; hasVase: boolean;
    deliverVase: () => void}) {

    function deliveryButton() {
        if (props.hasVase) {
            return(
                <>
                    <ArcadeButton onClick={() => props.deliverVase()}>Deliver!</ArcadeButton>
                </>
            );
        }
    }

    return(
        <>
            <HoverDivs showLoc="Delivery" currentLoc={props.currentLoc} playerX={props.playerX} x1={props.x1} x2={props.x2}>
                {deliveryButton()}
            </HoverDivs>
        </>
    );
}

export default DeliveryBike;
