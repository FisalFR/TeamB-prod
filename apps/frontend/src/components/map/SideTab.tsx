import React, {ReactNode, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import arrow from "../../assets/from_to_icons/arrow.svg";

export function SideTab(props: {height: string, yPos: string, arrow: boolean, tabChildren: ReactNode, bodyChildren: ReactNode}) {
    const [isVisible, setIsVisible] = useState(false);
    const [showArrow, setShowArrow] = useState(props.arrow);

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
                opacity: {duration: 0.2, delay: 0.4, when: "afterChildren"}
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
                width: {
                    duration: 0.2, when: "beforeChildren",
                    type: "spring", damping: 18, mass: 1, stiffness: 100
                },
            }
        },
        exit: {
            width: 0,
            transition: {
                width: {
                    duration: 0.2, when: "afterChildren",
                    type: "spring", damping: 18, mass: 1, stiffness: 100
                }
            }
        }
    };

    const arrowAnimation = {
        animate: {
            x: [0, 12, 0]
        },
        transition: {
            duration: 1,
            ease: "circInOut",
            times: [0, 0.5, 1],
            repeat: Infinity
        }
    };

    return (
        <div className={"absolute flex flex-row-reverse items-center rounded-r-xl " + props.height + " " + props.yPos}>
            {props.arrow && <div className={"h-full pl-4 items-center flex flex-col justify-around"}>
                <motion.img animate={showArrow ? arrowAnimation.animate : {opacity: 0}}
                            transition={showArrow ? arrowAnimation.transition : {duration: 0.6}} src={arrow}
                            alt="arrow"/>
            </div>}
            <motion.button
                onClick={toggleVisibility}
                animate={isVisible ? {borderColor: "#F6BD38"} : {borderColor: "#012D5A"}}
                transition={{duration: 0.6}}
                className={"h-full w-14 bg-deep-blue rounded-r-xl border-4 border-deep-blue"}>
                {props.tabChildren}
            </motion.button>
            <AnimatePresence>
                {isVisible && (<motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={animateBG}
                    className="w-full h-full bg-white flex items-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={variants}
                        className={"p-2"}>
                        {props.bodyChildren}
                    </motion.div>
                </motion.div>)}
            </AnimatePresence>
        </div>
    );
}
