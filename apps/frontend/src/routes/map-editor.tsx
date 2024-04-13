import ll1map from "../assets/floors/00_thelowerlevel1.png";
import ll2map from "../assets/floors/00_thelowerlevel2.png";
import l1map from "../assets/floors/01_thefirstfloor.png";
import l2map from "../assets/floors/02_thesecondfloor.png";
import l3map from "../assets/floors/03_thethirdfloor.png";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";
import React, { useState} from "react";
import ZoomButtons from "../components/map/ZoomButtons.tsx";
import FloorSelector from "../components/map/FloorSelector.tsx";
import useNodes from "../hooks/useNodes.ts";
import useEdges from "../hooks/useEdges.ts";
import {TransformComponent, TransformWrapper, useControls} from "react-zoom-pan-pinch";


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


    const [currentFloor, setCurrentFloor] = useState("2");

    const {nodes,nodeMap} = useNodes();
    const {edges} = useEdges();
    return (
        <div className="w-screen h-screen relative overflow-hidden"> {/* Add relative positioning here */}
            <TransformWrapper
                defaultScale={2} // Set initial zoom level
                defaultPositionX={200}
                defaultPositionY={200}>
                <TransformComponent>
                        <svg className="w-screen h-fit " viewBox={"0 0 5000 3400"}>
                            <image xlinkHref={floorImages[currentFloor]} width={"100%"} height={"100%"}
                                   key={JSON.stringify(floorImages[currentFloor])} preserveAspectRatio="none"></image>

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
                                return <circle cx={node.xcoord } cy={node.ycoord } r={8 }
                                               fill="#F6BD38"/>;
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
                <ZoomControls/>
            </TransformWrapper>
        </div>
    );
}

export default MapEditor;
