import ll1map from "../assets/floors/00_thelowerlevel1.png";
import ll2map from "../assets/floors/00_thelowerlevel2.png";
import l1map from "../assets/floors/01_thefirstfloor.png";
import l2map from "../assets/floors/02_thesecondfloor.png";
import l3map from "../assets/floors/03_thethirdfloor.png";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";
import React, {useEffect, useRef, useState} from "react";
// import axios from "axios";
// import {startEndNodes} from "common/src/pathfinding.ts";
//import Node from "../../../../packages/common/src/node";
import ZoomButtons from "../components/map/ZoomButtons.tsx";
import FloorSelector from "../components/map/FloorSelector.tsx";
import useNodes from "../hooks/useNodes.ts";
import useEdges from "../hooks/useEdges.ts";
import {TransformComponent, TransformWrapper, useControls} from "react-zoom-pan-pinch";
//import {Simulate} from "react-dom/test-utils";
// import {node} from "prop-types";

export function MapEditor(){


    const [dragging, setDragging] = useState(false);


    const PlusSvg = <img src={plus} alt="Plus" className={"w-5"} />;
    const MinusSvg = <img src={minus} alt="Minus" className={"w-5"} />;

    function ZoomControls() {
        const { zoomIn, zoomOut } = useControls();
        return(
            <ZoomButtons onClick1={() => zoomIn()} plusSvg={PlusSvg}
                         onClick2={() => zoomOut()} minusSvg={MinusSvg}/>
        );
    }




    // const [zoom, setZoom] = useState(0.56);
    // const [showPath, setShowPath] = useState(false);

    // const [request, setRequest] = useState<startEndNodes>({startNode: "", endNode: ""});
    interface FloorImages {
        [key: string]: string;
    }
    const floorImages: FloorImages = {
        "L1": ll1map,
        "L2": ll2map,
        "1": l1map,
        "2": l2map,
        "3": l3map
    };

    // const divRef = useRef<HTMLDivElement>(null);

    const [currentFloor, setCurrentFloor] = useState("2");
    // function zoomIn() {
    //     setZoom(prevZoom => Math.min(prevZoom * 1.2, 1.0)); // Increase zoom level, max 1.0
    // }
    //
    // function zoomOut() {
    //     setZoom(prevZoom => Math.max(prevZoom * 0.8, 0.56)); // Decrease zoom level, min 0.4
    // }

    const [dragCount, setDragCount] = useState(0);

    const dragNodeID: React.MutableRefObject<string> = useRef("");
    const dragNodeCoordsX = useRef<number>(0);
    const dragNodeCoordsY = useRef<number>(0);
    function startDrag(e: MouseEvent, node: string) {
        const coords = getSVGCoords(e);
        dragNodeCoordsX.current = coords[0];
        dragNodeCoordsY.current = coords[1];
        dragNodeID.current = node;
        setDragging(true);
    }
    function handleDrag(e: MouseEvent, nodeID: string) {
        e.preventDefault();
            if (nodeID == dragNodeID.current) {
                const coords = getSVGCoords(e);
                dragNodeCoordsX.current = coords[0];
                dragNodeCoordsY.current = coords[1];
                updateNodes(dragNodeID.current, dragNodeCoordsX.current, dragNodeCoordsY.current);
                setEditNodes(nodes);
                setDragCount(dragCount+1);

        }
    }
    function endDrag() {
        dragNodeID.current = "";
        setDragging(false);


    }

    function updateNodes(node: string, xcoord: number, ycoord: number) {
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].nodeID == node) {
                nodes[i].xcoord = xcoord;
                nodes[i].ycoord = ycoord;
            }
        }
    }

    const imgRef = useRef(null);

    function getSVGCoords(e: MouseEvent) {

        const offsetLeft = imgRef.current.getBoundingClientRect().left;
        const offsetTop = imgRef.current.getBoundingClientRect().top;

        const initialZoomX = 5000/imgRef.current.getBoundingClientRect().width;
        const initialZoomY = 3400/imgRef.current.getBoundingClientRect().height;

        const x = (e.clientX - offsetLeft) * initialZoomX;
        const y= (e.clientY - offsetTop) * initialZoomY;
        console.log([Math.round(x), Math.round(y)]);
        return ([Math.round(x), Math.round(y)]);
    }

    const {nodes,nodeMap} = useNodes();
    const {edges} = useEdges();

    const [editNodes, setEditNodes] = useState(useNodes().nodes);
    useEffect(() => setEditNodes(nodes), [nodes]);

    //const [dragNodeCoords, setDragNodeCoords] = useState([0,0]);
    //const [editNodes, setEditNodes] = useState(nodes);

    function setXCoords(node) {
        if (node.nodeID == dragNodeID.current) {
            return dragNodeCoordsX.current;
        }
        return node.xcoord;
    }
    function setYCoords(node) {
        if (node.nodeID == dragNodeID.current){
            return dragNodeCoordsY.current;
        }
        return node.ycoord;
    }

    return (
        <div className = "fixed">
        <TransformWrapper disabled={dragging} disablePadding={true} limitToBounds={true}>
            <TransformComponent wrapperStyle={{ width: screen.width, height: "calc(100vh - 55px)"}} >
                <svg viewBox={"0 0 5000 3400"} width={"100vw"} onMouseMove={(e) => handleDrag(e, dragNodeID.current)}>
                                            <image xlinkHref={floorImages[currentFloor]} width={5000} height={3400}
                                                   key={JSON.stringify(floorImages[currentFloor])}
                                                   ref = {imgRef}></image>

                                            {edges.map((edge) => {
                                                const startNode = nodeMap.get(edge.startNodeID);
                                                const endNode = nodeMap.get(edge.endNodeID);
                                                const sameFloor = startNode?.floor === endNode?.floor;
                                                if (startNode !== undefined && endNode !== undefined) {
                                                    if (startNode.floor === currentFloor && sameFloor) {
                                                        return <line x1={startNode.xcoord }
                                                                     y1={startNode.ycoord}
                                                                     x2={endNode.xcoord }
                                                                     y2={endNode.ycoord }
                                                                     stroke={"#012D5A"}
                                                                     strokeWidth={5}
                                                        ></line>;
                                                    }
                                                }

                                            })}
                                            {editNodes.filter(node => {
                                                return node.floor === currentFloor;
                                            }).map((node) => {
                                                return <>
                                                    <circle cx={setXCoords(node)} cy={setYCoords(node)} r={8}
                                                            fill="#F6BD38"
                                                            onMouseMove={(e) => handleDrag(e, node.nodeID)}
                                                            onMouseDown={(e) => startDrag(e, node.nodeID)}
                                                            onMouseUp={(e) => endDrag(e, node.nodeID)}/>

                                                </>;
                                            })}
                </svg>
            </TransformComponent>
            <FloorSelector
                onClick1={() => setCurrentFloor("L2")}
                onClick2={() => setCurrentFloor("L1")}
                onClick3={() => setCurrentFloor("1")}
                onClick4={() => setCurrentFloor("2")}
                            onClick5={() => setCurrentFloor("3")}
                            currentFloor={currentFloor}
                        />
                        <ZoomControls></ZoomControls>
                    </TransformWrapper>
        </div>

)
    ;
}

export default MapEditor;
