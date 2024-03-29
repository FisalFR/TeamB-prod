import {ChangeEvent, useRef, useState} from "react";
import {loginInfo} from "../common/login-info";
import Button from "../components/Button.tsx";
import user_icon from "../assets/user_icon.svg";
import password_icon from "../assets/password_icon.svg";
import maze from "../assets/MazeHero.svg";

function LoginPage() {
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
            setLoginWindowVisibility({loginScreen: "hidden", submittedScreen: "block"});
        }
    }

    function handleLogout() {
        console.log("Logged out");
        setLoginWindowVisibility({loginScreen: "block", submittedScreen: "hidden"});
        setInput({username: "", password: ""});
    }


    return (
        <div>

            <div className='centerContent gap-10 w-full h-fit'>
                <div className = "flex flex-col">
                    <h1 className="font-bold text-left font-HeadlandOne text-4xl">Navigate Seamlessly</h1>
                    <img src={maze} alt="Maze"
                     className="left-column my-7 rounded-full bg-white p-3 drop-shadow-md w-[360px]"/>
                </div>
                <div className={loginWindowVisibility.loginScreen}>
                    <div className='login-container centerContent bg-deep-blue'>
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

