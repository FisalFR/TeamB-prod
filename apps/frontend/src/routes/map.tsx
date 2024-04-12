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
import PathVisual from "../components/map/PathVisual.tsx";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {startEndNodes} from "common/src/pathfinding.ts";
import Node from "../../../../packages/common/src/node";
import ZoomButtons from "../components/map/ZoomButtons.tsx";
import FloorSelector from "../components/map/FloorSelector.tsx";
import {NavLink} from "../components/NavLink.tsx";


export function Map(){
    interface NodeData {
        [key: string]: {
            id: string;
            coords: number[];
        };
    }

    interface FloorMap {
        [key: string]: Node[][];
    }

    interface FloorImages {
        [key: string]: string;
    }

    const PlusSvg = <img src={plus} alt="Plus" className={"w-5"} />;
    const MinusSvg = <img src={minus} alt="Minus" className={"w-5"} />;

    const [zoom, setZoom] = useState(0.4);
    const [showPath, setShowPath] = useState(false);

    const [request, setRequest] = useState<startEndNodes>({startNode: "", endNode: ""});
    const [algo, setAlgo] = useState<string>("Astar");

    const [nodes, setNodes] = useState(["Error accessing map points"]);

    const [nodeData, setNodeData] = useState<NodeData>({});
    const [floorMap, setFloorMap] = useState<FloorMap>({});
    const [pathNodes, setPathNodes] = useState<Node[]>([]);

    const floorImages: FloorImages = {
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
        setZoom(prevZoom => Math.max(prevZoom * 0.8, 0.4)); // Decrease zoom level, min 0.4
    }


    function findPath(start: string, end: string) {
        const startend = {startNode: start, endNode: end, algorithm: algo};
        axios.post(`/api/pathfinding/`, startend,{
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

    function handleStartChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setRequest({...request, startNode: nodeData[e.target.value].id});
        setShowPath(true);
        findPath(nodeData[e.target.value].id, request.endNode);
    }
    function handleEndChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setRequest({...request, endNode: nodeData[e.target.value].id});
        setShowPath(true);
        findPath(request.startNode, nodeData[e.target.value].id);
    }

    useEffect( () => {
        axios.get("/api/pathfinding/halls").then((response) => {
            const nodeStrings = [];
            const tempNodeData: NodeData = {};
            for (let i = 0; i < response.data.length; i++) {
                nodeStrings.push(response.data[i].longName);
                tempNodeData[response.data[i].longName as keyof NodeData] = {id: response.data[i].nodeID, coords: [response.data[i].xcoord, response.data[i].ycoord]};
            }
            setNodes(nodeStrings);
            setNodeData(tempNodeData);
            setRequest({startNode: tempNodeData[nodeStrings[0] as keyof NodeData].id, endNode: tempNodeData[nodeStrings[0] as keyof NodeData].id});

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
                                    scale={zoom} showPath={showPath} floormap={floorMap as Record<string, Node[][]>} nodes={pathNodes}
                                    images={floorImages as Record<string, string>}/>
                    </div>
                    <div
                        className="absolute top-5 left-5 flex flex-col bg-white h-fit rounded-xl items-end">
                        <div className="grid grid-cols-[auto_1fr] grid-rows-3 h-fit justify-items-center items-center pt-2 pr-2 pl-2">
                            <img src={from} alt="from" className={"px-1"}/>
                            <Select label="" id="nodeStartSelect" options={nodes}
                                    onChange={handleStartChange as (e: React.ChangeEvent<HTMLSelectElement>) => void}/>
                            <img src={dots} alt="dots" className={"h-7 pb-1 px-1"}/>
                            <div></div>
                            <img src={destination} alt="destination" className={"px-1"}/>
                            <Select label="" id="nodeEndSelect" options={nodes}
                                    onChange={handleEndChange as (e: React.ChangeEvent<HTMLSelectElement>) => void}/>
                        </div>
                        <div className="flex flex-row justify-center mt-2 w-full bg-deep-blue rounded-br-xl rounded-bl-xl font-OpenSans items-center font-bold text-bone-white">
                            <div className="divide-x divide-solid py-2 flex flex-row">
                                <NavLink px="px-8" onClick={() => setAlgo("Astar")} > A* </NavLink>
                                <NavLink px="px-8" onClick={() => setAlgo("BFS")}> BFS </NavLink>
                                <NavLink px="px-8" onClick={() => setAlgo("DFS")}> DFS </NavLink>
                                <NavLink px="px-8"> DIJKSTRA </NavLink>
                            </div>

                        </div>


                    </div>
                    <FloorSelector
                        onClick1={() => setCurrentFloor("L2")}
                        onClick2={() => setCurrentFloor("L1")}
                        onClick3={() => setCurrentFloor("1")}
                        onClick4={() => setCurrentFloor("2")}
                        onClick5={() => setCurrentFloor("3")}
                        currentFloor={currentFloor}
                    />
                    <ZoomButtons onClick1={zoomIn} plusSvg={PlusSvg}
                                 onClick2={zoomOut} minusSvg={MinusSvg}/>

                </div>
            </div>
        </>
    );
}

export default Map;
