import React, {ReactNode, useState} from "react";
import { motion, AnimatePresence} from "framer-motion";
import pencilSVG from "../../assets/pencil.svg";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

type tab = {
    name: string;
    content: ReactNode;
};

export function EditingPanel(props: { children: ReactNode }) {
    const [contentVisibility, setContentVisibility] = useState(false);
    const pencil = <img src={pencilSVG} alt="pencil icon" className={"w-20 h-20 rotate-[225deg] invert scale-75"}/>;

    const editTab: tab = {
        name: "Edit",
        content: "Content for the edit tab.",
    };
    const addTab: tab = {
        name: "Add",
        content: "Content for the add tab.",
    };
    const submitTab: tab = {
        name: "Submit",
        content: "Content for the submit tab.",
    };

    const tabs: tab[] = [editTab, addTab, submitTab];
    // TODO how to employ a useState without knowing what children I will have
    const [selectedTab, setSelectedTab] = useState(tabs[0]);

    function cn(...args: ClassValue[]) {
        return twMerge(clsx(args));
    }

    function handleToggleVisibility() {
        setContentVisibility(prevState => !prevState);
    }

    // const variants = {
    //     closed: {opacity: "0%"},
    //     open: {opacity: "100%"},
    // };

    // TODO references
    // Tabs with Framer Motion: https://codesandbox.io/p/sandbox/framer-motion-layout-animations-snxgv?file=/src/App.tsx:36,13&from-embed=
    // Scale correction with Framer Motion: https://codesandbox.io/p/sandbox/framer-motion-2-scale-correction-z4tgr?file=/src/App.js:23,11&from-embed=

    function panel() {
        return (
            <div className="flex flex-col">
                <nav className={"flex h-8 rounded-b-none"}>
                    <ul className={"flex w-full list-none p-0 m-0"}>
                        {tabs.map((option: tab) => (
                            <li
                                key={option.name}
                                className={cn("flex w-full list-none h-6 p-2.5 m-0 font-OpenSans text-lg rounded-t relative justify-between items-center cursor-pointer", option === selectedTab ? "selected bg-gray-100" : "bg-bone-white")}
                                onClick={() => setSelectedTab(option)}
                            >
                                {`${option.name}`}
                                {option === selectedTab ? (
                                    <motion.div className="underline absolute inset-px h-px bg-deep-blue" layoutId="underline"/>
                                ) : null}
                            </li>
                        ))}
                    </ul>
                </nav>
                <main className={"flex font-OpenSans text-md"}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedTab ? selectedTab.name : "empty"}
                            initial={{y: 10, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            exit={{y: -10, opacity: 0}}
                            transition={{duration: 0.2}}
                        >
                            {selectedTab.content}
                            {props.children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
            // <motion.button className={""}
            //                onClick={handleToggleVisibility}
            //                variants={variants}
            //                initial="closed"
            //                animate="open"
            //                whileHover={{scale: 1.1}}
            //                whileTap={{scale: 0.9}}>
            //     <div className={"bg-white"}>
            //         {props.children}
            //     </div>
            // </motion.button>
        );
    }

    return (
        <div className={"absolute top-5 right-5 p-1 flex flex-row-reverse gap-10"}>
            <motion.button className={"closedPopout button bg-deep-blue rounded-full flex"}
                           onClick={handleToggleVisibility}
                           whileHover={{scale: 1.1}}
                           whileTap={{scale: 0.9}}>
                {/*TODO Ask Jeremy for a better SVG?*/}
                {pencil} {/*TODO consider animating into a close button*/}
            </motion.button>
            {/* Render pencil button when closed, on open fade pencil out and replace with close button */}
            {contentVisibility && panel()}
        </div>
    );
}
