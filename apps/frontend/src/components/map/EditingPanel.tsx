import React, {ReactNode, useState} from "react";
import { motion, AnimatePresence} from "framer-motion";
import pencilSVG from "../../assets/pencil.svg";

export function EditingPanel(props: { children: ReactNode }) {
    const [contentVisibility, setContentVisibility] = useState(false);
    const pencil = <img src={pencilSVG} alt="pencil icon" className={"w-20 h-20 rotate-[225deg] invert scale-75"}/>;
    const tabs: string[] = ["Edit", "Add", "Submit"]; // TODO consider if we want to list changes in a separate tab
        const editContent: string = "Content for the edit tab.";
        const addContent: string = "Content for the add tab.";
        const submitContent: string = "Content for the submit tab.";
    const [selectedTab, setSelectedTab] = useState(tabs[0]);

    // const variants = {
    //     closed: {opacity: "0%"},
    //     open: {opacity: "100%"},
    // };

    // TODO references
    // Tabs with Framer Motion: https://codesandbox.io/p/sandbox/framer-motion-layout-animations-snxgv?file=/src/App.tsx:36,13&from-embed=
    // Scale correction with Framer Motion: https://codesandbox.io/p/sandbox/framer-motion-2-scale-correction-z4tgr?file=/src/App.js:23,11&from-embed=

    function panel() {
        return (
            <div className="window">
                <nav>
                    <ul>
                        {tabs.map((item) => (
                            <li
                                key={item}
                                className={item === selectedTab ? "selected" : ""}
                                onClick={() => setSelectedTab(item)}
                            >
                                {`${item}`}
                                {item === selectedTab ? (
                                    <motion.div className="underline" layoutId="underline"/>
                                ) : null}
                            </li>
                        ))}
                    </ul>
                </nav>
                <main>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedTab ? selectedTab : "empty"}
                            initial={{y: 10, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            exit={{y: -10, opacity: 0}}
                            transition={{duration: 0.2}}
                        >
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
    };

    function handleToggleVisibility() {
        setContentVisibility(prevState => !prevState);
    };

    return (
        <div className={"absolute top-5 right-5 p-1"}>
            <motion.button className={"closedPopout button bg-deep-blue rounded-full"}
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
};
