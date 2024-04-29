import {NavLink} from "./NavLink.tsx";
import bwhLogo from "../../assets/bwh-logo-white.svg";
import NavDropDown from "./NavDropDown.tsx";
import user_icon from "../../assets/icons/login/user_icon.svg";
import {useAuth0} from "@auth0/auth0-react";
import HandleLogout from "../authentication/HandleLogout.tsx";
import LoginNavigationBar from "../authentication/LoginNavigationBar.tsx";
import axios from "axios";
import React, {useEffect} from "react";
import {employee} from "../../../../../packages/common/src/profile.ts";
import {toSvg} from "jdenticon";
//import navDropDown from "./NavDropDown.tsx";



export function NavBar() {
    const {isAuthenticated, isLoading} = useAuth0();
    const handleLogout = HandleLogout();
    const homeRedirect = `${window.location.origin.concat("/")}`;
    function home() {
        window.location.href = homeRedirect;
    }
    function handleWindow(path:string){
        return  window.location.href = window.location.origin.concat(path);
    }

    const user = useAuth0();
    useEffect(() => {
        const userEmail = user.user?.email;
        const userFirst = user.user?.name;
        if (userEmail) {
            if (userFirst) {
                        const userProfile: employee = {
                            employeeEmail: userEmail,
                            firstName: userFirst,
                            lastName: "",
                            salary: 0,
                            gender: "",
                            type: "Employee",
                        };
                        axios.post("/api/employee/checkEmployee", userProfile, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(() => {
                        });
                    }
                }
    }, [user.user?.email, user.user?.name]);

    const profilePicture = () => {
        const svgString = toSvg(user.user?.email, 240);
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
        const svgUrl = URL.createObjectURL(svgBlob);
        return (
            <img src={svgUrl} className="size-10 bg-white absolute left-1 -top-[4px] z-20 hover:cursor-pointer " alt="Profile"/>
        );
    };

    {

        const dropdownList = [
            ["/maintenance", "Maintenance"],
            ["/interpreter", "Interpreter"],
            ["/medicineRequest", "Medicine"],
            ["/sanitation", "Sanitation"],
            ["/security", "Security"],
            ["/internalTransport", "Int. Transport"],
            ["/transport", "Ext. Transport"],
            ["/giftDelivery", "Gift Delivery"],
        ];
        const adminDropdownList = [
            ["/database", "Database"],
            ["/csvManager", "CSV Manager"],
            ["/mapEditor", "Map Editor"],
        ];
        const userDropdownList =[
            [handleLogout, "LOGOUT"]
        ];

        const miscDropdownList = [
            ["/about", "About Us"],
            ["/arcade", "Arcade"],
            ["/credits", "Credits"],
        ];

        return (
            <div>

                {
                    (!isLoading && isAuthenticated && window.location.href !== homeRedirect)
                        ? (
                            // Output when user is authenticated and page is not loading
                            <>
                                <div className="navbar z-50 relative bg-deep-blue h-14 top-0 left-0 grid w-full">
                                    <img onClick={home} className="hover:cursor-pointer h-3/6 self-center px-4"
                                         src={bwhLogo}
                                         alt="Brighams Logo White"></img>
                                    <nav
                                        className="uppercase divide-x divide-solid centerContent w-fit justify-self-center">

                                        <NavDropDown onClick={() => handleWindow("")} mainLink={["", "Request"]}
                                                     dropdownLinks={dropdownList as unknown as (string[] | (() => void))[][]}/>

                                        <div className="px-16">
                                            <NavLink href="/map">Map</NavLink>
                                        </div>

                                        <NavDropDown onClick={() => handleWindow("")} mainLink={["", "Admin"]}
                                                     dropdownLinks={adminDropdownList as unknown as (string[] | (() => void))[][]}></NavDropDown>

                                        <NavDropDown onClick={() => handleWindow("")} mainLink={["", "Misc."]}
                                                     dropdownLinks={miscDropdownList as unknown as (string[] | (() => void))[][]}></NavDropDown>

                                    </nav>
                                    <div className="self-center">
                                        <div className="float-end centerContent ">

                                            {/*<NavLink onClick={handleLogout}><div className="flex flex-row gap-2">*/}
                                            <div className="flex flex-row items-center">

                                                <NavDropDown onClick={() => handleWindow("/userProfile")}
                                                             mainLink={["", "PROFILE"]}
                                                             dropdownLinks={userDropdownList as unknown as (string[] | (() => void))[][]}>
                                                    {profilePicture()}
                                                </NavDropDown>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                        : (!isLoading && isAuthenticated && window.location.href === homeRedirect)
                            ? (
                                // Different output when user is authenticated, page is not loading, and current window location is the home page
                                <>

                                    <div className="navbar z-50 relative  bg-deep-blue  h-14 top-0 left-0 grid w-full">

                                        <img onClick={home} className="hover:cursor-pointer h-3/6 self-center px-4"
                                             src={bwhLogo}
                                             alt="Brighams Logo White"></img>
                                        <br/>
                                        <div onClick={handleLogout} className="self-center hover:cursor-pointer pl-20">
                                            <p  className="py-1 relative group font-OpenSans items-center font-bold text-bone-white">
                                                <img className="inline" src={user_icon} alt="Username icon" height="20" width="20"/><a className="inline pl-2 pb-3">LOGOUT</a>
                                                <span
                                                    className="absolute bottom-0 left-1/2 w-0 h-1 bg-gold-yellow transition-all group-hover:w-16"></span>
                                                <span
                                                    className="absolute bottom-0 right-1/2 w-0 h-1 bg-gold-yellow transition-all group-hover:w-16"></span>
                                            </p>


                                        </div>
                                    </div>
                                </>
                    )
                    : (
                    // Output when user is not authenticated or page is loading
                        <LoginNavigationBar/>
                    )
                }
            </div>


        );
    }
}


export default NavBar;
