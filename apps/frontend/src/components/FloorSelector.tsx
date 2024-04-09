import React from "react";
import MapFloorButton from "../components/MapFloorButton.tsx";
function FloorSelector(props: {
    onClick1: () => void,
    onClick2: () => void,
    onClick3: () => void,
    onClick4: () => void,
    onClick5: () => void
}) {
    return <div className={"fixed bottom-7 left-7 flex flex-col gap-1"}>
        <MapFloorButton onClick={props.onClick5} children={"3"}/>
        <MapFloorButton onClick={props.onClick4} children={"2"}/>
        <MapFloorButton onClick={props.onClick3} children={"1"}/>
        <MapFloorButton onClick={props.onClick2} children={"L1"}/>
        <MapFloorButton onClick={props.onClick1} children={"L2"}/>
    </div>;
}

export default FloorSelector;
