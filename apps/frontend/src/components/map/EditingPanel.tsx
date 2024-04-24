import React, {ReactElement, ReactNode, useState} from "react";
import { motion, AnimatePresence} from "framer-motion";
import pencilSVG from "../../assets/pencil.svg";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

type TabProps = {
    name: string
    children: ReactNode
};

export const TabContent:React.FunctionComponent<TabProps> = (props:TabProps) => {
    return (
        <div className={"bg-white px-2"}>
            {props.children}
        </div>
    );
};

export function EditingPanel(props: { children: Array<ReactElement<TabProps>> | ReactElement<TabProps>}) {
    const [contentVisibility, setContentVisibility] = useState(false);
    const pencil = <img src={pencilSVG} alt="pencil icon" className={"w-20 h-20 rotate-[225deg] invert scale-75"}/>;

    const [selectedTabName, setSelectedTabName] = useState<string>("");

    function cn(...args: ClassValue[]) {
        return twMerge(clsx(args));
    }

    function handleToggleVisibility() {
        setContentVisibility(prevState => !prevState);
    }

    // TODO references
    // Tabs with Framer Motion: https://codesandbox.io/p/sandbox/framer-motion-layout-animations-snxgv?file=/src/App.tsx:36,13&from-embed=
    // Scale correction with Framer Motion: https://codesandbox.io/p/sandbox/framer-motion-2-scale-correction-z4tgr?file=/src/App.js:23,11&from-embed=

    function panel() {
        return (
            <div className="flex flex-col">
                <nav className={"flex h-8 rounded-b-none"}>
                    <ul className={"flex w-full list-none p-0 m-0"}>
                        {/* conditionally render multiple tabs if they exist, or a single tab if that is the only one*/}
                        {Array.isArray(props.children) ? (
                            props.children.map((child: React.ReactElement<TabProps>) => (
                                <li
                                    key={child.props.name}
                                    className={cn("flex w-full list-none h-6 p-2.5 m-0 font-OpenSans text-lg rounded-t relative justify-between items-center cursor-pointer", child.props.name === selectedTabName ? "selected bg-gray-100" : "bg-bone-white")}
                                    onClick={() => setSelectedTabName(child.props.name)}
                                >
                                    {child.props.name}
                                    {child.props.name === selectedTabName ? (
                                        <motion.div className="underline absolute inset-px h-px bg-deep-blue" layoutId="underline"/>
                                    ) : null}
                                </li>
                            ))
                        ) : (
                            <li
                                key={props.children.props.name}
                                className={cn("flex w-full list-none h-6 p-2.5 m-0 font-OpenSans text-lg rounded-t relative justify-between items-center cursor-pointer", props.children.props.name === selectedTabName ? "selected bg-gray-100" : "bg-bone-white")}
                                onClick={() => {
                                    // had to include a theoretically extraneous assertion because onClick is weird?
                                    if(Array.isArray(props.children) == false) {
                                        setSelectedTabName(props.children.props.name);
                                    } else {
                                        console.log("what why this get here it should never get here");
                                    }
                                }}
                            >
                                {props.children.props.name}
                                {props.children.props.name === selectedTabName ? (
                                    <motion.div className="underline absolute inset-px h-px bg-deep-blue"
                                                layoutId="underline"/>
                                ) : null}
                            </li>
                        )
                        }
                    </ul>
                </nav>
                <main className={"flex font-OpenSans text-md"}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedTabName ? selectedTabName : "empty"}
                            initial={{y: 10, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            exit={{y: -10, opacity: 0}}
                            transition={{duration: 0.2}}
                        >
                            {/* conditionally render multiple tabs if they exist, or a single tab if that is the only one*/}
                            {Array.isArray(props.children) ? (
                                props.children.filter((child) => {
                                    return child.props.name === selectedTabName;
                                }).map((child) => {
                                    return child;
                                })
                            ) : (
                                props.children
                            )
                            }
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
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
