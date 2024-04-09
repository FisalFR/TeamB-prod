import { motion } from "framer-motion";
import React, {ReactNode} from "react";

function Button(props:{onClick:(e: React.MouseEvent) => void, children: ReactNode}) {
    return(
        <motion.button className={"p-4 px-5 bg-deep-blue font-bold text-white w-full rounded"}
               onClick={props.onClick}
               whileHover={{scale: 1.1}}
               whileTap={{scale: 0.9}}>
                {props.children}
        </motion.button>
    );
}

export default Button;
