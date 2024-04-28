import React, {useRef, useState} from "react";
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
import bwhLogo from "../assets/bwh-logo-white.svg";
import benPic from "../assets/AboutPagePictures/ben.jpg";
import Modal from "../components/display/Modal.tsx";


export function AboutPage(){

    const moQuote = "\"That's mad chill.\" -Mo Nguyen";
    const colinQuote = "\"I need to nuke the database real quick.\" -Colin Nguyen";
    const jadeQuote = "\"If you dare nothing, then when the day is over, nothing is all you will have gained.\" - Neil Gaiman, The Graveyard Book";
    const nickQuote = "\"My mission in life is not merely to survive, but to thrive; and to do so with some passion, some compassion, some humor, and some style.\" - Maya Angelou ";
    const jeremyQuote = "\"I am the bug finder, not the bug fixer.\" -Colin Nguyen";
    const henryQuote = "\"Come to me, all you who labor and are burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am meek and humble of heart; and you will find rest for yourselves. For my yoke is easy, and my burden light.\" - Matthew 11:28-30";
    const theresaQuote = "\"In the middle of difficulty lies opportunity.\" -Albert Einstein";
    const fisalQuote = "\"I was lost at the Brigham hospital.\"";
    const kendallQuote = "\"The only thing we have to fear is fear itself.\" -Franklin D. Roosevelt";
    const lilyQuote = "\"The future belongs to those who believe in the beauty of their dreams.\" -Eleanor Roosevelt";
    const benQuote = "\"Just as I predicted, I have absolutely no idea what is going wrong.\"";

    const [quoteWindowVisibility, setQuoteWindowVisibility] = useState({
        formScreen: "block",
        quoteScreen: "hidden"
    });

    //const quote = "test";
    const setQuote = useRef("");
    function handleQuote(quote: string){
        setQuoteWindowVisibility({formScreen: "hidden", quoteScreen: "block"});
        openQuoteFunction();
        setQuote.current = quote;

        return setQuote;
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
                            <p className="font-OpenSans text-deep-blue text-lg"> CS3733-D24 Software
                                Engineering </p>
                            <div className="grid grid-cols-5 px-28 pt-10 text-deep-blue">
                                <div>
                                    <img src={moPic} alt="Mo Picture"
                                         className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4"
                                         onClick={() => handleQuote(moQuote)}/>
                                    <p className="font-bold"> Mo Nguyen </p>
                                    <p> Lead Soft Eng. </p>
                                </div>
                                <div>
                                    <img src={colinPic} alt="Colin Picture"
                                         className="h-56 w-fit object-cover rounded-full aspect-square px-4"
                                         onClick={() => handleQuote(colinQuote)}/>
                                    <p className="font-bold"> Colin Nguyen </p>
                                    <p> Assistant Lead Eng. </p>
                                </div>
                                <div>
                                    <img src={jadePic} alt="Jade Picture"
                                         className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4"
                                         onClick={() => handleQuote(jadeQuote)}/>
                                    <p className="font-bold"> Jade Logan </p>
                                    <p> Assistant Lead Eng. </p>
                                </div>
                                <div>
                                    <img src={nickPic} alt="Nick Picture"
                                         className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4"
                                         onClick={() => handleQuote(nickQuote)}/>
                                    <p className="font-bold"> Nick Gill </p>
                                    <p> Assistant Lead Eng. </p>
                                </div>
                                <div>
                                    <img src={jeremyPic} alt="Jeremy Picture"
                                         className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4"
                                         onClick={() => handleQuote(jeremyQuote)}/>
                                    <p className="font-bold"> Jeremy Kurtz </p>
                                    <p> Project Manager </p>
                                </div>
                            </div>
                            <br/><br/>
                            <div className="grid grid-cols-6 px-8 pb-5 text-deep-blue">
                                <div>
                                    <img src={henryPic} alt="Henry Picture"
                                         className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4"
                                         onClick={() => handleQuote(henryQuote)}/>
                                    <p className="font-bold"> Henry Hribar </p>
                                    <p> Doc. Analyst </p>
                                </div>
                                <div>
                                    <img src={lilyPic} alt="Lily Picture"
                                         className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4"
                                         onClick={() => handleQuote(lilyQuote)}/>
                                    <p className="font-bold"> Lily Jones </p>
                                    <p> Doc. Analyst </p>
                                </div>
                                <div>
                                    <img src={theresaPic} alt="Theresa Picture"
                                         className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4"
                                         onClick={() => handleQuote(theresaQuote)}/>
                                    <p className="font-bold"> Theresa Acheampong </p>
                                    <p> Scrum Master </p>
                                </div>
                                <div>
                                    <img src={fisalPic} alt="Fisal Picture"
                                         className="h-56 w-fit object-cover rounded-full aspect-square px-4"
                                         onClick={() => handleQuote(fisalQuote)}/>
                                    <p className="font-bold"> Fisal Qutubzad </p>
                                    <p> Product Owner </p>
                                </div>
                                <div>
                                    <img src={kendallPic} alt="Kendall Picture"
                                         className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4"
                                         onClick={() => handleQuote(kendallQuote)}>
                                    </img>
                                    <p className="font-bold"> Kendall Hulburt </p>
                                    <p> Full-Stack Eng. </p>
                                </div>
                                <div>
                                    <img src={benPic} alt="Ben Picture"
                                         className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4"
                                         onClick={() => handleQuote(benQuote)}/>
                                    <p className="font-bold"> Benjamin Cruse </p>
                                    <p> Full-Stack Eng. </p>
                                </div>
                            </div>
                            <p className="text-deep-blue font-bold text-lg pt-5 "> Team Coach: Nick Leslie </p>
                            <p className="text-deep-blue font-bold text-lg "> Professor: Wilson Wong </p>
                            <br/>
                        </div>
                    </div>

                    <div>
                        <div className="bg-bone-white rounded-lg bg-opacity-90">
                            <div className="bg-gradient-to-b from-bone-white to-deep-blue px-10">
                                <div className="text-center">
                                    <h1 className="font-OpenSans text-deep-blue pt-10 font-bold">Thank You </h1>
                                    <hr className=" w-64 h-0.5 mx-auto bg-deep-blue border-deep-blue"/>
                                    <p className="font-bold text-deep-blue text-2xl pt-4"> We express our
                                        gratitude to Professor Wong, Nick Leslie, Andrew Shinn, and the entirety of Brigham and Women’s
                                        Hospital for their time and input into our project. </p>
                                    <br/>
                                </div>

                                <div>
                                    <img src={bwhLogo} alt="Brigham Logo" className="mt-10 "/>
                                </div>
                                <br/><br/>
                                <p className=" text-bone-white text-lg"> *The Brigham & Women’s Hospital maps
                                    and data
                                    used in this application are copyrighted and provided for the sole use of
                                    educational
                                    purpose
                                </p>
                                <br/>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className={quoteWindowVisibility.quoteScreen}>
                <Modal open={openQuote} onClose={() => setOpenQuote(false)}>
                    <div className=" w-100 ">
                        <h1 className="text-deep-blue text-3xl font-bold mt-2">Favorite Quote: </h1>
                        <hr className=" w-64 h-0.5 mx-auto mt-2 bg-deep-blue border-deep-blue"/>
                        <p className="text-deep-blue px-2 pt-2 pb-4 text-lg"> {setQuote.current}</p>
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
                                             className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4" onClick={() => handleQuote(moQuote)}/>
                                        <p className="font-bold"> Mo Nguyen </p>
                                        <p> Lead Soft Eng. </p>
                                    </div>
                                    <div>
                                        <img src={colinPic} alt="Colin Picture"
                                             className="h-56 w-fit object-cover rounded-full aspect-square px-4" onClick={() => handleQuote(colinQuote)}/>
                                        <p className="font-bold"> Colin Nguyen </p>
                                        <p> Assistant Lead Eng. </p>
                                    </div>
                                    <div>
                                        <img src={jadePic} alt="Jade Picture"
                                             className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4" onClick={() => handleQuote(jadeQuote)}/>
                                        <p className="font-bold"> Jade Logan </p>
                                        <p> Assistant Lead Eng. </p>
                                    </div>
                                    <div>
                                        <img src={nickPic} alt="Nick Picture"
                                             className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4" onClick={() => handleQuote(nickQuote)}/>
                                        <p className="font-bold"> Nick Gill </p>
                                        <p> Assistant Lead Eng. </p>
                                    </div>
                                    <div>
                                        <img src={jeremyPic} alt="Jeremy Picture"
                                             className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4" onClick={() => handleQuote(jeremyQuote)}/>
                                        <p className="font-bold"> Jeremy Kurtz </p>
                                        <p> Project Manager </p>
                                    </div>
                                </div>
                                <br/><br/>
                                <div className="grid grid-cols-6 px-8 pb-5 text-deep-blue">
                                    <div>
                                        <img src={henryPic} alt="Henry Picture"
                                             className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4"
                                             onClick={() => handleQuote(henryQuote)}/>
                                        <p className="font-bold"> Henry Hribar </p>
                                        <p> Doc. Analyst </p>
                                    </div>
                                    <div>
                                        <img src={lilyPic} alt="Lily Picture"
                                             className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4"
                                             onClick={() => handleQuote(lilyQuote)}/>
                                        <p className="font-bold"> Lily Jones </p>
                                        <p> Doc. Analyst </p>
                                    </div>
                                    <div>
                                        <img src={theresaPic} alt="Theresa Picture"
                                             className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4"
                                             onClick={() => handleQuote(theresaQuote)}/>
                                        <p className="font-bold"> Theresa Acheampong </p>
                                        <p> Scrum Master </p>
                                    </div>
                                    <div>
                                        <img src={fisalPic} alt="Fisal Picture"
                                             className="h-56 w-fit object-cover rounded-full aspect-square px-4"
                                             onClick={() => handleQuote(fisalQuote)}/>
                                        <p className="font-bold"> Fisal Qutubzad </p>
                                        <p> Product Owner </p>
                                    </div>
                                    <div>
                                        <img src={kendallPic} alt="Kendall Picture"
                                             className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4"
                                             onClick={() => handleQuote(kendallQuote)}>
                                        </img>
                                        <p className="font-bold"> Kendall Hulburt </p>
                                        <p> Full-Stack Eng. </p>
                                    </div>
                                    <div>
                                        <img src={benPic} alt="Ben Picture"
                                             className="h-56 w-fit object-cover object-top rounded-full aspect-square px-4"
                                             onClick={() => handleQuote(benQuote)}/>
                                        <p className="font-bold"> Benjamin Cruse </p>
                                        <p> Full-Stack Eng. </p>
                                    </div>
                                </div>
                                <p className="text-deep-blue font-bold text-lg pt-5 "> Team Coach: Nick Leslie </p>
                                <p className="text-deep-blue font-bold text-lg "> Professor: Wilson Wong </p>
                                <br/>
                            </div>
                        </div>

                    <div>
                        <div className="bg-bone-white rounded-lg bg-opacity-90">
                                    <div className="bg-gradient-to-b from-bone-white to-deep-blue px-10">
                                        <div className="text-center">
                                            <h1 className="font-OpenSans text-deep-blue pt-10 font-bold">Thank You </h1>
                                            <hr className=" w-64 h-0.5 mx-auto bg-deep-blue border-deep-blue"/>
                                            <p className="font-bold text-deep-blue text-2xl pt-4"> We express our
                                                gratitude to Professor Wong, Nick Leslie, Andrew Shinn, and the entirety of Brigham and Women’s
                                                Hospital for their time and input into our project. </p>
                                            <br/>
                                        </div>

                                        <div>
                                            <img src={bwhLogo} alt="Brigham Logo" className="mt-10 "/>
                                        </div>
                                        <br/><br/>
                                        <p className=" text-bone-white text-lg"> *The Brigham & Women’s Hospital maps
                                            and data
                                            used in this application are copyrighted and provided for the sole use of
                                            educational
                                            purpose
                                        </p>
                                        <br/>

                                    </div>
                                </div>
                            </div>

                    </div>

            </div>
        </>
    );
}

export default AboutPage;
