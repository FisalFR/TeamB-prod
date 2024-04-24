import ll1map from "../assets/floors/00_thelowerlevel1.png";
import ll2map from "../assets/floors/00_thelowerlevel2.png";
import l1map from "../assets/floors/01_thefirstfloor.png";
import l2map from "../assets/floors/02_thesecondfloor.png";
import l3map from "../assets/floors/03_thethirdfloor.png";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";
import PathVisual from "../components/map/PathVisual.tsx";
import React, {useEffect, useState, useCallback, useRef} from "react";
import axios from "axios";
import {startEndNodes} from "packages/common/src/Pathfinding/pathfinding.ts";
import Node from "../../../../packages/common/src/node";
import ZoomButtons from "../components/map/ZoomButtons.tsx";
import FloorSelector from "../components/map/FloorSelector.tsx";
import {PathSelector} from "../components/map/PathSelector.tsx";
 import PathDirections from "../components/map/PathDirections.tsx";
import {TransformComponent, TransformWrapper, useControls} from "react-zoom-pan-pinch";
import useNodes from "../hooks/useNodes.ts";
import ToggleNodes from "../components/map/ToggleNodes.tsx";



export function Map(){

    interface FloorMap {
        [key: string]: Node[][];
    }

    interface FloorImages {
        [key: string]: string;
    }

    const PlusSvg = <img src={plus} alt="Plus" className={"w-5"} />;
    const MinusSvg = <img src={minus} alt="Minus" className={"w-5"} />;

    const [showPath, setShowPath] = useState(false);
    const [showNodes, setShowNodes] = useState(false);

    const [request, setRequest] = useState<startEndNodes>({startNode: "", endNode: ""});
    const [algo, setAlgo] = useState<string>("Astar");
    const [selectedAlgo, setSelectedAlgo] = useState<string | null>("Astar");
    const {nodes,nodeMap} = useNodes();
    const [floorMap, setFloorMap] = useState<FloorMap>({});
    const [pathNodes, setPathNodes] = useState<Node[]>([{
        nodeID: "",
        xcoord: 0,
        ycoord: 0,
        floor: "",
        building: "",
        nodeType: "",
        longName: "",
        shortName: "",
        neighbors: []
    }]);

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
        setRequest({...request, startNode: e.target.value});
        setShowPath(true);
        findPath(e.target.value, request.endNode);
    }
    function handleEndChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setRequest({...request, endNode: e.target.value});
        setShowPath(true);
        findPath(request.startNode, e.target.value);
    }

    function handleChangeFloor(floor: string) {
        setCurrentFloor(floor);
    }

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
    let ref = useRef(0);
    function onClickCircle(Node: Node) {
        if (ref.current % 2 == 0){
            setRequest({...request, startNode: Node.nodeID});
            ref.current++;
        }
        else {
            setRequest({...request, endNode: Node.nodeID});
            ref.current++;
        }
    }


    return (
        <div className="relative">
            <TransformWrapper limitToBounds={true} disablePadding={true}
                              initialScale={0.384}
                              minScale={0.384}
                              maxScale={1.28}
            >

                <TransformComponent wrapperStyle={{ width: screen.width, height: "calc(100vh - 55px)", position: "fixed"}}>
                    <PathVisual key={JSON.stringify(request)} width={5000} height={3400} currentFloor={currentFloor}
                                showPath={showPath} floormap={floorMap as Record<string, Node[][]>}
                                pathNodes={pathNodes}
                                images={floorImages as Record<string, string>}
                                onClickCircle={onClickCircle}
                                allNodes ={nodes}
                                showNodes = {showNodes}
                                onChangeFloor = {handleChangeFloor}/>
                </TransformComponent>

                <ToggleNodes onClick={() => setShowNodes(!showNodes) } isOn={showNodes}/>
                <PathSelector nodes={nodes.filter((node) =>  !node.longName.includes("Hall"))}
                              handleStartChange={handleStartChange}
                              handleEndChange={handleEndChange}
                              selectedStartOption={request.startNode !== "" ? nodeMap.get(request.startNode)?.longName : undefined}
                              selectedEndOption={request.endNode !== "" ? nodeMap.get(request.endNode)?.longName : undefined}
                              onClick={() => {
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
                }} />
                {<PathDirections Path = {pathNodes}/>}
                <FloorSelector
                    onClick1={() => handleChangeFloor("L2")}
                    onClick2={() => handleChangeFloor("L1")}
                    onClick3={() => handleChangeFloor("1")}
                    onClick4={() => handleChangeFloor("2")}
                    onClick5={() => handleChangeFloor("3")}
                    currentFloor={currentFloor}
                />
                <ZoomControls/>
            </TransformWrapper>
        </div>
    );
}

export default Map;
