import { SideTab } from "./SideTab.tsx";
import useNodes from "../../hooks/useNodes.ts";
import useEdges from "../../hooks/useEdges.ts";
import genInstructions from "../../directionTools.ts";
import forwardArrow from "@/assets/icons/Direction_Icons/Forward.svg";
import leftArrow from "@/assets/icons/Direction_Icons/LeftArrow.svg";
import rightArrow from "@/assets/icons/Direction_Icons/RightArrow.svg";
import elevator from "@/assets/icons/Direction_Icons/Elevator.svg";
import star from "../../assets/icons/Star.svg";
import React from "react";
import Node from "common/src/nodes-and-edges/node.ts";
import { motion } from "framer-motion";
import {Instruction} from "common/src/instruction.ts";

import {toWords} from "number-to-words";
import React from "react";

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
    const voices = speechSynthesis.getVoices();

    const selectedVoice = voices[18];
    const speech = new SpeechSynthesisUtterance();



    function speak(){
        speech.voice = selectedVoice;
        const content:Instruction[] = genInstructions(props.Path, nodeMap, edgeMap);
        let ReadIndex = 0;
        const text:string[] = [];
        for (let i = 0; i < content.length; i++) {
            const numbers = content[i].content.match(/(\d+)/ );

            if (numbers)
            for (let j = 0; j < numbers.length; j++) {
            console.log(numbers[j]);
                content[i].content = content[i].content.replace(numbers[j],` ${toWords(numbers[j])} `);
            }
            text.push(content[i].content);
        }
        speech.text = text[ReadIndex];
        if (text.length > 0)
        speechSynthesis.speak(speech);
        speech.onend = () => {speech.text = text[++ReadIndex];
            if (ReadIndex<text.length)
            speechSynthesis.speak(speech);};
    }

    return (
        <SideTab
            height={"h-[300px]"}
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
                <div className="w-full">

                    <div className="h-full w-full flex items-start justify-center pb-1">
                        <b className="ml-2 w-1/2 text-left" style={{fontWeight: "bold", color: "#012D5A", fontSize: "large"}}>DIRECTIONS</b>
                        <a onClick={speak}
                           className="mr-3 w-1/2 font-medium text-blue-600 dark:text-blue-500 hover:underline top-[1px] text-right ">Read
                            Aloud</a>

                    </div>

                    <div className="bg-gray-200 h-0.5 w-full"/>
                    <div className="h-[250px] overflow-y-scroll overflow-hidden w-[403px] divide-y ml-3">
                        {genInstructions(props.Path, nodeMap, edgeMap).map(instruction => (
                            <div className="flex flex-col text-sm/[17px] gap-36">
                                <div className="flex flex-row py-3">
                                    <div className="object-left w-1/4 px-5 centerContent">
                                        <div className="centerContent">
                                            {icon(instruction.type)}
                                        </div>
                                    </div>
                                    <h1 className="w-[calc(100%-13rem)] text-center break-normal"
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
