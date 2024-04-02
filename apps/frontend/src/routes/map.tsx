import ll1map from "../assets/floors/00_thelowerlevel1.png";
import Select from "../components/Select.tsx";
import PathVisual from "../components/PathVisual.tsx";
import Button from "../components/Button.tsx";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import axios from "axios";
import {startEndNodes} from "common/src/pathfinding.ts";

export function Map(){

    //const testPathPoints = [
    //    [2665, 1043], [2490, 1043], [2445, 1043], [2310, 1043], [2215, 1045], [2220, 974], [2220, 904], [2185, 904], [2130, 904]];

    const [zoom, setZoom] = useState(0.2);
    const [request, setRequest] = useState<startEndNodes>({startNode: "", endNode: ""});

    const [nodes, setNodes] = useState(["Error accessing map points"]);

    const [nodeStringToID, setNodesStringToID] = useState({});

    const [pathPoints, setPathPoints] = useState([2665, 1043]);

    const divRef = useRef<HTMLDivElement>(null);
    function zoomSlider(e: ChangeEvent<HTMLInputElement>) {
        setZoom(0.2 * parseFloat(e.target.value));
        (divRef.current as HTMLDivElement).scroll(1000 - 1000/parseFloat(e.target.value), parseFloat(e.target.value));
    }

    function findPath() {
        axios.post("/api/pathfinding", request,{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.data.nodes.length != 0) {
                const nodeCoords = [];
                for (let i = 0; i < response.data.nodes.length; i++) {
                    nodeCoords.push(response.data.nodes[i]);
                }
                setPathPoints(nodeCoords);
            }
            else {
                alert("No path on Floor Lower Level 1 with selected nodes");
            }
        });
    }

    function handleStartChange(e: ChangeEvent<HTMLInputElement>) {
        setRequest({...request, startNode: nodeStringToID[e.target.value]});
    }
    function handleEndChange(e: ChangeEvent<HTMLInputElement>) {
        setRequest({...request, endNode: nodeStringToID[e.target.value]});
    }

    useEffect( () => {
        axios.get("/api/pathfinding/").then((response) => {
            const nodeStrings = [];
            const strToID = {};
            for (let i = 0; i < response.data.length; i++) {
                nodeStrings.push(response.data[i].longName);
                strToID[response.data[i].longName] = response.data[i].nodeID;
            }
            setNodes(nodeStrings);
            setNodesStringToID(strToID);
            setRequest({startNode: strToID[nodeStrings[0]], endNode: strToID[nodeStrings[0]]});
        });
    }, []);

    return (
        <div div className="centerContent gap-10 w-full h-fit">
            <div>
                <p className="font-HeadlandOne text-3xl py-3">Floor: Lower Level 1</p>
                <div className="w-fit h-fit max-w-[1000px] max-h-[690px] overflow-scroll" ref={divRef}>
                    <PathVisual key={JSON.stringify(pathPoints)} path={pathPoints} image={ll1map} width={5000} height={3400} scale={zoom}/>
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
