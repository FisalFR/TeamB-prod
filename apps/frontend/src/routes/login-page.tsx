import Button from "../components/Button.tsx";
import AnimatedSVG from "../components/HeroImage.tsx";
import auth0 from "../contexts/auth0-client";
import example from "../assets/react.svg";





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

                    <div className='w-full pl-4 flex flex-col'>
                        <h1 className="px-5 font-bold text-left font-HeadlandOne text-5xl ">Navigate Seamlessly</h1>
                        <div className="flex flex-col w-full">

                            <p className="text-left object-right float-right text-xl p-5">
                                Find your room in Brigham & Women's with ease. With pathfinding locate your
                                destination in the smallest steps. Never get lost, no wasted time, get there stress
                                free.
                            </p>

                            <div className={"flex justify-end pr-5"}>
                                <Button onClick={handleLogin} children="Login"/>
                            </div>

                        </div>
                        <div
                            className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4 md:flex">
                            <div className="md:shrink-0 md:w-1/2 md:order-1">
                                <img className="h-48 w-full object-cover md:h-full md:w-full rounded-t-xl"
                                     src={example} alt="Lion Dance at pan asian festival 2023"></img>
                            </div>
                            <div className="p-8 md:w-1/2 md:order-2">
                                <h4 className="block mt-4 text-lg leading-tight font-medium text-black">New
                                    Feature:</h4>
                                <h4 className="text-lg leading-tight font-medium text-black">Security Services</h4>
                                <p className="mt-2 text-slate-500">Need help getting to your car?
                                    Somebody bothering you at the hospital?
                                    Submit a Security Service Request we can assist you.</p>
                            </div>
                        </div>


                    </div>
                </div>
    );

}

export default LoginPage;

