import AnimatedSVG from "../components/login/HeroImage.tsx";

import React, {useState} from 'react';
import Carousel from "../components/Carousel";
import image1 from '../assets/Carousel/GiftDelivery.jpg';
import image2 from '../assets/Carousel/InterpreterRequest.jpg';
import image3 from '../assets/Carousel/security.jpg';
import image4 from '../assets/Carousel/Map.png';
import background from '../assets/Hero_Image/brighams_hero.jpg';
import {useEffect} from "react";
import ShinyButton from "../components/button/ShinyButton.tsx";
import Button from "../components/button/Button.tsx";
import { motion } from "framer-motion";
import {ButtonMovingBorder} from "../components/aceternity/moving-border.tsx";
export function LoginPage() {

    useEffect(() => {
        // Disable scrolling on the body element
        document.body.style.overflow = 'hidden';

        // Reset overflow when the component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []); // Empty dependency array ensures this runs on mount and unmount only

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

    const style = {
        backgroundImage: `linear-gradient(to bottom , rgba(21,155,211), rgba(1,45,90,0.3), rgba(1, 45, 90, 1)),url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
        top: 0,
        left: 0,
        height: '100%',
    };




    return (
        <div className="z-0 top-0 left-0 h-full grid grid-cols-2" style={style}>
            <div className="m-auto text-center rounded mx-auto animate-scale-in-ver-top flex-col">
                <h1 className="font-OpenSans text-4xl text-white mb-2 font-bold">Navigate Seamlessly</h1>
                <p className="pl-10 text-left text-xl text-white font-semibold">
                    Find your room in Brigham & Women's with ease.
                    With pathfinding locate your destination in the smallest steps. Never get lost, no wasted time, get
                    there stress free.
                </p>
                <div className={"flex flex-col gap-2 centerContent"}>
                    <motion.div className="pt-5 flex centerContent gap-2 flex-col"
                                animate={{scale: [1.0, 1.05]}}
                                transition={{
                                    duration: 0.4,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                }}>

                        <Button>
                            <a href="/map"
                               className=" font-OpenSans font-bold text-white text-xl hover:cursor-pointer hover:text-white hover:font-extrabold pb-5">
                                Click here to navigate!
                            </a>
                        </Button>

                        <ButtonMovingBorder
                            borderRadius="0.3rem"
                            className="bg-deep-blue text-white border-neutral-200"
                            containerClassName={"p-[2px] w-60"}
                        >
                            <a href="/map"
                               className=" font-OpenSans font-bold text-white text-xl hover:cursor-pointer hover:text-white">
                                Click here to navigate!
                            </a>
                        </ButtonMovingBorder>


                    </motion.div>
                    <button
                        className="relative inline-flex h-12 overflow-hidden rounded p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                    >
                    <span
                        className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F6BD38_0%,#FFFFFF_50%,#F6BD38_100%)]"/>
                        <span
                            className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded bg-deep-blue px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        <a href="/map"
                           className=" font-OpenSans font-bold text-white text-xl hover:cursor-pointer hover:text-white">
                            Click here to navigate!
                        </a></span>
                    </button>
                    <ButtonMovingBorder
                        borderRadius="0.3rem"
                        className="bg-deep-blue text-white border-neutral-200"
                        containerClassName={"p-[2px] w-60"}
                    >
                        <a href="/map"
                           className=" font-OpenSans font-bold text-white text-xl hover:cursor-pointer hover:text-white">
                            Click here to navigate!
                        </a>
                    </ButtonMovingBorder>

                    <div className={"pt-5"}>
                        <ShinyButton>
                            Click Here To Navigate!
                        </ShinyButton>
                    </div>
                </div>

            </div>

            <div className="pt-20 z-20">
                <AnimatedSVG/>
            </div>

            <div className="flex justify-center">
                <div
                    className="overflow-hidden bg-transparent shadow-md rounded-lg border-none hover:cursor-pointer hover:scale-105 transition-transform duration-300"
                    onMouseEnter={() => setIsHovered(false)}
                    onMouseLeave={() => setIsHovered(true)}>
                    <Carousel content={content} autoPlay={isHovered} interval={4000}/>
                </div>
            </div>
        </div>
    );


}

export default LoginPage;
