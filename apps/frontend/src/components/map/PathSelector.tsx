import React, {useState} from 'react';
import {AlgorithmButtons} from "./AlgorithmButtons.tsx";
import Select from "../Select.tsx";
import fromIconInverse from "../../assets/from_to_icons/circle_from_inverse.svg";
import dotsInverse from "../../assets/from_to_icons/circles_from_to_inverse.svg";
import destinationInverse from "../../assets/from_to_icons/icon_to_inverse.svg";
import star from "../../assets/Star.svg";
import Node from "../../../../../packages/common/src/node";
import arrow from "../../assets/from_to_icons/arrow.svg";
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
    const [showArrow, setShowArrow] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
        setShowArrow(false);
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
                width: {duration: 0.2, when: "beforeChildren"},
                opacity: {duration: 0.1, delay: 0.3, when: "afterChildren"}
            }
        },
        exit: {
            opacity: 0,
            width: 0,
            transition: {
                opacity: {duration: 0.1, when: "beforeChildren"},
                width: {duration: 0.2, when: "afterChildren"}
            }
        }
    };

    const animateBG = {
        hidden: {
            width: 0,
        },
        visible: {
            width: "auto",
            transition: {
                width: {duration: 0.2, when: "beforeChildren",
                    type: "spring", damping: 18, mass: 1, stiffness: 100},
            }
        },
        exit: {
            width: 0,
            transition: {
                width: {duration: 0.2, when: "afterChildren",
                    type: "spring", damping: 18, mass: 1, stiffness: 100}
            }
        }
    };

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
        animateArrow: {
            x: [0, 12, 0]
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
        }),
        transitionArrow: {
            duration: 1,
            ease: "circInOut",
            times: [0, 0.5, 1],
            repeat: Infinity
        }
    };

    return (
        <div className="absolute top-7 flex flex-row-reverse items-center rounded-r-xl h-[172px]">
            <div className={"h-full pl-4 items-center flex flex-col justify-around"} >
                <motion.img animate={showArrow ? ImgAnimation.animateArrow : {opacity: 0}} transition={showArrow ? ImgAnimation.transitionArrow : {duration: 0.6}} src={arrow} alt="arrow"/>
            </div>
            <motion.button
                onClick={toggleVisibility}
                animate={isVisible ? {borderColor: "rgb(246 189 56)"} : {borderColor: "#012D5A"}}
                transition={{duration: 0.6}}
                className={"h-full px-3 pt-3 pb-2 bg-deep-blue items-center rounded-r-xl flex flex-col justify-around border-4 border-deep-blue"}>
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
            </motion.button>
            <AnimatePresence>
                {isVisible && (<motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={animateBG}
                    className="w-full bg-white">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={variants}
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
                    </motion.div>
                </motion.div>)}
            </AnimatePresence>
        </div>
    );
}
