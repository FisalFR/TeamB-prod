import { motion } from "framer-motion";
import React, {ReactNode} from "react";

function LongButton(props:{onClick:(e: React.MouseEvent) => void, children: ReactNode}) {
    return(
        <motion.button className={"px-28 py-2 bg-deep-blue font-bold text-white w-fit rounded"} onClick={props.onClick} whileHover={{scale: 1.1}}
                       whileTap={{scale: 0.9}}>
            {props.children}

        </motion.button>
    );
}

export default LongButton;
