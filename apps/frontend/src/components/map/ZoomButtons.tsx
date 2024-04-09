import { motion } from "framer-motion";
import React from "react";

function ZoomButtons(props: {
    onClick1: () => void,
    plusSvg: React.JSX.Element,
    onClick2: () => void,
    minusSvg: React.JSX.Element
}) {
    return <div className={"fixed bottom-7 right-7 flex flex-col bg-deep-blue rounded p-1 gap-1"}>

        <motion.button className={""}
                       onClick={props.onClick1}
                       whileHover={{scale: 1.1}}
                       whileTap={{scale: 0.9}}>
            {props.plusSvg}
        </motion.button>

        <div className="h-px bg-white"></div>
        {/* This is the divider */}

        <motion.button className={""}
                       onClick={props.onClick2}
                       whileHover={{scale: 1.1}}
                       whileTap={{scale: 0.9}}>
            {props.minusSvg}
        </motion.button>

    </div>;
}

export default ZoomButtons;
