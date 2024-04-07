import {NavLink} from "./NavLink.tsx";
import bwhLogo from "../assets/bwh-logo-white.svg";
import NavDropDown from "../components/navDropDown.tsx";
import user_icon from "../assets/user_icon.svg";
export function NavigationBar() {
    {
        const dropdownList = [
            ["/maintenance", "Maintenance"],
            ["/interpreter", "Interpreter"],
            ["/logs", "Request Logs"],
            ["/csvManager", "CSV Manager"],
            ["/medicineRequest", "Medicine Request"],
            ["/database", "Database"],
            ["/security", "Security"]
        ];
        return (

            <><div className="h-14 w-full"> </div>
            <div className="navbar z-50 bg-deep-blue h-14 fixed top-0 left-0 grid w-full">
                <img className="h-3/6 self-center px-4" src={bwhLogo}
                     alt="Brighams Logo White"></img>
                <nav className="uppercase divide-x divide-solid centerContent w-fit justify-self-center">

                    <NavDropDown mainLink= {["/logs", "Request"]} dropdownLinks={dropdownList}/>

                    <div className="px-16">
                        <NavLink href="/map">Map</NavLink>
                    </div>
                </nav>
                <div className="self-center">
                    <div className="float-end centerContent px-16">
                        <NavLink href="/"><div className="flex flex-row gap-2">
                            <img src={user_icon} alt="Username icon" height="20" width="20"/>LOGOUT</div></NavLink>
                    </div>
                </div>
            </div>
            </>
        );
    }
}


export default NavigationBar;
