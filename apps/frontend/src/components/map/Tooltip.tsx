import React from 'react'; // , { useState, useEffect }
import { motion } from "framer-motion";
import Node from "common/src/node.ts";

export function Tooltip(x: number, y: number, node: Node) {
    const  tooltipVariants = {
        hidden: {
            y: "-100vh",
        },
        visible: {
            transition: {
                type: "springy",
                delay: 0.25,
            },
        },
    };

    // d
    return (
        <motion.div className={"nodeTooltip"}
                    variants={tooltipVariants}
                    initial={"hidden"}
                    animate={"visible"}
        >

        </motion.div>
    );
}

export default Tooltip;
