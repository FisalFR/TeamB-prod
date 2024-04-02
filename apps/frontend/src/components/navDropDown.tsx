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
             <NavLink href={link[0]} children="">
                 {link[1]}
             </NavLink>

         );}
    return(
        <div className="w-full relative" onMouseEnter = {handleMouseEnter}
             onMouseLeave = {handleMouseLeave}>

            <NavLink href={props.mainLink[0]} children="">
                {props.mainLink[1]}
            </NavLink>
            {isSeen && (
                <div className= "right-5 bg-deep-blue absolute px-2">
                    {createDropdown()}
                </div>
            )}

        </div>
    );
}
export default NavDropDown;
