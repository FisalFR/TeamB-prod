import { motion } from "framer-motion";
import {SideTab} from "./SideTab.tsx";

export function PathDirections(){
    return (
        <SideTab height={"h-[172px]"} yPos={"top-56"} arrow={false}
            tabChildren={
                <motion.button className={"w-[24px]"}>
                    <b style={{color: "white"}}>|<br/>V</b>
                </motion.button>}
            bodyChildren={
                <motion.div className={"p-4"}>
                    <h1>PATH<br/>DIRECTIONS</h1>
                </motion.div>
            }>
        </SideTab>);
}
