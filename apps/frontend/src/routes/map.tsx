import ll1map from "../assets/floors/00_thelowerlevel1.png";
import ll2map from "../assets/floors/00_thelowerlevel2.png";
import l1map from "../assets/floors/01_thefirstfloor.png";
import l2map from "../assets/floors/02_thesecondfloor.png";
import l3map from "../assets/floors/03_thethirdfloor.png";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";
import PathVisual from "../components/map/PathVisual.tsx";
import React, {useEffect, useState, useCallback} from "react";
import axios from "axios";
import {startEndNodes} from "common/src/pathfinding.ts";
import Node from "../../../../packages/common/src/node";
import ZoomButtons from "../components/map/ZoomButtons.tsx";
import FloorSelector from "../components/map/FloorSelector.tsx";
import {PathSelector} from "../components/map/PathSelector.tsx";
import {TransformComponent, TransformWrapper, useControls} from "react-zoom-pan-pinch";


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

    const [showPath, setShowPath] = useState(false);

    const [request, setRequest] = useState<startEndNodes>({startNode: "", endNode: ""});
    const [algo, setAlgo] = useState<string>("Astar");
    const [selectedAlgo, setSelectedAlgo] = useState<string | null>("Astar");


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



    const [currentFloor, setCurrentFloor] = useState("2");



    const findPath = useCallback((start: string, end: string) => {
        const startend = {startNode: start, endNode: end, algorithm: algo};
        axios.post(`/api/pathfinding/`, startend, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.data.nodeCoords.length != 0) {
                setShowPath(true);
                setFloorMap(response.data.floorMap);
                setPathNodes(response.data.nodes);
                setCurrentFloor(response.data.nodes[0].floor);
            } else {
                alert("No path with selected nodes");
            }
        });
    }, [algo]); // algo is a dependency here

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

            setPathNodes([response.data[0], response.data[response.data.length-1]]);
            setShowPath(false);
        });
    }, []);

    useEffect(() => {
        if(request.startNode && request.endNode) {
            findPath(request.startNode, request.endNode);
        }
    }, [algo, findPath, request.endNode, request.startNode]);

    function ZoomControls() {
        const { zoomIn, zoomOut } = useControls();
        return(
            <ZoomButtons onClick1={() => zoomIn()} plusSvg={PlusSvg}
                         onClick2={() => zoomOut()} minusSvg={MinusSvg}/>
        );
    }


    return (
        <div className="fixed">
            <TransformWrapper limitToBounds={true} disablePadding={true}
                              initialScale={0.38}
                              minScale={0.38}
                              maxScale={1.28}>
                <TransformComponent wrapperStyle={{ width: screen.width, height: "calc(100vh - 55px)"}}>
                    <PathVisual key={JSON.stringify(request)} width={5000} height={3400} currentFloor={currentFloor}
                                showPath={showPath} floormap={floorMap as Record<string, Node[][]>}
                                nodes={pathNodes}
                                images={floorImages as Record<string, string>}/>
                </TransformComponent>
                <PathSelector options={nodes} handleStartChange={handleStartChange}
                              handleEndChange={handleEndChange} onClick={() => {
                    setAlgo("Astar");
                    setSelectedAlgo("Astar");
                }} selectedAlgo={selectedAlgo} onClick1={() => {
                    setAlgo("BFS");
                    setSelectedAlgo("BFS");
                }} onClick2={() => {
                    setAlgo("DFS");
                    setSelectedAlgo("DFS");
                }} onClick3={() => {
                    setAlgo("Dijkstra");
                    setSelectedAlgo("Dijkstra");
                }}/>
                <FloorSelector
                    onClick1={() => setCurrentFloor("L2")}
                    onClick2={() => setCurrentFloor("L1")}
                    onClick3={() => setCurrentFloor("1")}
                    onClick4={() => setCurrentFloor("2")}
                    onClick5={() => setCurrentFloor("3")}
                    currentFloor={currentFloor}
                />
                <ZoomControls/>
            </TransformWrapper>
        </div>
    );
}

export default Map;
