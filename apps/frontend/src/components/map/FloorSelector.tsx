import React from "react";
import MapFloorButton from "./MapFloorButton.tsx";
function FloorSelector(props: {
    onClick1: () => void,
    onClick2: () => void,
    onClick3: () => void,
    onClick4: () => void,
    onClick5: () => void,
    currentFloor: string
}) {
    return <div className={"fixed bottom-7 left-7 flex flex-col gap-1"}>
        <MapFloorButton onClick={props.onClick5} children={"3"} highlighted={props.currentFloor === "3"}/>
        <MapFloorButton onClick={props.onClick4} children={"2"} highlighted={props.currentFloor === "2"}/>
        <MapFloorButton onClick={props.onClick3} children={"1"} highlighted={props.currentFloor === "1"}/>
        <MapFloorButton onClick={props.onClick2} children={"L1"} highlighted={props.currentFloor === "L1"}/>
        <MapFloorButton onClick={props.onClick1} children={"L2"} highlighted={props.currentFloor === "L2"}/>
    </div>;
}

export default FloorSelector;
