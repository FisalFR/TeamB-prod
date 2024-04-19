import { motion } from "framer-motion";
import React, {ReactNode} from "react";

function LongButton(props:{onClick:(e: React.MouseEvent) => void, children: ReactNode}) {
    return(
        <motion.button className={"py-2 w-full bg-deep-blue font-bold text-white rounded"} onClick={props.onClick} whileHover={{scale: 1.1}}
                       whileTap={{scale: 0.9}}>
            {props.children}

        </motion.button>
    );
}

export default LongButton;
