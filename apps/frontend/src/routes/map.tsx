import ll1map from "../assets/floors/00_thelowerlevel1.png";
import ll2map from "../assets/floors/00_thelowerlevel2.png";
import l1map from "../assets/floors/01_thefirstfloor.png";
import l2map from "../assets/floors/02_thesecondfloor.png";
import l3map from "../assets/floors/03_thethirdfloor.png";
import from from "../assets/from_to_icons/circle_from.svg";
import dots from "../assets/from_to_icons/circles_from_to.svg";
import destination from "../assets/from_to_icons/icon_to.svg";
import Select from "../components/Select.tsx";
import PathVisual from "../components/PathVisual.tsx";
import Button from "../components/Button.tsx";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import axios from "axios";
import {startEndNodes} from "common/src/pathfinding.ts";

export function Map(){

    const [zoom, setZoom] = useState(0.2);
    const [pathPoints, setPathPoints] = useState([0, 0]);
    const [showPath, setShowPath] = useState(false);

    const [request, setRequest] = useState<startEndNodes>({startNode: "", endNode: ""});

    const [nodes, setNodes] = useState(["Error accessing map points"]);

    const [nodeData, setNodeData] = useState({});


    const divRef = useRef<HTMLDivElement>(null);

    const [currentMap, setCurrentMap] = useState(ll1map);
    function zoomIn() {
        setZoom(prevZoom => Math.min(prevZoom * 1.2, 2.0)); // Increase zoom level, max 2.0
    }

    function zoomOut() {
        setZoom(prevZoom => Math.max(prevZoom * 0.8, 0.1)); // Decrease zoom level, min 0.1
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
                setShowPath(true);
            }
            else {
                alert("No path on Floor Lower Level 1 with selected nodes");
            }
        });
    }

    function handleStartChange(e: ChangeEvent<HTMLInputElement>) {
        setRequest({...request, startNode: nodeData[e.target.value].id});
        setPathPoints([nodeData[e.target.value].coords, pathPoints[pathPoints.length-1]]);
        setShowPath(false);
    }
    function handleEndChange(e: ChangeEvent<HTMLInputElement>) {
        setRequest({...request, endNode: nodeData[e.target.value].id});
        setPathPoints([pathPoints[0], nodeData[e.target.value].coords]);
        setShowPath(false);
        findPath();
    }

    useEffect( () => {
        axios.get("/api/pathfinding/halls").then((response) => {
            const nodeStrings = [];
            const tempNodeData = {};
            for (let i = 0; i < response.data.length; i++) {
                nodeStrings.push(response.data[i].longName);
                tempNodeData[response.data[i].longName] = {id: response.data[i].nodeID, coords: [response.data[i].xcoord, response.data[i].ycoord]};
            }
            setNodes(nodeStrings);
            setNodeData(tempNodeData);
            setRequest({startNode: tempNodeData[nodeStrings[0]].id, endNode: tempNodeData[nodeStrings[0]].id});
            setPathPoints([tempNodeData[nodeStrings[0]].coords]);
        });
    }, []);

    return (
        <div className="centerContent gap-10 w-full h-full">
            <div className="relative"> {/* Add relative positioning here */}
                <div className="w-full h-full max-w-[1000px] max-h-[calc(100vh-200px)] overflow-scroll" ref={divRef}>
                    <PathVisual key={JSON.stringify(pathPoints)} path={pathPoints} image={currentMap} width={5000}
                                height={3400}
                                scale={zoom}
                                showPath={showPath}/>
                </div>
                <div className="absolute top-5 left-5 flex flex-row p-2 bg-white h-fit rounded-2xl items-end">
                    <div className="grid grid-cols-[auto_1fr] grid-rows-3 h-fit justify-items-center items-center">
                        <img src={from} alt="from" className={"px-1"}/>
                        <Select label="" id="nodeStartSelect" options={nodes}
                                onChange={handleStartChange}/>
                        <img src={dots} alt="dots" className={"pb-1 px-1"}/>
                        <div></div>
                        <img src={destination} alt="destination" className={"px-1"}/>
                        <Select label="" id="nodeEndSelect" options={nodes}
                                onChange={handleEndChange}/>
                    </div>
                </div>
                <div className={"absolute bottom-5 left-5 flex flex-col gap-0.5"}>
                    <Button onClick={() => setCurrentMap(l3map)} children={"3"}/>
                    <Button onClick={() => setCurrentMap(l2map)} children={"2"}/>
                    <Button onClick={() => setCurrentMap(l1map)} children={"1"}/>
                    <Button onClick={() => setCurrentMap(ll1map)} children={"L1"}/>
                    <Button onClick={() => setCurrentMap(ll2map)} children={"L2"}/>
                </div>
                <div className={"absolute bottom-5 right-5 flex flex-col"}>
                    <Button onClick={zoomIn} children={"+"}/>
                    <Button onClick={zoomOut} children={"-"}/>
                </div>

            </div>
        </div>
    );
}

export default Map;
