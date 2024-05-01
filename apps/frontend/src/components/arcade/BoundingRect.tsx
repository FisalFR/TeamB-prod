import {useEffect, useRef} from "react";

function BoundingRect(props:{x1: number, x2: number, changeOverlap: (boolean) => void, playerX: number}) {

    const overlapping = useRef(false);

    useEffect(() => {
        if ((props.playerX > props.x1) && (props.playerX < props.x2)) {
            if (!overlapping.current) {
                overlapping.current = true;
                props.changeOverlap(true);
            }
        }
        else {
            if (overlapping.current) {
                overlapping.current = false;
                props.changeOverlap(false);
            }
        }

    });
    function getStyle() {
        return (
            {
                width: props.x2-props.x1 + "px",
                height: "20px",
                top: "460px",
                opacity: 0.5,
                left: props.x1 + "px"

            }
        );
    }

    return(
        <>
            <div className="absolute" style={getStyle()}>
            </div>
        </>
    );
}

export default BoundingRect;
