import React from "react";
import brighamImage from "../assets/Hero_Image/brighams_hero.jpg";
import webstorm from "../assets/creditPictures/Webstorm.jpeg";
import Docker from "../assets/creditPictures/docker.png";

export function creditsPage() {

    return(
        <>
            <div className="h-fit bg-deep-blue bg-opacity-80 ">
                <img src={brighamImage} alt="Hospital Picture"
                     className="h-full w-fit object-cover relative opacity-50"/>
            </div>

            <div className="absolute my-24 right-0 left-0 top-0 bottom-0 margin-auto">
                <div className="px-32 pt-5 pb-10">
                    <h1 className="font-bold text-bone-white font-OpenSans bg-deep-blue">Credits</h1>
                </div>

                <div className="grid grid-cols-3 place-items-center">
                <div className="w-100">
                        <div className=" border-2 rounded-3xl border-2 bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-80 my-auto">
                                <img src={webstorm} alt="webstorm"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className="h-85 ">
                                <h1 className="text-deep-blue font-bold">Webstorm</h1>
                                <p className=" text-deep-blue font-bold">V.1.5</p>
                                <br/>
                            </div>
                        </div>
                    </div>

                    <div className="w-100 ">
                        <div className=" border-2 rounded-3xl border-2 bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-80 my-auto">
                                <img src={Docker} alt="Docker"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className="h-85 ">
                                <h1 className="text-deep-blue font-bold">Docker</h1>
                                <p className=" text-deep-blue font-bold">V.1.5</p>
                                <br/>
                            </div>
                        </div>
                    </div>

                    <div className="w-100 py-10">
                        <div className=" border-2 rounded-3xl border-2 bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-80 my-auto">
                                <img src={webstorm} alt="hospital"
                                     className="object-cover w-full h-full  rounded-t-3xl"/>
                            </div>
                            <div className="h-85 ">
                                <h1 className="text-deep-blue font-bold">Webstorm</h1>
                                <p className=" text-deep-blue font-bold">V.1.5</p>
                                <br/>
                            </div>
                        </div>
                    </div>

                    <div className="w-100">
                        <div className=" border-2 rounded-3xl border-2 bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-80 my-auto">
                                <img src={webstorm} alt="hospital"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className="h-85 ">
                                <h1 className="text-deep-blue font-bold">Webstorm</h1>
                                <p className=" text-deep-blue font-bold">V.1.5</p>
                                <br/>
                            </div>
                        </div>
                    </div>
                    <div className="w-100">
                        <div className=" border-2 rounded-3xl border-2 bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-80 my-auto">
                                <img src={webstorm} alt="hospital"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className="h-85 ">
                                <h1 className="text-deep-blue font-bold">Webstorm</h1>
                                <p className=" text-deep-blue font-bold">V.1.5</p>
                                <br/>
                            </div>
                        </div>
                    </div>
                    <div className="w-100">
                        <div className=" border-2 rounded-3xl border-2 bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-80 my-auto">
                                <img src={webstorm} alt="hospital"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className="h-85 ">
                                <h1 className="text-deep-blue font-bold">Webstorm</h1>
                                <p className=" text-deep-blue font-bold">V.1.5</p>
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>
        </div>


        </>
    );
}

export default creditsPage;
