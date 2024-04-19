import React, { useState } from 'react';
import fromIconInverse from "../../assets/from_to_icons/circle_from_inverse.svg";
import Select from "../Select.tsx";
import dotsInverse from "../../assets/from_to_icons/circles_from_to_inverse.svg";
import destinationInverse from "../../assets/from_to_icons/icon_to_inverse.svg";
import { AlgorithmButtons } from "./AlgorithmButtons.tsx";
import star from "../../assets/Star.svg";
import Node from "../../../../../packages/common/src/node";
import {motion, AnimatePresence} from 'framer-motion';

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
            width: 0,
        },
        visible: {
            opacity: 1,
            width: "auto",
            transition: {
                width: { duration: 0.2, when: "beforeChildren" },
                opacity: { duration: 0.2, delay: 0.2, when: "afterChildren" }
            }
        },
        exit: {
            opacity: 0,
            width: 0,
            transition: {
                opacity: { duration: 0.2, when: "beforeChildren" },
                width: { duration: 0.2, delay: 0.2, when: "afterChildren" }
            }
        }
    };

    const ImgAnimation = {
        animateImg: (scale: number, rotate: number) => ({
            scale: [1, scale, scale, scale, 1],
            rotate: [0, rotate, -rotate, rotate, 0]
        }),
        transitionImg: (delay: number) => ({
            duration: 1,
            ease: "circInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
            repeat: Infinity,
            repeatDelay: 10,
            delay: delay,
        }),
    };

    return (
        <div className="absolute top-7 flex flex-row-reverse items-center bg-white w-fit rounded-r-xl h-[160px]">
            <button
                onClick={toggleVisibility}
                className={"h-full px-3 bg-deep-blue font-OpenSans items-center font-bold text-bone-white rounded-r-xl flex flex-col justify-around"}
            >
                <motion.img animate={ImgAnimation.animateImg(1.5, 0)} transition={ImgAnimation.transitionImg(0)} src={fromIconInverse} alt="fromIconInverse" className="mt-3.5"/>
                <motion.img animate={ImgAnimation.animateImg(2, 0)} transition={ImgAnimation.transitionImg(1)} src={dotsInverse} alt="dotsInverse1"/>
                <motion.img animate={ImgAnimation.animateImg(2, 0)} transition={ImgAnimation.transitionImg(2)} src={dotsInverse} alt="dotsInverse2"/>
                <motion.img animate={ImgAnimation.animateImg(2, 0)} transition={ImgAnimation.transitionImg(3)} src={dotsInverse} alt="dotsInverse3"/>
                <motion.img animate={ImgAnimation.animateImg(1.5, 15)} transition={ImgAnimation.transitionImg(4)} src={destinationInverse} alt="destinationInverse" className="mb-2.5"/>
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
                            className="grid grid-cols-1 grid-rows-3 h-fit justify-items-center items-center p-2">
                            <Select label="" id="nodeStartSelect" options={props.nodes.map((node) => {
                                return node.nodeID;
                            })}
                                    display={props.nodes.map((node) => {
                                            return node.longName;
                                        })}
                                        onChange={props.handleStartChange as (e: React.ChangeEvent<HTMLSelectElement>) => void}
                                        defaultOption={props.selectedStartOption !== undefined ? props.selectedStartOption : "Select your start location"}/>
                                <div
                                    className="w-full flex flex-row justify-center rounded-br-xl rounded-bl-0 font-OpenSans items-center font-bold text-bone-white">
                                    <div className="divide-x divide-solid py-2 flex flex-row divide-deep-blue">
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

                    </motion.div>)}
            </AnimatePresence>
        </div>
    );
}
