import AnimatedSVG from "../components/HeroImage.tsx";

import React, {useState} from 'react';
import Carousel from "../components/Carousel";
import image1 from '../assets/Carousel/GiftDelivery.jpg';
import image2 from '../assets/Carousel/InterpreterRequest.jpg';
import image3 from '../assets/Carousel/security.jpg';
import image4 from '../assets/Carousel/mapPathfinding.png';
export function LoginPage() {
    const [isHovered,setIsHovered] = useState(true);
    const content = [
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





    return (
        <div className="animate-fade-in centerContent pt-2 bg-deep-blue-900 min-h-screen flex justify-center items-center">
            <div className='w-full flex justify-between items-start px-10'>
                <div className="flex flex-col items-center w-1/2">
                    <AnimatedSVG />
                </div>
                <div className="w-1/2 flex flex-col">
                    <div className="text-center p-10 rounded mx-auto animate-scale-in-ver-top">
                        <h1 className="pb-5 font-bold font-HeadlandOne text-6xl text-deep-blue-900 mb-2">Navigate Seamlessly</h1>

                    <a href={"/map"}  className=" hover:animate-none text-3xl hover:cursor-pointer hover:text-deep-blue hover:font-bold pb-5" >
                        Click here to navigate!</a>
                    </div>
                    <div className="flex justify-center">

                        <div
                            className=" bg-white outline-1 shadow-md rounded-lg border border-deep-blue-900 hover:cursor-pointer hover:scale-105 transition-transform duration-300"
                            onMouseEnter={() => setIsHovered(false)}
                            onMouseLeave={() => setIsHovered(true)}>

                            <Carousel content={content} autoPlay={isHovered} interval={5000}/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default LoginPage;
