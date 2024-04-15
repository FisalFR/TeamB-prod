//import Button from "../components/Button.tsx";
import AnimatedSVG from "../components/HeroImage.tsx";

import example from "../assets/security.jpg";
export function LoginPage() {



    return (
        <div className="centerContent pt-14">
            <AnimatedSVG/>

                <div className="pl-20 w-1/2">



                    <div className=' w-full pl-31 flex flex-col'>
                        <h1 className="px-5 font-bold text-left font-HeadlandOne text-6xl ">Navigate Seamlessly</h1>
                        <div className="flex flex-col w-full">

                            <p className=" text-left object-right float-right text-xl p-5 pb-9">
                                Find your room in Brigham & Women's with ease. With pathfinding locate your
                                destination in the smallest steps. Never get lost, no wasted time, get there stress
                                free.
                            </p>
                            <a href={"/map"}  className=" hover:animate-none text-xl hover:cursor-pointer hover:text-deep-blue hover:font-bold pb-5" >
                              Click here to navigate!</a>


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
        </div>
    );

}

export default LoginPage;
