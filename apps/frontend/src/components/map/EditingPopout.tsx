import React, {ReactNode, useState} from "react";
import { motion, } from "framer-motion";
import pencilSVG from "../../assets/pencil.svg";

export function EditingPopout(props: { children: ReactNode }) {
    const [contentVisibility, setContentVisibility] = useState(false);
    const pencil = <img src={pencilSVG} alt="pencil icon" className={"w-10"}/>;

    function closedPopout() {
        return (
            <motion.button className={"closedPopout button"}
                           onClick={handleOpenPopout}
                           whileHover={{scale: 1.1}}
                           whileTap={{scale: 0.9}}>
                {pencil}
            </motion.button>
        );
    };

    function openPopout() {
        return (
            <motion.button className={"openPopout button"}
                           onClick={handleClosePopout}
                           whileHover={{scale: 1.1}}
                           whileTap={{scale: 0.9}}>
                { props.children }
            </motion.button>
        );
    }

    function handleClosePopout() {
        setContentVisibility(false);
    };

    function handleOpenPopout() {
        setContentVisibility(true);
    };

    return (
        <div className={"absolute top-5 right-5 bg-deep-blue rounded-full p-1"}>
            {/* Render pencil button when closed, on open fade pencil out and replace with close button */}
            {contentVisibility ? openPopout() : closedPopout()}
        </div>
    );
};
