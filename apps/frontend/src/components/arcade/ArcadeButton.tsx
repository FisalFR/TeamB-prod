import { motion } from "framer-motion";
import React, {ReactNode} from "react";

function ArcadeButton(props:{px: string,py:string, rounded:string, color: string, onClick:(e: React.MouseEvent) => void, children: ReactNode}) {
    return(
        <>
        <motion.div className={`${props.px} ${props.py} ${props.color} font-bold text-white w-fit ${props.rounded}`}
                       onClick={props.onClick}
                       whileHover={{scale: 1.1}}
                       whileTap={{scale: 0.9}}
                        tabIndex={-1}
                        onMouseDown={(e: React.MouseEvent) => e.preventDefault()}>
            {props.children}
        </motion.div>
        </>
    );
}

export default ArcadeButton;
ArcadeButton.defaultProps = {
    px: "px-10",
    py: "py-2",
    rounded:"rounded",
    color:"bg-deep-blue"
};
