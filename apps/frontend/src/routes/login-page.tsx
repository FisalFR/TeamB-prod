import Button from "../components/Button.tsx";
import AnimatedSVG from "../components/HeroImage.tsx";
import auth0 from "../contexts/auth0-client";





function LoginPage() {

    function handleLogin() {
        const redirectUri = `${window.location.origin}/map`;
        document.addEventListener('click',async () =>{
            await auth0.loginWithRedirect({
                authorizationParams:{
                    redirect_uri: redirectUri,
                }
            });
            const user = await auth0.getUser();
            console.log(user);
        });

    }





    return (
                <div className="flex flex-row ">
                    <AnimatedSVG/>

                    <div className=' gap-10 w-full pl-4 flex flex-col'>
                        <h1 className="px-5 font-bold text-left font-HeadlandOne text-6xl ">Navigate Seamlessly</h1>
                        <div className="flex flex-col w-full">

                            <p className="text-left object-right float-right text-xl p-5 pb-9">Find your room in Brigham
                                &
                                Women's with ease. With pathfinding locate your
                                destination in the smallest steps. Never get lost, no wasted time, get there stress
                                free.</p>
                            <div className={"flex justify-end"}>
                                <Button onClick={handleLogin} children="Login"/>
                            </div>

                        </div>


                        <div className='flex-col flex float-right gap-5 pr-52'>


                        </div>




                    </div>
                </div>
    );

}

export default LoginPage;

