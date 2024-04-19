//import AnimatedSVG from "../components/HeroImage.tsx";

//import React, {useState} from 'react';
//import Carousel from "../components/Carousel";
/*import image1 from '../assets/Carousel/GiftDelivery.jpg';
import image2 from '../assets/Carousel/InterpreterRequest.jpg';
import image3 from '../assets/Carousel/security.jpg';
import image4 from '../assets/Carousel/mapPathfinding.png';*/
import background from '../assets/Hero_Image/brighams_hero.jpg';
export function LoginPage() {
   // const [isHovered,setIsHovered] = useState(true);
  /*  const content = [
        {
            image: { src: image4, alt: 'Description of image 1' },
            text: {
                title: "Map",
                description: "We're excited to introduce our new Pathfinding Feature—now you can navigate to your destination in the hospital at your own convenience!",
                callToAction: "Click here explore the map!",
                route: "/map"
            }
        },
        {
            image: { src: image1, alt: 'Description of image 2' },
            text: {
                title: "Gift Delivery",
                description: "We're excited to introduce our new Gift Delivery Service—now you can send thoughtful presents directly to your loved ones in the hospital, right from our website!",
                callToAction: "Click here to make a gift request!",
                route: "/giftdelivery"
            }
        },
        {
            image: { src: image2, alt: 'Description of image 3' },
            text: {
                title: "Interpreter Request",
                description: "We are thrilled to launch our new Interpreter Request feature—making language assistance easily accessible to all our patients directly through our website!",
                callToAction: "Click here to request an interpreter!",
                route: "/interpreter",
            }
        },
        {
            image: { src: image3, alt: 'Description of image 4' },
            text: {
                title: "Security Request",
                description: "We're pleased to announce our enhanced security request feature, allowing you to request for help at anytime through our website.",
                callToAction: "Click here to make a security request!",
                route: "/security",
            }
        }
    ];
*/
    const style = {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',

    };




    return (
        <div className="z-0 top-0 left-0 h-full " style={style}>

            <div className='w-full  justify-between px-10 pt-20 h-full'>


                <div className="w-1/2 flex flex-col">
                    <div className="text-center pb-5 rounded mx-auto animate-scale-in-ver-top">
                        <h1 className="font-bold font-HeadlandOne text-6xl text-white mb-2">Navigate
                            Seamlessly</h1>
                        <p className="text-left text-xl py-6 text-white">Find your room in Brigham & Women's with ease. With
                            pathfinding
                            locate your
                            destination in the smallest steps. Never get lost, no wasted time, get there stress
                            free.</p>

                        {<a href={"/map"}
                            className=" hover:animate-none text-4xl hover:cursor-pointer hover:text-4xl hover:text-deep-blue hover:font-bold pb-5 ">
                            Click here to navigate!</a>}

                    </div>
                    <div className="flex justify-center">

                        {/*<div
                            className=" overflow-hidden bg-white outline-1 shadow-md rounded-lg border border-deep-blue-900 hover:cursor-pointer hover:scale-105 transition-transform duration-300"
                            onMouseEnter={() => setIsHovered(false)}
                            onMouseLeave={() => setIsHovered(true)}>

                            <Carousel content={content} autoPlay={isHovered} interval={4000}/>

                        </div>*/}
                    </div>
                </div>
            </div>
        </div>


    );


}

export default LoginPage;
