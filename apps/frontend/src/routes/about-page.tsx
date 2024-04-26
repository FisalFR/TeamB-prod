import React, {useState} from "react";
//import defaultPic from "../assets/AboutPagePictures/defaultProfile.jpeg";
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
//import wpiPic from "../assets/AboutPagePictures/wpiSoftEng.png";
//import brighamPic from "../assets/AboutPagePictures/brigham.png";
import bwhLogo from "../assets/bwh-logo-white.svg";
import benPic from "../assets/AboutPagePictures/ben.jpg";
import Modal from "../components/Modal.tsx";


export function AboutPage(){

    const [quoteWindowVisibility, setQuoteWindowVisibility] = useState({
        formScreen: "block",
        quoteScreen: "hidden"
    });


    function handleQuote(){
        setQuoteWindowVisibility({formScreen: "hidden", quoteScreen: "block"});
        openQuoteFunction();
    }
    const [openQuote, setOpenQuote] = useState<boolean>(false);
    function openQuoteFunction() {
        setOpenQuote(true);
    }


    return(
        <>
            <div className={quoteWindowVisibility.formScreen}>
                <div className="h-fit bg-deep-blue bg-opacity-60">
                    <img src={heroImage} alt="Hospital Picture"
                         className="h-full w-fit object-cover relative opacity-60"/>
                </div>
                <div className="absolute my-20 right-0 left-0 top-0 bottom-0 margin-auto ">
                    <div className="px-32 py-16 pt-4">
                        <div className="bg-bone-white rounded-lg bg-opacity-90">
                            <h1 className="font-OpenSans text-deep-blue pt-10 pb-2 font-bold">About Us </h1>
                            <hr className=" w-64 h-0.5 mx-auto bg-deep-blue border-deep-blue"/>
                            <p className="font-OpenSans text-deep-blue text-xl pt-5"> WPI Computer Science
                                Department </p>
                            <p className="font-OpenSans text-deep-blue text-lg"> CS3733-D24 Software Engineering </p>
                            <div className="grid grid-cols-5 px-28 pt-10 text-deep-blue">
                                <div>
                                    <img src={moPic} alt="Mo Picture"
                                         className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4" onClick={handleQuote}/>
                                    <p className="font-bold"> Mo Nguyen </p>
                                    <p> Lead Soft Eng. </p>
                                </div>
                                <div>
                                    <img src={colinPic} alt="Colin Picture"
                                         className="h-56 w-fit object-cover rounded-full aspect-square px-4" onClick={handleQuote}/>
                                    <p className="font-bold"> Colin Nguyen </p>
                                    <p> Assistant Lead Eng. </p>
                                </div>
                                <div>
                                    <img src={jadePic} alt="Jade Picture"
                                         className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4" onClick={handleQuote}/>
                                    <p className="font-bold"> Jade Logan </p>
                                    <p> Assistant Lead Eng. </p>
                                </div>
                                <div>
                                    <img src={nickPic} alt="Nick Picture"
                                         className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4" onClick={handleQuote}/>
                                    <p className="font-bold"> Nick Gill </p>
                                    <p> Assistant Lead Eng. </p>
                                </div>
                                <div>
                                    <img src={jeremyPic} alt="Jeremy Picture"
                                         className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4" onClick={handleQuote}/>
                                    <p className="font-bold"> Jeremy Kurtz </p>
                                    <p> Project Manager </p>
                                </div>
                            </div>
                            <br/><br/>
                            <div className="grid grid-cols-6 px-8 pb-5 text-deep-blue">
                                <div>
                                    <img src={henryPic} alt="Henry Picture"
                                         className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4" onClick={handleQuote}/>
                                    <p className="font-bold"> Henry Hribar </p>
                                    <p> Doc. Analyst </p>
                                </div>
                                <div>
                                    <img src={theresaPic} alt="Theresa Picture"
                                         className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4" onClick={handleQuote}/>
                                    <p className="font-bold"> Theresa Acheampong </p>
                                    <p> Scrum Master </p>
                                </div>
                                <div>
                                    <img src={fisalPic} alt="Fisal Picture"
                                         className="h-56 w-fit object-cover rounded-full aspect-square px-4" onClick={handleQuote}/>
                                    <p className="font-bold"> Fisal Qutubzad </p>
                                    <p> Product Owner </p>
                                </div>
                                <div>
                                    <img src={kendallPic} alt="Kendall Picture"
                                         className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4" onClick={handleQuote}>
                                    </img>
                                    <p className="font-bold"> Kendall Hulburt </p>
                                    <p> Full-Stack Eng. </p>
                                </div>
                                <div>
                                    <img src={lilyPic} alt="Lily Picture"
                                         className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4" onClick={handleQuote}/>
                                    <p className="font-bold"> Lily Jones </p>
                                    <p> Doc. Analyst </p>
                                </div>
                                <div>
                                    <img src={benPic} alt="Ben Picture"
                                         className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4" onClick={handleQuote}/>
                                    <p className="font-bold"> Benjamin Cruse </p>
                                    <p> Full-Stack Eng. </p>
                                </div>
                            </div>
                            <p className="text-deep-blue font-bold text-lg pt-5 "> Team Coach: Nick Leslie </p>
                            <p className="text-deep-blue font-bold text-lg "> Professor: Wilson Wong </p>
                            <br/>
                        </div>
                    </div>
                    <br/>
                    <div className="bg-gradient-to-b from-bone-white to-deep-blue h-fit">
                        <div className="px-72 py-16">
                            <div className="bg-bone-white rounded-lg bg-opacity-90">
                                <div className="bg-deep-blue bg-opacity-40 px-10">
                                    <div className="text-center">
                                        <h1 className="font-OpenSans text-deep-blue pt-10 font-bold">Thank You </h1>
                                        <hr className=" w-64 h-0.5 mx-auto bg-deep-blue border-deep-blue"/>
                                        <p className="font-bold text-deep-blue text-xl pt-4"> We express our gratitude
                                            to
                                            Professor
                                            Wong, Nick Leslie, Andrew Shinn, and the entirety of Brigham and Women’s
                                            Hospital for your time and input into our project. </p>
                                        <br/>
                                    </div>

                                    <div>
                                        <img src={bwhLogo} alt="Brigham Logo" className="mt-10 "/>
                                    </div>
                                    <br/><br/>
                                </div>
                            </div>
                        </div>
                        <br/><br/>
                        <p className=" text-bone-white text-lg"> *The Brigham & Women’s Hospital maps and data
                            used in this application are copyrighted and provided for the sole use of educational
                            purpose
                        </p>
                        <br/>
                    </div>
                </div>
            </div>

            <div className={quoteWindowVisibility.quoteScreen}>
                <Modal open={openQuote} onClose={() => setOpenQuote(false)}>
                    <div className="">
                        <h1 className="text-deep-blue">Favorite Quote: </h1>
                        <p className="text-deep-blue"> </p>
                    </div>
                </Modal>

                    <div className="h-fit bg-deep-blue bg-opacity-60">
                        <img src={heroImage} alt="Hospital Picture"
                             className="h-full w-fit object-cover relative opacity-60"/>
                    </div>
                    <div className="absolute my-20 right-0 left-0 top-0 bottom-0 margin-auto ">
                        <div className="px-32 py-16 pt-4">
                            <div className="bg-bone-white rounded-lg bg-opacity-90">
                                <h1 className="font-OpenSans text-deep-blue pt-10 pb-2 font-bold">About Us </h1>
                                <hr className=" w-64 h-0.5 mx-auto bg-deep-blue border-deep-blue"/>
                                <p className="font-OpenSans text-deep-blue text-xl pt-5"> WPI Computer Science
                                    Department </p>
                                <p className="font-OpenSans text-deep-blue text-lg"> CS3733-D24 Software
                                    Engineering </p>
                                <div className="grid grid-cols-5 px-28 pt-10 text-deep-blue">
                                    <div>
                                        <img src={moPic} alt="Mo Picture"
                                             className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4" onClick={handleQuote}/>
                                        <p className="font-bold"> Mo Nguyen </p>
                                        <p> Lead Soft Eng. </p>
                                    </div>
                                    <div>
                                        <img src={colinPic} alt="Colin Picture"
                                             className="h-56 w-fit object-cover rounded-full aspect-square px-4" onClick={handleQuote}/>
                                        <p className="font-bold"> Colin Nguyen </p>
                                        <p> Assistant Lead Eng. </p>
                                    </div>
                                    <div>
                                        <img src={jadePic} alt="Jade Picture"
                                             className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4" onClick={handleQuote}/>
                                        <p className="font-bold"> Jade Logan </p>
                                        <p> Assistant Lead Eng. </p>
                                    </div>
                                    <div>
                                        <img src={nickPic} alt="Nick Picture"
                                             className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4" onClick={handleQuote}/>
                                        <p className="font-bold"> Nick Gill </p>
                                        <p> Assistant Lead Eng. </p>
                                    </div>
                                    <div>
                                        <img src={jeremyPic} alt="Jeremy Picture"
                                             className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4" onClick={handleQuote}/>
                                        <p className="font-bold"> Jeremy Kurtz </p>
                                        <p> Project Manager </p>
                                    </div>
                                </div>
                                <br/><br/>
                                <div className="grid grid-cols-6 px-8 pb-5 text-deep-blue">
                                    <div>
                                        <img src={henryPic} alt="Henry Picture"
                                             className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4" onClick={handleQuote}/>
                                        <p className="font-bold"> Henry Hribar </p>
                                        <p> Doc. Analyst </p>
                                    </div>
                                    <div>
                                        <img src={theresaPic} alt="Theresa Picture"
                                             className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4" onClick={handleQuote}/>
                                        <p className="font-bold"> Theresa Acheampong </p>
                                        <p> Scrum Master </p>
                                    </div>
                                    <div>
                                        <img src={fisalPic} alt="Fisal Picture"
                                             className="h-56 w-fit object-cover rounded-full aspect-square px-4" onClick={handleQuote}/>
                                        <p className="font-bold"> Fisal Qutubzad </p>
                                        <p> Product Owner </p>
                                    </div>
                                    <div>
                                        <img src={kendallPic} alt="Kendall Picture"
                                             className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4"
                                             onClick={handleQuote}>
                                        </img>
                                        <p className="font-bold"> Kendall Hulburt </p>
                                        <p> Full-Stack Eng. </p>
                                    </div>
                                    <div>
                                        <img src={lilyPic} alt="Lily Picture"
                                             className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4" onClick={handleQuote}/>
                                        <p className="font-bold"> Lily Jones </p>
                                        <p> Doc. Analyst </p>
                                    </div>
                                    <div>
                                        <img src={benPic} alt="Ben Picture"
                                             className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4" onClick={handleQuote}/>
                                        <p className="font-bold"> Benjamin Cruse </p>
                                        <p> Full-Stack Eng. </p>
                                    </div>
                                </div>
                                <p className="text-deep-blue font-bold text-lg pt-5 "> Team Coach: Nick Leslie </p>
                                <p className="text-deep-blue font-bold text-lg "> Professor: Wilson Wong </p>
                                <br/>
                            </div>
                        </div>
                        <br/>
                        <div className="bg-gradient-to-b from-bone-white to-deep-blue h-fit">
                            <div className="px-72 py-16">
                                <div className="bg-bone-white rounded-lg bg-opacity-90">
                                    <div className="bg-deep-blue bg-opacity-40 px-10">
                                        <div className="text-center">
                                            <h1 className="font-OpenSans text-deep-blue pt-10 font-bold">Thank You </h1>
                                            <hr className=" w-64 h-0.5 mx-auto bg-deep-blue border-deep-blue"/>
                                            <p className="font-bold text-deep-blue text-xl pt-4"> We express our
                                                gratitude
                                                to
                                                Professor
                                                Wong, Nick Leslie, Andrew Shinn, and the entirety of Brigham and Women’s
                                                Hospital for your time and input into our project. </p>
                                            <br/>
                                        </div>

                                        <div>
                                            <img src={bwhLogo} alt="Brigham Logo" className="mt-10 "/>
                                        </div>
                                        <br/><br/>
                                    </div>
                                </div>
                            </div>
                            <br/><br/>
                            <p className=" text-bone-white text-lg"> *The Brigham & Women’s Hospital maps and data
                                used in this application are copyrighted and provided for the sole use of educational
                                purpose
                            </p>
                            <br/>
                        </div>
                    </div>

                </div>
        </>
    );
}

export default AboutPage;
