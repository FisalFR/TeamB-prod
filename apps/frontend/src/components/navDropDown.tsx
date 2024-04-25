import {MouseEventHandler, useState} from "react";
import {NavLink} from "./NavLink.tsx";
import {AnimatePresence, motion} from "framer-motion";

//props:
// 2D array text with link
// main link and  the list of links
 function NavDropDown(props: {onClick:MouseEventHandler, mainLink:string[],dropdownLinks:string[][]}){

    const [isSeen, setIsSeen] = useState(false);
     const handleMouseEnter = () => {
        setIsSeen(true);
     };
     const handleMouseLeave = () => {
        setIsSeen(false);
     };
     function createDropdown(){
         return props.dropdownLinks.map((link, index) =>
             <motion.div className="centerContent py-1 opacity-0"
                         animate={{opacity: 1, transition: {duration: 0.05 * props.dropdownLinks.length, delay: 0.025 * index, ease: "backOut"}}}
                         exit={{opacity: 0, transition: {duration: 0.05, delay: 0.025 * (props.dropdownLinks.length - index - 1), ease: "backOut"}}}>
             <NavLink href={link[0]}>
                 {link[1]}
             </NavLink>
             </motion.div>

         );}
    return(
        <div  className="w-fit relative" onMouseEnter = {handleMouseEnter}
             onMouseLeave = {handleMouseLeave}>

            <div onClick={props.onClick} className="px-16">
                <NavLink href={props.mainLink[0]}>
                    {props.mainLink[1]}
                </NavLink>
            </div>
            <AnimatePresence>
                {isSeen && <motion.div className="bg-deep-blue absolute w-full z-10 h-0"
                            animate={{height: "fit-content"}}
                            transition={{duration: 0.1 * props.dropdownLinks.length, ease: "backOut"}}
                            exit={{height: 0}}>
                    {createDropdown()}
                </motion.div>}
            </AnimatePresence>
        </div>
    );
 }

export default NavDropDown;
