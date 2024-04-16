//import Button from "../components/Button.tsx";
import AnimatedSVG from "../components/HeroImage.tsx";

import React from 'react';
import Carousel from "../components/Carousel";
import image1 from '../assets/Carousel/GiftDelivery.png';
import image2 from '../assets/Carousel/InterpreterRequest.png';
import image3 from '../assets/Carousel/SecurityPage.png';

export function LoginPage() {
    const content = [
        {
            image: { src: image1, alt: 'Description of image 1' },
            text: {
                title: "Gift Delivery",
                description: "We're excited to introduce our new Gift Delivery Service—now you can send thoughtful presents directly to your loved ones in the hospital, right from our website!",
                callToAction: "Click here to navigate!",
                route: "/giftdelivery"
            }
        },
        {
            image: { src: image2, alt: 'Description of image 2' },
            text: {
                title: "Interpreter Request",
                description: "We are thrilled to launch our new Interpreter Request feature—making language assistance easily accessible to all our patients directly through our website!",
                callToAction: "Explore security services!",
                route: "/interpreter",
            }
        },
        {
            image: { src: image3, alt: 'Description of image 3' },
            text: {
                title: "Security Request",
                description: "We're pleased to announce our enhanced security request feature, allowing you to request for help at anytime through our website.",
                callToAction: "Learn more about parking!",
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
                        <h1 className="dark:text-white font-bold font-HeadlandOne text-6xl text-deep-blue-900 mb-2">Navigate Seamlessly</h1>

                    <a href={"/map"}  className="dark:text-light-white hover:animate-none text-xl hover:cursor-pointer hover:text-deep-blue hover:font-bold pb-5" >
                        Click here to navigate!</a>
                    </div>
                    <div className="flex justify-center">
                        <div className="dark:bg-Ash-black dark:text-white bg-white outline-1 shadow-md rounded-lg border border-deep-blue-900 hover:scale-105 transition-transform duration-300">
                            <Carousel content={content} autoPlay={true} interval={10000} />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );





}

export default LoginPage;
