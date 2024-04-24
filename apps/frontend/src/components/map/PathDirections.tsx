import { SideTab } from "./SideTab.tsx";
import useNodes from "../../hooks/useNodes.ts";
import useEdges from "../../hooks/useEdges.ts";
import genInstructions from "../../directionTools.ts";
import forwardArrow from "../../assets/Direction_Icons/Forward.svg";
import leftArrow from "../../assets/Direction_Icons/LeftArrow.svg";
import rightArrow from "../../assets/Direction_Icons/RightArrow.svg";
import elevator from "../../assets/Direction_Icons/Elevator.svg";
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

const animatePath = {
    animateLine: {
        strokeDashoffset: [-420, 0, 0, 420, 420],
        strokeOpacity: [1, 1, 1, 1, 0],
        transition: {
            duration: 3,
            times: [0, 1, 2, 2.9, 3],
            repeat: Infinity,
            repeatDelay: 15,
            ease: "easeInOut"
        }
    },
    animateArrowHead: {
        opacity: [0, 0, 1, 1, 0],
        transition: {
            duration: 3,
            times: [0, 0.9, 1, 2.9, 3],
            repeat: Infinity,
            repeatDelay: 15,
            ease: "easeInOut"
        }
    }
};

export default function PathDirections(props: { Path: Node[] }) {
    const { nodeMap } = useNodes();
    const { edgeMap } = useEdges();
    return (
        <SideTab
            height={"h-[250px]"}
            yPos={"top-56"}
            arrow={false}
            tabChildren={
                <div className="h-full flex flex-col align-items-center justify-center p-2">
                    <svg width="32" height="218" viewBox="0 0 32 218" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="0,13 16,0 16,26" fill="white"/>
                        <polyline points="5,33 5,213 27,213 27,13 14,13" stroke="white" strokeWidth="10"
                                  strokeLinejoin="round" strokeLinecap="round"/>
                        <motion.polygon points="4,13 14,5 14,21" fill="#012D5A" animate={animatePath.animateArrowHead}/>
                        <motion.path d={"M14,13 L27,13 L27,213 L5,213 L5,33"} stroke="#012D5A" strokeWidth="4" strokeDasharray="420,420" fill="none"
                                  strokeLinejoin="round" strokeLinecap="round" animate={animatePath.animateLine}/>
                    </svg>
                </div>
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
