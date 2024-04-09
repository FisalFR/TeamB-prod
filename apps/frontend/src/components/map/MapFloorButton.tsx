import { motion } from "framer-motion";
import React, {ReactNode} from "react";

function MapFloorButton(props:{onClick:(e: React.MouseEvent) => void, highlighted: boolean ,children: ReactNode}) {
    const buttonClass = props.highlighted ?
        "p-4 px-5 bg-deep-blue font-bold text-white w-full rounded ring-4 ring-bwh-cyan" :
        "p-4 px-5 bg-deep-blue font-bold text-white w-full rounded";

    return(
        <motion.button className={buttonClass}
                       onClick={props.onClick}
                       whileHover={{scale: 1.1}}
                       whileTap={{scale: 0.9}}>
            {props.children}
        </motion.button>
    );
}

export default MapFloorButton;
