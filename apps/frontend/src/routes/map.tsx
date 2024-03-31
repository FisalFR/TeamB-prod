import ll1map from "../assets/floors/00_thelowerlevel1.png";
import Select from "../components/Select.tsx";
import PathVisual from "../components/PathVisual.tsx";
import Button from "../components/Button.tsx";
import {ChangeEvent, useRef, useState} from "react";

export function Map(){
    const nodes = ["node1", "node2", "node3", "node4"];

    const testPathPoints = [
        [2665, 1043], [2490, 1043], [2445, 1043], [2310, 1043], [2215, 1045], [2220, 974], [2220, 904], [2185, 904], [2130, 904]];

    const [zoom, setZoom] = useState(0.2);
    const [startNode, setStartNode] = useState("");
    const [endNode, setEndNode] = useState("");

    const divRef = useRef<HTMLDivElement>(null);
    function zoomSlider(e: ChangeEvent<HTMLInputElement>) {
        setZoom(0.2 * parseFloat(e.target.value));
        (divRef.current as HTMLDivElement).scroll(1000 - 1000/parseFloat(e.target.value), parseFloat(e.target.value));
    }

    function findPath() {
        alert(startNode + ", " + endNode);
    }

    function handleStartChange(e: ChangeEvent<HTMLInputElement>) {
        setStartNode(e.target.value);
    }
    function handleEndChange(e: ChangeEvent<HTMLInputElement>) {
        setEndNode(e.target.value);
    }

    return (
        <div div className="centerContent gap-10 w-full h-fit">
            <div>
                <p className="font-HeadlandOne text-3xl py-3">Floor: Lower Level 1</p>
                <div className="w-fit h-fit max-w-[1000px] max-h-[690px] overflow-scroll" ref={divRef}>
                    <PathVisual path={testPathPoints} image={ll1map} width={5000} height={3400}
                            scale={zoom}/>
                </div>
                <br/>
                <input type="range" min="1" max="10" step="any" defaultValue="1" onChange={zoomSlider} id="myRange"></input>
                <br/><br/>
            </div>
            <div>
                <Select label="Starting node: " id="nodeStartSelect" options={nodes} onChange={handleStartChange}/><br/><br/>
                <Select label="Ending node: " id="nodeEndSelect" options={nodes} onChange={handleEndChange}/><br/><br/>
                <Button onClick={findPath} children={"Find Path"}/>
            </div>
        </div>
    );
}

export default Map;
