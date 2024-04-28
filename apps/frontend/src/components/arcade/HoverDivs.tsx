import {ReactNode, useRef} from "react";
import BoundingRect from "@/components/arcade/BoundingRect.tsx";

function HoverDivs(props:{x1: number, x2: number, playerX: number, showLoc: string, currentLoc: string, children: ReactNode}) {

    const overlapping = useRef(false);

    function changeOverlap(isOverlapping: boolean) {
        overlapping.current = isOverlapping;
    }


    function divStyle() {
        let display = "none";
        if ((overlapping.current) && (props.currentLoc == props.showLoc)) {
            display = "flex";
        }
        return {
            top: "230px",
            left: props.x1 + "px",
            display: display,
            width: props.x2 - props.x1 + "px"

        };
    }
    function checkLoc() {
        let display = "none";
        if (props.currentLoc == props.showLoc) {
            display = "block";
        }
        return {display: display};
    }

    return(
        <>
            <div style = {checkLoc()}>
                <BoundingRect x1={props.x1} x2={props.x2} changeOverlap={changeOverlap} playerX={props.playerX}/>
            </div>

            <div className="absolute flex-col h-fit gap-2 centerContent" style={divStyle()}>
                {props.children}
            </div>
        </>
    );
}

export default HoverDivs;
