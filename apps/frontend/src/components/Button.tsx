import { motion } from "framer-motion";
import React, {ReactNode} from "react";

function Button(props:{px: string,py:string, rounded:string, color: string, onClick:(e: React.MouseEvent) => void, children: ReactNode}) {
    return(
        <motion.button className={`${props.px} ${props.py} ${props.color} font-bold text-white w-fit ${props.rounded}`}
               onClick={props.onClick}
               whileHover={{scale: 1.1}}
               whileTap={{scale: 0.9}}>
                {props.children}
        </motion.button>
    );
}

export default Button;
Button.defaultProps = {
    px: "px-10",
    py: "py-2",
    rounded:"rounded",
    color:"bg-deep-blue"
};
