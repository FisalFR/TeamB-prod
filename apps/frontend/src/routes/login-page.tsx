import AnimatedSVG from "../components/display/HeroImage.tsx";

import React, {useState} from 'react';
import Carousel from "../components/display/Carousel.tsx";
import image1 from '../assets/Carousel/gift.svg';
import image2 from '../assets/Carousel/language.svg';
import image3 from '../assets/Carousel/security.svg';
import image4 from '../assets/Carousel/map.svg';
import background from '../assets/Hero_Image/brighams_hero.jpg';
import {useEffect} from "react";

import {ButtonMovingBorder} from "../components/aceternity/MovingBorder.tsx";

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
                callToAction: "Click here to explore the map!",
                route: "/map"
            }
        },
        {
            image: { src: image1, alt: 'Description of image 2' },
            text: {
                title: "Gift Delivery",
                description: "We're excited to introduce our new Gift Delivery Service—now you can send thoughtful presents directly to your loved ones in the hospital!",
                callToAction: "Click here to make a gift request!",
                route: "/giftdelivery"
            }
        },
        {
            image: { src: image2, alt: 'Description of image 3' },
            text: {
                title: "Interpreter Request",
                description: "We are thrilled to launch our new Interpreter Request Feature—making language assistance easily accessible directly through our website!",
                callToAction: "Click here to request an interpreter!",
                route: "/interpreter",
            }
        },
        {
            image: { src: image3, alt: 'Description of image 4' },
            text: {
                title: "Security Request",
                description: "We're pleased to announce our enhanced Security Request Feature—allowing you to request assistance at anytime through our website.",
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
        <div className="z-0 top-0 left-0 h-full grid grid-cols-[800px_minMax(100px,_1fr)] content-center" style={style}>

            <div className="relative m-auto text-center h-screen centerContent rounded mx-auto animate-scale-in-ver-top flex-col w-10/12">

                <p className={"absolute top-5 font-OpenSans text-white font-extralight"}>
                    This website is a term project exercise for WPI CS 3733 Software
                    Engineering (Prof. Wong) and is not to be confused with the actual Brigham & Women’s Hospital website.
                </p>
                <h1 className="font-OpenSans  font-bold text text-white text-center mb-2 text-7xl text-nowrap "
                >Navigate Seamlessly</h1>
                <p className="  text-center text-2xl font-light text-white"
                >
                    Find your room in Brigham & Women's Hospital with ease.

                </p>
                <div className={"flex flex-col gap-10 centerContent pt-5"}>

                    <div onClick={() => window.location.href = '/map'}>
                        <ButtonMovingBorder
                            borderRadius="0.3rem"
                            className=" text-white bg-deep-blue border-neutral-200 border-2"
                            containerClassName={"p-[3px] w-[500px]"}
                        >
                            <a href="/map"
                               className=" font-OpenSans font-bold text-white text-xl hover:cursor-pointer hover:text-white">
                                Click Here To Navigate!
                            </a>
                        </ButtonMovingBorder>
                    </div>
                    <div
                        className="  hover:cursor-pointer hover:scale-105 transition-transform duration-300"
                        onMouseEnter={() => setIsHovered(false)}
                        onMouseLeave={() => setIsHovered(true)}>
                        <Carousel content={content} autoPlay={isHovered} interval={4000}/>
                    </div>


                </div>

            </div>

            <div className=" z-20">
                <AnimatedSVG/>
            </div>


        </div>
    );


}

export default LoginPage;
