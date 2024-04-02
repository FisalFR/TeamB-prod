import {NavLink} from "./NavLink.tsx";
import bwhLogo from "../assets/bwh-logo-white.svg";

export function NavigationBar() {
    {
        return (

            <><div className="h-14 w-full"> </div>
            <div className="navbar z-50 bg-deep-blue w-full h-14 fixed top-0 left-0 grid">
                <img className="h-3/6 self-center px-4" src={bwhLogo}
                     alt="Brighams Logo White"></img>
                <nav
                    className="uppercase divide-x divide-solid centerContent">
                    <NavLink href="/maintenance"> Maintenance </NavLink>
                    <NavLink href="/map"> Map </NavLink>
                    <NavLink href="/"> Login </NavLink>
                </nav>
            </div></>
        );
    }
}


export default NavigationBar;
