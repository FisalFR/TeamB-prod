import {useState} from "react";
import {NavLink} from "./NavLink.tsx";


//props:
// 2D array text with link
// main link and  the list of links
 function NavDropDown(props: {mainLink:string[],dropdownLinks:string[][]}){

    const [isSeen, setIsSeen] = useState(false);
     const handleMouseEnter = () => {
        setIsSeen(true);
     };
     const handleMouseLeave = () => {
        setIsSeen(false);
     };
     function createDropdown(){
         return props.dropdownLinks.map((link) =>
             <div className="centerContent py-1">
             <NavLink href={link[0]}>
                 {link[1]}
             </NavLink>
             </div>

         );}
    return(
        <div className="w-fit relative" onMouseEnter = {handleMouseEnter}
             onMouseLeave = {handleMouseLeave}>

            <div className="px-16">
                <NavLink href={props.mainLink[0]}>
                    {props.mainLink[1]}
                </NavLink>
            </div>
            {isSeen && (
                <div className= "bg-deep-blue absolute w-full z-10">
                    {createDropdown()}
                </div>
            )}

        </div>
    );
}
export default NavDropDown;
