import {ChangeEvent, useRef, useState} from "react";
import {loginInfo} from "../common/login-info";
import Button from "../components/Button.tsx";
import user_icon from "../assets/user_icon.svg";
import password_icon from "../assets/password_icon.svg";
import AnimatedSVG from "../components/HeroImage.tsx";
import { useNavigate } from "react-router-dom";


function LoginPage() {

    const navigate = useNavigate();

    const [input, setInput] = useState<loginInfo>({username: "", password: ""});
    const [loginWindowVisibility, setLoginWindowVisibility] = useState({
        loginScreen: "block",
        submittedScreen: "hidden"
    });
    const formRef = useRef<HTMLFormElement>(null);

    function handleUsername(e: ChangeEvent<HTMLInputElement>) {
        setInput({...input, username: e.target.value});
    }

    function handlePassword(e: ChangeEvent<HTMLInputElement>) {
        setInput({...input, password: e.target.value});
    }

    function handleLogin() {
        (formRef.current as HTMLFormElement).requestSubmit();
        if ((formRef.current as HTMLFormElement).checkValidity()) {
            console.log(input);
            if(input.username == "admin" && input.password == "admin"){
                navigate("/map");
                return;
            }
            else {
                alert("Invalid username or password");
            }
            //setLoginWindowVisibility({loginScreen: "hidden", submittedScreen: "block"});
        }
    }

    function guestLogin() {
        navigate("/map");
    }

    function handleLogout() {
        console.log("Logged out");
        setLoginWindowVisibility({loginScreen: "block", submittedScreen: "hidden"});
        setInput({username: "", password: ""});
    }


    return (
                <div>
                    <h1 className="px-6 font-bold text-left font-HeadlandOne text-6xl">Navigate Seamlessly</h1>
                    <div className='centerContent gap-10 w-full h-fit'>
                        <div className="centerContent flex-col">
                            <p className="text-left text-xl p-6">Find your room in Brigham & Women's with ease. With pathfinding locate your
                                destination in the smallest steps. Never get lost, no wasted time, get there stress free.</p>
                            <AnimatedSVG/>
                        </div>
                        <div className={loginWindowVisibility.loginScreen}>
                            <div className='login-container centerContent bg-deep-blue px-[50px] py-[40px]'>
                                <h1 className='text-white text-4xl text-left font-bold w-full'>Login</h1>
                                <form className={'flex flex-col centerContent gap-6'} ref={formRef}
                                      onSubmit={e => {
                                          e.preventDefault();
                                      }}>
                                    <div className='flex items-center'>
                                        <img src={user_icon} alt="Username icon" height="40" width="40" className="mr-2"/>
                                        <input type='text' placeholder="Username" onChange={handleUsername}
                                               value={input.username}
                                               required={true}/>
                                    </div>
                                    <div className='flex items-center'>
                                        <img src={password_icon} alt="Password icon" height="40" width="40" className="mr-2"/>
                                        <input type='password' placeholder="Password" onChange={handlePassword}
                                               value={input.password} required={true}/>
                                    </div>
                                    <Button onClick={handleLogin} children="Login"/>
                                    <Button onClick={guestLogin} children="Login as Guest"/>
                                </form>
                            </div>
                        </div>

                        <div className={loginWindowVisibility.submittedScreen}>
                            <div className="p-6 bg-white rounded-2xl">
                                <div className="p-4">

                                    <p className="font-HeadlandOne p-1 text-xl">WELCOME TO THE HOSPITAL KIOSK</p>
                                    <p className="font-HeadlandOne font-extrabold py-2 text-3xl">{input.username}</p>
                                </div>
                                <Button onClick={handleLogout} children="Logout"/>
                            </div>
                        </div>
                    </div>
                </div>
    );

}

export default LoginPage;

