import React from 'react';
import {AlgorithmButtons} from "./AlgorithmButtons.tsx";
import Select from "../input-components/Select.tsx";
import fromIconInverse from "@/assets/icons/from_to_icons/circle_from_inverse.svg";
import dotsInverse from "@/assets/icons/from_to_icons/circles_from_to_inverse.svg";
import destinationInverse from "@/assets/icons/from_to_icons/icon_to_inverse.svg";
import star from "../../assets/icons/Star.svg";
import Node from "common/src/nodes-and-edges/node";
import {motion} from 'framer-motion';
import {SideTab} from "./SideTab.tsx";

export default function PathSelector(props: {
    nodes: Node[],
    handleStartChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    handleEndChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    onClick: () => void,
    selectedAlgo: string | null,
    onClick1: () => void,
    onClick2: () => void,
    onClick3: () => void,
    selectedStartOption?: string,
    selectedEndOption?: string
}) {

    const ImgAnimation = {
        animateFrom: {
            scale: [1, 1.5, 1.5, 1.5, 1]
        },
        animateDot: {
            scale: [1, 2, 2, 2, 1]
        },
        animateDest: {
            scale: [1, 1.5, 1.5, 1.5, 1],
            rotate: [0, 15, -15, 15, 0]
        },
        transitionFromDest: (delay: number) => ({
            duration: 1,
            ease: "circInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
            repeat: Infinity,
            repeatDelay: 15,
            delay: delay
        }),
        transitionDot: (delay: number) => ({
            duration: 0.8,
            ease: "circInOut",
            times: [0, 0.2, 0.4, 0.6, 0.8],
            repeat: Infinity,
            repeatDelay: 15.2,
            delay: delay,
        })
    };

    return (
            <SideTab height={"h-[172px]"} yPos={"top-8"} arrow={true}
                tabChildren={
                    <div className={"h-full flex flex-col items-center justify-around pt-3 pb-2"}>
                        <motion.img animate={ImgAnimation.animateFrom} transition={ImgAnimation.transitionFromDest(0)}
                                    src={fromIconInverse} alt="fromIconInverse"/>
                        <motion.img animate={ImgAnimation.animateDot} transition={ImgAnimation.transitionDot(0.8)}
                                    src={dotsInverse} alt="dotsInverse1"/>
                        <motion.img animate={ImgAnimation.animateDot} transition={ImgAnimation.transitionDot(1.4)}
                                    src={dotsInverse} alt="dotsInverse2"/>
                        <motion.img animate={ImgAnimation.animateDot} transition={ImgAnimation.transitionDot(2)}
                                    src={dotsInverse} alt="dotsInverse3"/>
                        <motion.img animate={ImgAnimation.animateDest} transition={ImgAnimation.transitionFromDest(2.6)}
                                    src={destinationInverse} alt="destinationInverse"/>
                    </div>
                }
                bodyChildren={
                    <div className={"grid grid-cols-1 grid-rows-3 justify-items-center items-center"}>
                        <Select label="" id="nodeStartSelect" options={props.nodes.map((node) => {
                            return node.nodeID;
                        })}
                                display={props.nodes.map((node) => {
                                    return node.longName;
                                })}
                                onChange={props.handleStartChange as (e: React.ChangeEvent<HTMLSelectElement>) => void}
                                defaultOption={props.selectedStartOption !== undefined ? props.selectedStartOption : "Select your start location"}/>
                        <div
                            className="flex flex-row justify-center rounded-br-xl rounded-bl-0 font-OpenSans items-center font-bold text-bone-white">
                            <div className="divide-x divide-solid py-2.5 flex flex-row divide-deep-blue">
                                <AlgorithmButtons px="px-8" onClick={props.onClick}
                                                  isActive={props.selectedAlgo === "Astar"}>
                                    A <img src={star} alt="A Star Icon" height="15" width="15"/>
                                </AlgorithmButtons>
                                <AlgorithmButtons px="px-8" onClick={props.onClick1}
                                                  isActive={props.selectedAlgo === "BFS"}> BFS </AlgorithmButtons>
                                <AlgorithmButtons px="px-8" onClick={props.onClick2}
                                                  isActive={props.selectedAlgo === "DFS"}> DFS </AlgorithmButtons>
                                <AlgorithmButtons px="px-8" onClick={props.onClick3}
                                                  isActive={props.selectedAlgo === "Dijkstra"}> DIJKSTRA </AlgorithmButtons>
                            </div>
                        </div>
                        <Select label="" id="nodeEndSelect" options={props.nodes.map((node) => {
                            return node.nodeID;
                        })}
                                display={props.nodes.map((node) => {
                                    return node.longName;
                                })}
                                onChange={props.handleEndChange as (e: React.ChangeEvent<HTMLSelectElement>) => void}
                                defaultOption={props.selectedEndOption !== undefined ? props.selectedEndOption : "Select your end location"}/>
                    </div>
                }>
            </SideTab>
    );
}
