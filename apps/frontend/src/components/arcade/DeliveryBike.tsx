import HoverDivs from "@/components/arcade/HoverDivs.tsx";
import ArcadeButton from "@/components/arcade/ArcadeButton.tsx";
import bikePNG from "@/assets/arcade/bike.png";
import {useEffect, useRef} from "react";

function DeliveryBike(props:{x1: number, x2: number,playerX: number, currentLoc: string; hasVase: boolean;
    deliverVase: () => void, mode: string, currentTime: number}) {

    const xPos = useRef(140);

    useEffect(() => {
        if (props.currentTime == 0) {
            xPos.current = 140;
        }
        if (props.mode == "delivery") {
            xPos.current-=10;
        }
        else {
            if (xPos.current != 140) {
                xPos.current = 140;
            }
        }
    });
    function deliveryButton() {
        if (props.hasVase) {
            return(
                <>
                    <ArcadeButton onClick={() => props.deliverVase()}>Deliver!</ArcadeButton>
                </>
            );
        }
    }

    function getStyle() {
        if (props.currentLoc != "Delivery") {
            return {display: "none"};
        }
        return {
            display: "block",
            bottom: "90px",
            right: xPos.current + "px",
            zIndex: "inherit"
        };
    }

    return(
        <>
            <img src={bikePNG} alt = "delivery bike" className="absolute max-w-[800px] max-h-[800px]" width={320} style={getStyle()}></img>
            <HoverDivs showLoc="Delivery" currentLoc={props.currentLoc} playerX={props.playerX} x1={props.x1}
                       x2={props.x2}>
                {deliveryButton()}
            </HoverDivs>
        </>
    );
}

export default DeliveryBike;
