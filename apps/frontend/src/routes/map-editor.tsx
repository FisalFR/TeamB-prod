import ll1map from "../assets/floors/00_thelowerlevel1.png";
import ll2map from "../assets/floors/00_thelowerlevel2.png";
import l1map from "../assets/floors/01_thefirstfloor.png";
import l2map from "../assets/floors/02_thesecondfloor.png";
import l3map from "../assets/floors/03_thethirdfloor.png";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";
import React, {useRef, useState} from "react";
// import axios from "axios";
// import {startEndNodes} from "common/src/pathfinding.ts";
import Node from "../../../../packages/common/src/node";
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

    let dragNode: Node;
    function startDrag(e: MouseEvent, node) {
        dragNode = node;
        setDragging(true);
    }
    function handleDrag(e: MouseEvent, node) {
        if (dragNode != null) {
            if (node.nodeID == dragNode.nodeID) {
                alert("here");
                setDragNodeCoords(getSVGCoords(e));
            }
        }

        //alert("here");
    }
    function endDrag() {
        setDragging(false);
    }

    const imgRef = useRef(null);

    function getSVGCoords(e: MouseEvent) {

        const offsetLeft = imgRef.current.getBoundingClientRect().left;
        const offsetTop = imgRef.current.getBoundingClientRect().top;

        const initialZoomX = 5000/imgRef.current.getBoundingClientRect().width;
        const initialZoomY = 3400/imgRef.current.getBoundingClientRect().height;

        const x = (e.clientX - offsetLeft) * initialZoomX;
        const y= (e.clientY - offsetTop) * initialZoomY;

        return ([x, y]);
    }

    const {nodes,nodeMap} = useNodes();
    const {edges} = useEdges();

    const [dragNodeCoords, setDragNodeCoords] = useState([0,0]);

    function setXCoords(node) {
        if (dragNode != null) {
            if (node.nodeID == dragNode.nodeID) {
                return dragNodeCoords[0];
            }
        }
        return node.xcoord;

    }

    return (
        <TransformWrapper disabled={dragging} disablePadding={true} limitToBounds={true}>
            <TransformComponent wrapperStyle={{ width: screen.width, height: "calc(100vh - 55px)"}} >
                <svg viewBox={"0 0 5000 3400"} width={"100vw"}
                                             onClick={getSVGCoords}>
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
                                            {nodes.filter(node => {
                                                return node.floor === currentFloor;
                                            }).map((node) => {
                                                return <circle cx={setXCoords(node)} cy={node.ycoord } key = {dragNodeCoords[0]}
                                                                      r={8 } fill="#F6BD38"
                                                               onMouseMove={(e) => handleDrag(e, node)}
                                                                      onMouseDown={(e) => startDrag(e, node)} onMouseUp={endDrag}/>;
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

)
    ;
}

export default MapEditor;
