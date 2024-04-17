import {NavLink} from "./NavLink.tsx";
import bwhLogo from "../assets/bwh-logo-white.svg";
import NavDropDown from "../components/navDropDown.tsx";
import user_icon from "../assets/user_icon.svg";
import {useAuth0} from "@auth0/auth0-react";
import HandleLogout from "./handleLogout.tsx";
import LoginNavigationBar from "./LoginNavigationBar.tsx";



export function NavigationBar() {
    const {isAuthenticated, isLoading} = useAuth0();
    const handleLogout = HandleLogout();
    function home() {
        window.location.href = "/";
    }

    {

        const dropdownList = [
            ["/maintenance", "Maintenance"],
            ["/interpreter", "Interpreter"],
            ["/medicineRequest", "Medicine"],
            ["/sanitation", "Sanitation"],
            ["/security", "Security"],
            ["/giftDelivery", "Gift Delivery"],
        ];
        const adminDropdownList = [
            ["/database", "Database"],
            ["/csvManager", "CSV Manager"],
            ["/mapEditor", "Map Editor"],
        ];

        return (
            <div>
                { (!isLoading && isAuthenticated) ? (
                    <>
                        <div className="navbar z-50 bg-deep-blue static h-14 top-0 left-0 grid w-full">
                            <img onClick={home} className="hover:cursor-pointer h-3/6 self-center px-4" src={bwhLogo}
                                 alt="Brighams Logo White"></img>
                            <nav className="uppercase divide-x divide-solid centerContent w-fit justify-self-center">

                                <NavDropDown mainLink= {["", "Request"]} dropdownLinks={dropdownList}/>

                                <div className="px-16">
                                    <NavLink href="/map">Map</NavLink>
                                </div>

                                <NavDropDown mainLink={["", "Admin"]} dropdownLinks={adminDropdownList}></NavDropDown>
                            </nav>
                            <div className="self-center">
                                <div className="float-end centerContent px-16">

                                    <NavLink onClick={handleLogout}><div className="flex flex-row gap-2">
                                        <img src={user_icon} alt="Username icon" height="20" width="20"/>LOGOUT</div></NavLink>
                                </div>
                            </div>
                        </div>
                    </>
                ): (
                    <LoginNavigationBar/>
                )}
            </div>


        );
    }
}


export default NavigationBar;
