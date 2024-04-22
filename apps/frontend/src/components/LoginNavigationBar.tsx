import bwhLogo from "../assets/bwh-logo-white.svg";

import user_icon from "../assets/user_icon.svg";
import HandleLogin from "./handleLogin.tsx";

import HandleLogout from "./handleLogout.tsx";
import {useAuth0} from "@auth0/auth0-react";

export function LoginNavigationBar() {
    const useLogout = HandleLogout();
    const redirectUri = "/map";
  /// const useLogin = () => HandleLogin({path:redirectUri});
    const {isAuthenticated,isLoading} = useAuth0();

    {
        return (

            <>

                <div  className="navbar z-50 relative  bg-deep-blue  h-14 top-0 left-0 grid w-full">

                    <img onClick={useLogout} className="hover:cursor-pointer h-3/6 self-center px-4" src={bwhLogo}
                         alt="Brighams Logo White"></img>
                 <br/>
                    <div onClick={() => HandleLogin({path:redirectUri,auth:isAuthenticated,load:isLoading})}  className="self-center hover:cursor-pointer pl-20">
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
