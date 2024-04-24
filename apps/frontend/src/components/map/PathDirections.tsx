import { SideTab } from "./SideTab.tsx";
import useNodes from "../../hooks/useNodes.ts";
import useEdges from "../../hooks/useEdges.ts";
import genInstructions from "../../directionTools.ts";
import forwardArrow from "../../assets/Direction_Icons/Forward.svg";
import leftArrow from "../../assets/Direction_Icons/LeftArrow.svg";
import rightArrow from "../../assets/Direction_Icons/RightArrow.svg";
import elevator from "../../assets/Direction_Icons/Elevator.svg";
import pathDirectionTabImage from "../../assets/Direction_Icons/PathDirectionTabImage.svg";
import star from "../../assets/Star.svg";
import React from "react";
import Node from "common/src/node.ts";
import { motion } from "framer-motion";

function icon(image: string) {
    switch (image) {
        case "Forward":
            return (<img src={forwardArrow} alt="FWD"/>);
        case "Left":
            return (<img src={leftArrow} alt="LFT"/>);
        case "Right":
            return (<img src={rightArrow} alt="RGT"/>);
        case "Star":
            return (<img src={star} alt="STR"/>); // Corrected alt text
        case "Elevator":
        case "Stairs":
            return (<img src={elevator} alt="ELV"/>);
        default:
            return null; // Handle default case
    }
}

export default function PathDirections(props: { Path: Node[] }) {
    const { nodeMap } = useNodes();
    const { edgeMap } = useEdges();
    return (
        <SideTab
            height={"h-[250px]"}
            yPos={"top-56"}
            arrow={false}
            tabChildren={
                <motion.div className="h-full flex flex-col align-items-center justify-center p-3">
                    <motion.img src={pathDirectionTabImage}/>
                </motion.div>
            }
            bodyChildren={
                <div>
                    <div style={{fontWeight: "bold", color: "#012D5A"}}>DIRECTIONS</div>
                    <div className="bg-deep-blue h-0.5"/>
                    <div className="h-[200px] overflow-y-scroll overflow-hidden w-[416px] divide-y">
                        {genInstructions(props.Path, nodeMap, edgeMap).map(instruction => (
                            <div className="flex flex-col text-sm/[17px] gap-36">
                                <div className="flex flex-row py-3">
                                    <div className="object-left w-1/4 px-5 centerContent">
                                        <div className="centerContent">
                                            {icon(instruction.type)}
                                        </div>
                                    </div>
                                    <h1 className="w-2/3 align-middle"
                                        style={{color: "#012D5A", fontSize: 17, textAlign: "left"}}>
                                        {instruction.content}
                                    </h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        />
    );
}
