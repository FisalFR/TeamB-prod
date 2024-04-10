import ll1map from "../assets/floors/00_thelowerlevel1.png";
import ll2map from "../assets/floors/00_thelowerlevel2.png";
import l1map from "../assets/floors/01_thefirstfloor.png";
import l2map from "../assets/floors/02_thesecondfloor.png";
import l3map from "../assets/floors/03_thethirdfloor.png";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";
import React, { useState} from "react";
// import axios from "axios";
// import {startEndNodes} from "common/src/pathfinding.ts";
// import Node from "../../../../packages/common/src/node";
import ZoomButtons from "../components/map/ZoomButtons.tsx";
import FloorSelector from "../components/map/FloorSelector.tsx";
import useNodes from "../hooks/useNodes.ts";
import useEdges from "../hooks/useEdges.ts";
import {TransformComponent, TransformWrapper, useControls} from "react-zoom-pan-pinch";
// import {node} from "prop-types";

export function MapEditor(){





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


    const {nodes,nodeMap} = useNodes();
    const {edges} = useEdges();
    return (
                <div className="w-screen h-screen self-center"> {/* Add relative positioning here */}
                    <TransformWrapper
                    >
                                <TransformComponent>
                                    <div className={"w-screen h-screen"}>
                                        <svg className={"w-screen h-screen"} viewBox={"0 0 5000 3400"}>
                                            <image xlinkHref={floorImages[currentFloor]} width={5000} height={3400}
                                                   key={JSON.stringify(floorImages[currentFloor])}></image>

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
                                                                     strokeWidth={2}
                                                        ></line>;
                                                    }
                                                }

                                            })}
                                            {nodes.filter(node => {
                                                return node.floor === currentFloor;
                                            }).map((node) => {
                                                return <circle cx={node.xcoord } cy={node.ycoord } r={8 }
                                                               fill="#F6BD38"/>;
                                            })}
                                        </svg>
                                    </div>
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
