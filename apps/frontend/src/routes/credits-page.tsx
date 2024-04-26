import React from "react";
//import brighamImage from "../assets/Hero_Image/brighams_hero.jpg";
import webstorm from "../assets/creditPictures/Webstorm.jpeg";
import Docker from "../assets/creditPictures/docker.png";
import github from "../assets/creditPictures/github.png";
import figma from "../assets/creditPictures/figma.png";
import taiga from "../assets/creditPictures/Taiga.png";
import react from "../assets/creditPictures/React.png";
import typescript from "../assets/creditPictures/typescript.png";

export function creditsPage() {

    return(
        <>

            <div className="bg-gradient-to-t from-bone-white to-deep-blue w-screen ">
                <div className="pt-5">
                    <h1 className="font-bold text-bone-white font-OpenSans">Credits</h1>
                </div>

                <h1 className="font-bold text-bone-white font-OpenSans text-left py-4 px-14"> Software Tools:</h1>
                <div className="grid grid-cols-5 place-items-center h-40">
                    <div className="w-56">
                        <div className=" border-2 rounded-3xl bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-56 my-auto">
                                <img src={webstorm} alt="webstorm"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className=" ">
                                <p className="text-deep-blue font-bold pt-2 text-lg">Webstorm</p>
                                <p className=" text-deep-blue">2023.3</p>
                                <br/>
                            </div>
                        </div>
                    </div>

                    <div className="w-56">
                        <div className=" border-2 rounded-3xl bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-56 my-auto">
                                <img src={Docker} alt="docker"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className=" ">
                                <p className="text-deep-blue font-bold pt-2 text-lg">Docker</p>
                                <p className=" text-deep-blue">Version</p>
                                <br/>
                            </div>
                        </div>
                    </div>

                    <div className="w-56">
                        <div className=" border-2 rounded-3xl bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-56 my-auto">
                                <img src={github} alt="github"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className=" ">
                                <p className="text-deep-blue font-bold pt-2 text-lg">GitHub</p>
                                <p className=" text-deep-blue">Version</p>
                                <br/>
                            </div>
                        </div>
                    </div>

                    <div className="w-56">
                        <div className=" border-2 rounded-3xl bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-56 my-auto">
                                <img src={figma} alt="Figma"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className=" ">
                                <p className="text-deep-blue font-bold pt-2 text-lg">Figma</p>
                                <p className=" text-deep-blue">Version</p>
                                <br/>
                            </div>
                        </div>
                    </div>
                    <div className="w-56">
                        <div className=" border-2 rounded-3xl bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-56 my-auto">
                                <img src={taiga} alt="Taiga"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className=" ">
                                <p className="text-deep-blue font-bold pt-2 text-lg">Taiga</p>
                                <p className=" text-deep-blue">Version</p>
                                <br/>
                            </div>
                        </div>
                    </div>

                </div>
                <br/>
                <br/>

                <h1 className="font-bold text-deep-blue font-OpenSans text-left py-4 px-14 mt-32"> Software
                    Libraries:</h1>
                <div className="grid grid-cols-4 place-items-center h-40">
                    <div className="w-56">
                        <div className=" border-2 rounded-3xl bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-56 my-auto">
                                <img src={react} alt="React"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className=" ">
                                <p className="text-deep-blue font-bold pt-2 text-lg">React</p>
                                <p className=" text-deep-blue">Version</p>
                                <br/>
                            </div>
                        </div>
                    </div>

                    <div className="w-56">
                        <div className=" border-2 rounded-3xl bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-56 my-auto">
                                <img src={typescript} alt="Typescript"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className=" ">
                                <p className="text-deep-blue font-bold pt-2 text-lg">Typescript</p>
                                <p className=" text-deep-blue">Version</p>
                                <br/>
                            </div>
                        </div>
                    </div>

                    <div className="w-56">
                        <div className=" border-2 rounded-3xl bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-56 my-auto">
                                <img src={github} alt="github"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className=" ">
                                <p className="text-deep-blue font-bold pt-2 text-lg">GitHub</p>
                                <p className=" text-deep-blue">Version</p>
                                <br/>
                            </div>
                        </div>
                    </div>

                    <div className="w-56">
                        <div className=" border-2 rounded-3xl bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-56 my-auto">
                                <img src={figma} alt="Figma"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className=" ">
                                <p className="text-deep-blue font-bold pt-2 text-lg">Figma</p>
                                <p className=" text-deep-blue">Version</p>
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>

                <h1 className="font-bold text-deep-blue font-OpenSans text-left py-4 px-14 mt-48"> Frameworks:</h1>
                <div className="grid grid-cols-4 place-items-center h-40">
                    <div className="w-56">
                        <div className=" border-2 rounded-3xl bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-56 my-auto">
                                <img src={webstorm} alt="webstorm"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className=" ">
                                <p className="text-deep-blue font-bold pt-2 text-lg">Webstorm</p>
                                <p className=" text-deep-blue">2023.3</p>
                                <br/>
                            </div>
                        </div>
                    </div>

                    <div className="w-56">
                        <div className=" border-2 rounded-3xl bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-56 my-auto">
                                <img src={Docker} alt="docker"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className=" ">
                                <p className="text-deep-blue font-bold pt-2 text-lg">Docker</p>
                                <p className=" text-deep-blue">Version</p>
                                <br/>
                            </div>
                        </div>
                    </div>

                    <div className="w-56">
                        <div className=" border-2 rounded-3xl bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-56 my-auto">
                                <img src={github} alt="github"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className=" ">
                                <p className="text-deep-blue font-bold pt-2 text-lg">GitHub</p>
                                <p className=" text-deep-blue">Version</p>
                                <br/>
                            </div>
                        </div>
                    </div>

                    <div className="w-56">
                        <div className=" border-2 rounded-3xl bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-56 my-auto">
                                <img src={figma} alt="Figma"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className=" ">
                                <p className="text-deep-blue font-bold pt-2 text-lg">Figma</p>
                                <p className=" text-deep-blue">Version</p>
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
