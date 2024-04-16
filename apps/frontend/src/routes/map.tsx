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
import {startEndNodes} from "common/src/pathfinding.ts";
import Node from "../../../../packages/common/src/node";
import ZoomButtons from "../components/map/ZoomButtons.tsx";
import FloorSelector from "../components/map/FloorSelector.tsx";
import {PathSelector} from "../components/map/PathSelector.tsx";
import {TransformComponent, TransformWrapper, useControls} from "react-zoom-pan-pinch";
import useNodes from "../hooks/useNodes.ts";



export function Map(){
    // interface NodeData {
    //     [key: string]: {
    //         id: string;
    //         coords: number[];
    //     };
    // }

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


    // const [mapPoints, setMapPoints] = useState(["Error accessing map points"]);
    // const [nodeData, setNodeData] = useState<NodeData>({});
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

    // useEffect( () => {
    //     axios.get("/api/pathfinding/halls").then((response) => {
    //         // const nodeStrings = [];
    //         // const tempNodeData: NodeData = {};
    //         // for (let i = 0; i < response.data.length; i++) {
    //             // nodeStrings.push(response.data[i].longName);
    //             // tempNodeData[response.data[i].longName as keyof NodeData] = {id: response.data[i].nodeID, coords: [response.data[i].xcoord, response.data[i].ycoord]};
    //         // }
    //         // setMapPoints(nodeStrings);
    //         // setNodeData(tempNodeData);
    //
    //         setPathNodes([response.data[0], response.data[response.data.length-1]]);
    //         // setShowPath(false);
    //     });
    // }, []);

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
        if(ref.current%2 == 0){
            setRequest({...request, startNode: Node.nodeID});
            ref.current++;
        }
        else{
            setRequest({...request, endNode: Node.nodeID});
            ref.current++;
        }
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
                                pathNodes={pathNodes}
                                images={floorImages as Record<string, string>}
                                onClickCircle={onClickCircle}
                                allNodes ={nodes}/>
                </TransformComponent>
                <PathSelector nodes={nodes}
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
