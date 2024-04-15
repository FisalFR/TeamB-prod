//import Button from "../components/Button.tsx";
import AnimatedSVG from "../components/HeroImage.tsx";

import React from 'react';
import Carousel from "../components/Carousel";
import image1 from '../assets/Carousel/car.jpg';
import image2 from '../assets/Carousel/hill.jpg';
import image3 from '../assets/Carousel/lightbulb.jpg';

export function LoginPage() {
    const content = [
        {
            image: { src: image1, alt: 'Description of image 1' },
            text: {
                title: "Navigate Seamlessly",
                description: "Find your room in Brigham & Women's with ease. With pathfinding locate your destination in the smallest steps. Never get lost, no wasted time, get there stress free.",
                callToAction: "Click here to navigate!"
            }
        },
        {
            image: { src: image2, alt: 'Description of image 2' },
            text: {
                title: "New Security Features",
                description: "Need help getting to your car? Somebody bothering you at the hospital? Submit a Security Service Request we can assist you.",
                callToAction: "Explore security services!"
            }
        },
        {
            image: { src: image3, alt: 'Description of image 3' },
            text: {
                title: "Efficient Parking",
                description: "Use our app to find parking spots quickly without the hassle. Save time and enjoy your visit without any parking troubles.",
                callToAction: "Learn more about parking!"
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
                        <h1 className="font-bold font-HeadlandOne text-6xl text-deep-blue-900 mb-2">Navigate Seamlessly</h1>
                        <p className="text-xl hover:cursor-pointer hover:text-deep-blue-500 hover:font-bold transition duration-300 ease-in-out">Click here to navigate!</p>
                    </div>
                    <div className="flex justify-center">
                        <div className="bg-white outline-1 shadow-md rounded-lg border border-deep-blue-900 hover:scale-105 transition-transform duration-300">
                            <Carousel content={content} autoPlay={true} interval={10000} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );





}

export default LoginPage;
