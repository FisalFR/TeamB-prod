import {MouseEventHandler, useState} from "react";
import {NavLink} from "./NavLink.tsx";
import {AnimatePresence, motion} from "framer-motion";

//props:
// 2D array text with link
// main link and  the list of links
function NavDropDown(props: {onClick:MouseEventHandler, mainLink:string[],dropdownLinks:(string[] | (() => void))[][], children?: React.ReactNode}) {
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
                         animate={{opacity: 1, transition: {duration: 0.04 * props.dropdownLinks.length, delay: 0.04 * index, ease: "backOut"}}}
                         exit={{opacity: 0, transition: {duration: 0.03, delay: 0.03 * (props.dropdownLinks.length - index - 1), ease: "backOut"}}}>
                 {typeof  link[0] == 'function' ?
                     <div className="text-white hover:cursor-pointer  " onClick={link[0]}>

                         <p className="py-1 relative group font-OpenSans items-center font-bold text-bone-white top-0">
                             <p
                                 className="inline pl-2 pb-3"> {link[1]}</p>
                             <span
                                 className="absolute bottom-0 left-1/2 w-0 h-1 bg-gold-yellow transition-all group-hover:w-16"></span>
                             <span
                                 className="absolute bottom-0 right-1/2 w-0 h-1 bg-gold-yellow transition-all group-hover:w-16"></span>
                         </p>

                     </div> :
                     <NavLink href={link[0]}>
                         {link[1]}
                     </NavLink>
                 }
             </motion.div>

         );}
    return(
        <div  className="w-fit relative" onMouseEnter = {handleMouseEnter}
             onMouseLeave = {handleMouseLeave}>

            <div onClick={props.onClick} className="relative px-16 flex flex-row">
                {props.children ? props.children : null}
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
