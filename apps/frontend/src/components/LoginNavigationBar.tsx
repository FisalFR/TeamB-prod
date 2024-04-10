import bwhLogo from "../assets/bwh-logo-white.svg";
//import {NavLink} from "./NavLink.tsx";
//import user_icon from "../assets/user_icon.svg";
import HandleLogin from "./handleLogin.tsx";
import user_icon from "../assets/user_icon.svg";

export function LoginNavigationBar() {
    {
        return (

            <>

                <div  className="navbar z-50 bg-deep-blue static h-14 top-0 left-0 grid w-full">
                    <img className="h-3/6 self-center px-4" src={bwhLogo}
                         alt="Brighams Logo White"></img>
                 <br/>
                    <div onClick={() => {HandleLogin();}}  className="self-center hover:cursor-pointer pl-20">
                        <p  className="py-1 relative group font-OpenSans items-center font-bold text-bone-white">
                            <img className="inline" src={user_icon} alt="Username icon" height="20" width="20"/><a className="inline pl-2 pb-3">LOGIN</a>
                            <span
                                className="absolute bottom-0 left-1/2 w-0 h-1 bg-gold-yellow transition-all group-hover:w-16"></span>
                            <span
                                className="absolute bottom-0 right-1/2 w-0 h-1 bg-gold-yellow transition-all group-hover:w-16"></span>
                        </p>


                    </div>
                </div>
            </>
        );
    }
}


export default LoginNavigationBar;
