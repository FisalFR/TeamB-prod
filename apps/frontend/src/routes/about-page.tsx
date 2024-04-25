import React from "react";
import defaultPic from "../assets/AboutPagePictures/defaultProfile.jpeg";
import kendallPic from "../assets/AboutPagePictures/KendallHulburt.jpg";
import moPic from "../assets/AboutPagePictures/mo.jpg";
import colinPic from "../assets/AboutPagePictures/colin.jpg";
import jadePic from "../assets/AboutPagePictures/jadeID.jpg";
import jeremyPic from "../assets/AboutPagePictures/jeremy.jpg";
import henryPic from "../assets/AboutPagePictures/Henry.jpg";
import fisalPic from "../assets/AboutPagePictures/FisalQ.jpeg";
import lilyPic from "../assets/AboutPagePictures/lily.jpg";
//import wongPic from "../assets/AboutPagePictures/wong.jpeg";
import theresaPic from "../assets/AboutPagePictures/Theresa.jpg";
import nickPic from "../assets/AboutPagePictures/nick.png";
import heroImage from "../assets/Hero_Image/brighams_hero.jpg";
import wpiPic from "../assets/AboutPagePictures/wpiSoftEng.png";
//import brighamPic from "../assets/AboutPagePictures/brigham.png";
import bwhLogo from "../assets/bwh-logo-white.svg";

export function aboutPage(){

    return(
        <>
            <div className="h-fit bg-deep-blue bg-opacity-60">
                <img src={heroImage} alt="Hospital Picture" className="h-full w-fit object-cover relative opacity-60"/>
            </div>
            <div className="absolute my-24 right-0 left-0 top-0 bottom-0 margin-auto">
                <div className="px-32 py-16 pt-4">
                    <div className="bg-bone-white rounded-lg bg-opacity-90">
                        <h1 className="font-OpenSans text-deep-blue pt-10 pb-2 font-bold">About Us </h1>
                        <hr className=" w-64 h-0.5 mx-auto bg-deep-blue border-deep-blue"/>
                        <p className="font-OpenSans text-deep-blue text-xl pt-5"> WPI Computer Science Department </p>
                        <p className="font-OpenSans text-deep-blue text-lg"> CS3733-D24 Software Engineering </p>
                        <div className="grid grid-cols-5 px-28 pt-10 text-deep-blue">
                            <div>
                                <img src={moPic} alt="Mo Picture"
                                     className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4"/>
                                <p className="font-bold"> Mo Nguyen </p>
                                <p> Lead Soft Eng. </p>
                            </div>
                            <div>
                                <img src={colinPic} alt="Colin Picture"
                                     className="h-56 w-fit object-cover rounded-full aspect-square px-4"/>
                                <p className="font-bold"> Colin Nguyen </p>
                                <p> Assistant Lead Eng. </p>
                            </div>
                            <div>
                                <img src={jadePic} alt="Jade Picture"
                                     className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4"/>
                                <p className="font-bold"> Jade Logan </p>
                                <p> Assistant Lead Eng. </p>
                            </div>
                            <div>
                                <img src={nickPic} alt="Nick Picture"
                                     className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4"/>
                                <p className="font-bold"> Nick Gill </p>
                                <p> Assistant Lead Eng. </p>
                            </div>
                            <div>
                                <img src={jeremyPic} alt="Jeremy Picture"
                                     className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4"/>
                                <p className="font-bold"> Jeremy Kurtz </p>
                                <p> Project Manager </p>
                            </div>
                        </div>
                        <br/><br/>
                        <div className="grid grid-cols-6 px-8 pb-5 text-deep-blue">
                            <div>
                                <img src={henryPic} alt="Henry Picture"
                                     className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4"/>
                                <p className="font-bold"> Henry Hribar </p>
                                <p> Doc. Analyst </p>
                            </div>
                            <div>
                                <img src={theresaPic} alt="Theresa Picture"
                                     className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4"/>
                                <p className="font-bold"> Theresa Acheampong </p>
                                <p> Scrum Master </p>
                            </div>
                            <div>
                                <img src={fisalPic} alt="Fisal Picture"
                                     className="h-56 w-fit object-cover rounded-full aspect-square px-4"/>
                                <p className="font-bold"> Fisal Qutubzad </p>
                                <p> Product Owner </p>
                            </div>
                            <div>
                                <img src={kendallPic} alt="Kendall Picture"
                                     className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4 "/>
                                <p className="font-bold"> Kendall Hulburt </p>
                                <p> Full-Stack Eng. </p>
                            </div>
                            <div>
                                <img src={lilyPic} alt="Lily Picture"
                                     className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4"/>
                                <p className="font-bold"> Lily Jones </p>
                                <p> Doc. Analyst </p>
                            </div>
                            <div>
                                <img src={defaultPic} alt="Ben Picture"
                                     className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4"/>
                                <p className="font-bold"> Benjamin Cruse </p>
                                <p> Full-Stack Eng. </p>
                            </div>
                        </div>
                        <p className="text-deep-blue font-bold text-lg pt-5"> Team Coach: Nick Leslie </p>
                        <br/>
                        <p className="font-bold text-deep-blue text-2xl"> Thank you to Professor Wong, Nick Leslie,
                            Andrew Shinn,
                            and the entirety of Brigham and Women’s Hospital. </p>

                        <br/>
                    </div>
                </div>

                <div className="grid grid-cols-2 bg-deep-blue rounded-lg bg-opacity-40">
                    <div className="grid grid-cols-2">

                        <div className=" border-r h-32 mt-12 ">
                            <img src={wpiPic} alt="WPI Logo"
                                 className="h-48 w-48 object-cover items-center"/>
                        </div>

                        <div>
                            <img src={bwhLogo} alt="Brigham Logo"
                                 className="mt-24"/>
                        </div>

                    </div>

                    <div className=" w-100 pl-4 text-left justify-self-center">
                        <h1 className="font-OpenSans text-deep-blue pt-10 font-bold">Thank You </h1>
                        <hr className=" w-72 h-0.5 text-right bg-deep-blue border-deep-blue"/>
                        <p className="font-bold text-deep-blue text-lg pt-2"> We express our gratitude to Professor
                            Wong,
                            Nick Leslie, Andrew Shinn,
                            and the entirety of Brigham
                            and Women’s Hospital. </p>
                        <br/><br/>
                    </div>
                </div>

                <br/><br/>
                <p className=" text-deep-blue text-lg"> *The Brigham & Women’s Hospital maps and data used in
                    this application are copyrighted and provided for the sole use of educational purpose </p>
                <br/>
            </div>
        </>
    );
}

export default aboutPage;
