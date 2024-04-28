import React from "react";
//import brighamImage from "../assets/Hero_Image/brighams_hero.jpg";
import webstorm from "../assets/creditPictures/Webstorm.jpeg";
import Docker from "../assets/creditPictures/docker.png";
import github from "../assets/creditPictures/github.png";
import figma from "../assets/creditPictures/figma.png";
import taiga from "../assets/creditPictures/Taiga.png";
import react from "../assets/creditPictures/React.png";
import typescript from "../assets/creditPictures/typescript.png";
import axios from "../assets/creditPictures/axios.png";
import auth0 from "../assets/creditPictures/auth0.png";
import postgreSQL from "../assets/creditPictures/PostgreSQL.png";
import prismaORM from "../assets/creditPictures/prismaORM.jpeg";
import tailwind from "../assets/creditPictures/tailwind.png";

export function CreditsPage() {

    const openInNewTab = (url: string) => {
        window.open(url, "Window", "noreferrer");
    };


    return(
        <>

            <div className="bg-deep-blue overflow-scroll bg-opacity-60">
                <div className="pt-5">
                    <h1 className="font-bold text-bone-white font-OpenSans">Credits</h1>
                </div>

                <h1 className="font-bold text-bone-white font-OpenSans text-left text-3xl py-4 px-14 "> Software Tools:</h1>

                <div className="grid grid-cols-5 place-items-center h-40">
                    <div className="w-56">
                        <div className=" border-2 rounded-3xl bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-56 my-auto">
                                <img src={webstorm} alt="webstorm"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className=" ">
                                <li className="text-deep-blue font-bold pt-2 text-lg underline"
                                    onClick={() => openInNewTab("https://www.jetbrains.com/webstorm/")}>Webstorm
                                </li>
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
                                <p className="text-deep-blue font-bold pt-2 text-lg underline"
                                   onClick={() => openInNewTab("https://www.docker.com/#build")}>Docker</p>
                                <p className=" text-deep-blue">4.29.0</p>
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
                                <p className="text-deep-blue font-bold pt-2 text-lg underline"
                                   onClick={() => openInNewTab("https://github.com/")}>GitHub</p>
                                <p className=" text-deep-blue">3.12</p>
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
                                <p className="text-deep-blue font-bold pt-2 text-lg underline"
                                   onClick={() => openInNewTab("https://www.figma.com/")}>Figma</p>
                                <p className=" text-deep-blue">16.13.3</p>
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
                                <p className="text-deep-blue font-bold pt-2 text-lg underline"
                                   onClick={() => openInNewTab("https://taiga.io/")}>Taiga</p>
                                <p className=" text-deep-blue">6.7.1</p>
                                <br/>
                            </div>
                        </div>
                    </div>

                </div>
                <br/>
                <br/>

                <h1 className="font-bold text-bone-white font-OpenSans text-3xl text-left py-4 px-14 mt-32"> Software
                    Libraries:</h1>
                <div className="grid grid-cols-4 place-items-center h-40">
                    <div className="w-56">
                        <div className=" border-2 rounded-3xl bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-56 my-auto">
                                <img src={react} alt="React"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className=" ">
                                <p className="text-deep-blue font-bold pt-2 text-lg underline"
                                   onClick={() => openInNewTab("https://legacy.reactjs.org/")}>React</p>
                                <p className=" text-deep-blue">React 18</p>
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
                                <p className="text-deep-blue font-bold pt-2 text-lg underline"
                                   onClick={() => openInNewTab("https://www.typescriptlang.org/")}>Typescript</p>
                                <p className=" text-deep-blue">5.4.5</p>
                                <br/>
                            </div>
                        </div>
                    </div>

                    <div className="w-56">
                        <div className=" border-2 rounded-3xl bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-56 my-auto">
                                <img src={axios} alt="axios"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className=" ">
                                <p className="text-deep-blue font-bold pt-2 text-lg underline"
                                   onClick={() => openInNewTab("https://axios-http.com")}>Axios</p>
                                <p className=" text-deep-blue">1.6.8</p>
                                <br/>
                            </div>
                        </div>
                    </div>

                    <div className="w-56">
                        <div className=" border-2 rounded-3xl bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-56 my-auto">
                                <img src={auth0} alt="auth0"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className=" ">
                                <p className="text-deep-blue font-bold pt-2 text-lg underline"
                                   onClick={() => openInNewTab("https://auth0.com")}>auth0</p>
                                <p className=" text-deep-blue">4.3.1</p>
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>

                <h1 className="font-bold text-bone-white font-OpenSans text-left text-3xl py-4 px-14 mt-48"> Frameworks:</h1>
                <div className="grid grid-cols-4 place-items-center h-40">
                    <div className="w-56 pb-10">
                        <div className=" border-2 rounded-3xl bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-56 my-auto">
                                <img src={react} alt="React.js"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className=" ">
                                <p className="text-deep-blue font-bold pt-2 text-lg underline"
                                   onClick={() => openInNewTab("https://react.dev")}>React.js</p>
                                <p className=" text-deep-blue">React 18</p>
                                <br/>
                            </div>
                        </div>
                    </div>

                    <div className="w-56 pb-10">
                        <div className=" border-2 rounded-3xl bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-56 my-auto">
                                <img src={postgreSQL} alt="PostgreSQL"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className=" ">
                                <p className="text-deep-blue font-bold pt-2 text-lg underline"
                                   onClick={() => openInNewTab("https://www.postgresql.org")}>PostgreSQL</p>
                                <p className=" text-deep-blue">16.2</p>
                                <br/>
                            </div>
                        </div>
                    </div>

                    <div className="w-56 pb-10">
                        <div className=" border-2 rounded-3xl bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-56 my-auto">
                                <img src={prismaORM} alt="prismORM"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className=" ">
                                <p className="text-deep-blue font-bold pt-2 text-lg underline"
                                   onClick={() => openInNewTab("https://www.prisma.io")}>PrismaORM</p>
                                <p className=" text-deep-blue">5</p>
                                <br/>
                            </div>
                        </div>
                    </div>

                    <div className="w-56 pb-10">
                        <div className=" border-2 rounded-3xl bg-gradient-to-t from-white to-blue-300 text-center">
                            <div className="h-56 my-auto">
                                <img src={tailwind} alt="Tailwind"
                                     className="object-cover w-full h-full rounded-t-3xl"/>
                            </div>
                            <div className=" ">
                                <p className="text-deep-blue font-bold pt-2 text-lg underline"
                                   onClick={() => openInNewTab("https://tailwindcss.com")}>Tailwind</p>
                                <p className=" text-deep-blue">v3.0</p>
                                <br/>
                            </div>
                        </div>
                    </div>
                    <br/><br/>
                </div>

            </div>
        </>
    );
}

export default CreditsPage;
