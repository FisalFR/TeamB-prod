import ll1map from "../assets/floors/00_thelowerlevel1.png";
import ll2map from "../assets/floors/00_thelowerlevel2.png";
import l1map from "../assets/floors/01_thefirstfloor.png";
import l2map from "../assets/floors/02_thesecondfloor.png";
import l3map from "../assets/floors/03_thethirdfloor.png";
import from from "../assets/from_to_icons/circle_from.svg";
import dots from "../assets/from_to_icons/circles_from_to.svg";
import destination from "../assets/from_to_icons/icon_to.svg";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";
import Select from "../components/Select.tsx";
import PathVisual from "../components/PathVisual.tsx";
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import axios from "axios";
import {startEndNodes} from "common/src/pathfinding.ts";
import Node from "../../../../packages/common/src/node";
import ZoomButtons from "../components/ZoomButtons.tsx";
import FloorSelector from "../components/FloorSelector.tsx";

export function Map(){
    const PlusSvg = <img src={plus} alt="Plus" className={"w-5"} />;
    const MinusSvg = <img src={minus} alt="Minus" className={"w-5"} />;

    const [zoom, setZoom] = useState(0.4);
    const [showPath, setShowPath] = useState(false);

    const [request, setRequest] = useState<startEndNodes>({startNode: "", endNode: ""});

    const [nodes, setNodes] = useState(["Error accessing map points"]);

    const [nodeData, setNodeData] = useState({});

    const [floorMap, setFloorMap] = useState({});
    const [pathNodes, setPathNodes] = useState<Node[]>([]);

    const floorImages = {
        "L1": ll1map,
        "L2": ll2map,
        "1": l1map,
        "2": l2map,
        "3": l3map
    };

    const divRef = useRef<HTMLDivElement>(null);

    const [currentFloor, setCurrentFloor] = useState("2");
    function zoomIn() {
        setZoom(prevZoom => Math.min(prevZoom * 1.2, 1.0)); // Increase zoom level, max 1.0
    }

    function zoomOut() {
        setZoom(prevZoom => Math.max(prevZoom * 0.8, 0.4)); // Decrease zoom level, min 0.3
    }

    function findPath(start: string, end: string) {
        const startend = {startNode: start, endNode: end};
        axios.post("/api/pathfinding", startend,{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.data.nodeCoords.length != 0) {
                setShowPath(true);
                setFloorMap(response.data.floorMap);
                setPathNodes(response.data.nodes);
                setCurrentFloor(response.data.nodes[0].floor);
            }
            else {
                alert("No path with selected nodes");
            }
        });
    }

    function handleStartChange(e: ChangeEvent<HTMLInputElement>) {
        setRequest({...request, startNode: nodeData[e.target.value].id});
        setShowPath(true);
        findPath(nodeData[e.target.value].id, request.endNode);
    }
    function handleEndChange(e: ChangeEvent<HTMLInputElement>) {
        setRequest({...request, endNode: nodeData[e.target.value].id});
        setShowPath(true);
        findPath(request.startNode, nodeData[e.target.value].id);
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

            setPathNodes([response.data[0], response.data[response.data.length-1]]);
            setShowPath(false);
        });
    }, []);


    return (
        <>
            <div className="centerContent">
                <div className="relative w-full h-full"> {/* Add relative positioning here */}
                    <div className="w-screen h-screen fixed overflow-scroll" ref={divRef}>
                        <PathVisual key={JSON.stringify(request)} width={5000} height={3400} currentFloor={currentFloor}
                                    scale={zoom} showPath={showPath} floormap={floorMap} nodes={pathNodes}
                                    images={floorImages}/>
                    </div>
                    <div className="absolute top-5 left-5 flex flex-row p-2 bg-white h-fit rounded-2xl items-end">
                        <div className="grid grid-cols-[auto_1fr] grid-rows-3 h-fit justify-items-center items-center">
                            <img src={from} alt="from" className={"px-1"}/>
                            <Select label="" id="nodeStartSelect" options={nodes}
                                    onChange={handleStartChange}/>
                            <img src={dots} alt="dots" className={"h-7 pb-1 px-1"}/>
                            <div></div>
                            <img src={destination} alt="destination" className={"px-1"}/>
                            <Select label="" id="nodeEndSelect" options={nodes}
                                    onChange={handleEndChange}/>
                        </div>
                    </div>
                    <FloorSelector
                        onClick1={() => setCurrentFloor("L2")}
                        onClick2={() => setCurrentFloor("L1")}
                        onClick3={() => setCurrentFloor("1")}
                        onClick4={() => setCurrentFloor("2")}
                        onClick5={() => setCurrentFloor("3")}/>
                    <ZoomButtons onClick1={zoomIn} plusSvg={PlusSvg}
                                 onClick2={zoomOut} minusSvg={MinusSvg}/>

                </div>
            </div>
        </>
    );
}

export default Map;
