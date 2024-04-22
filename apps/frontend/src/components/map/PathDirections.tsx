import { motion } from "framer-motion";
import {SideTab} from "./SideTab.tsx";

export function PathDirections(){
    return (
        <SideTab height={"h-[172px]"} yPos={"top-56"} arrow={false}
            tabChildren={
                <motion.button>
                    <b style={{color: "white"}}>PD</b>
                </motion.button>}
            bodyChildren={
                <motion.div>
                    <h1 style={{color: "#012D5A"}}>PATH<br/>DIRECTIONS</h1>
                </motion.div>
            }>
        </SideTab>);
}
