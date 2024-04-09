import { motion } from "framer-motion";
import React, {ReactNode} from "react";

function Button(props:{px: string, onClick:(e: React.MouseEvent) => void, children: ReactNode}) {
    return(
        <motion.button className={`${props.px} py-2 bg-deep-blue font-bold text-white w-fit rounded`}
               onClick={props.onClick}
               whileHover={{scale: 1.1}}
               whileTap={{scale: 0.9}}>
                {props.children}
        </motion.button>
    );
}

export default Button;
Button.defaultProps = {
    px: "px-10"
};
