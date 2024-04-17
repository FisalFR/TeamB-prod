import React, { useState } from 'react';
import fromIcon from "../../assets/from_to_icons/circle_from.svg";
import Select from "../Select.tsx";
import dots from "../../assets/from_to_icons/circles_from_to.svg";
import destination from "../../assets/from_to_icons/icon_to.svg";
import { AlgorithmButtons } from "./AlgorithmButtons.tsx";
import star from "../../assets/Star.svg";
import Node from "../../../../../packages/common/src/node";
import { motion, AnimatePresence } from 'framer-motion';

export function PathSelector(props: {
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
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const variants = {
        hidden: {
            opacity: 0,
            height: 0,
        },
        visible: {
            opacity: 1,
            height: "auto",
            transition: {
                height: { duration: 0.2, when: "beforeChildren" },
                opacity: { duration: 0.2, delay: 0.2, when: "afterChildren" }
            }
        },
        exit: {
            opacity: 0,
            height: 0,
            transition: {
                opacity: { duration: 0.2, when: "beforeChildren" },
                height: { duration: 0.2, delay: 0.2, when: "afterChildren" }
            }
        }
    };

    return (
        <div className="absolute top-5 left-5 flex flex-col bg-white h-fit rounded-xl items-end w-100">
            <button
                onClick={toggleVisibility}
                className={"w-full px-20 bg-deep-blue rounded-t-lg font-OpenSans items-center font-bold text-bone-white py-2" + (isVisible ? '' : ' rounded-b-lg')}
            >
                {isVisible ? 'Hide Pathfinder' : 'Show Pathfinder'}
            </button>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={variants}
                        className="w-full"
                        >

                            <div
                                className="grid grid-cols-[auto_1fr] grid-rows-3 h-fit justify-items-center items-center pt-2 pr-2 pl-2">
                                <img src={fromIcon} alt="from" className="px-1"/>
                                <Select label="" id="nodeStartSelect" options={props.nodes.map((node) => {
                                    return node.nodeID;
                                })}
                                        display={props.nodes.map((node) => {
                                            return node.longName;
                                        })}
                                        onChange={props.handleStartChange as (e: React.ChangeEvent<HTMLSelectElement>) => void}
                                        defaultOption={props.selectedStartOption !== undefined ? props.selectedStartOption : "Select your start location"}/>
                                <img src={dots} alt="dots" className="h-7 pb-1 px-1"/>
                                <div></div>
                                <img src={destination} alt="destination" className="px-1"/>
                                <Select label="" id="nodeEndSelect" options={props.nodes.map((node) => {
                                    return node.nodeID;
                                })}
                                        display={props.nodes.map((node) => {
                                            return node.longName;
                                        })}
                                        onChange={props.handleEndChange as (e: React.ChangeEvent<HTMLSelectElement>) => void}
                                        defaultOption={props.selectedEndOption !== undefined ? props.selectedEndOption : "Select your end location"}/>
                            </div>
                            <div
                                className="w-full flex flex-row justify-center mt-2 w-full bg-deep-blue rounded-br-xl rounded-bl-xl font-OpenSans items-center font-bold text-bone-white">
                                <div className="divide-x divide-solid py-2 flex flex-row">
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

                    </motion.div>)}
            </AnimatePresence>
        </div>
    );
};
