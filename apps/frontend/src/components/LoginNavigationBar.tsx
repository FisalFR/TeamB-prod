import bwhLogo from "../assets/bwh-logo-white.svg";

export function LoginNavigationBar() {
    {
        return (

            <><div className="h-14 w-full"> </div>
            <div className="navbar z-50 bg-deep-blue w-full h-14 fixed top-0 left-0 grid">
                <img className="h-3/6 self-center px-4" src={bwhLogo}
                     alt="Brighams Logo White"></img>
            </div></>
        );
    }
}


export default LoginNavigationBar;
