//import Button from "../components/Button.tsx";
import AnimatedSVG from "../components/HeroImage.tsx";

import example from "../assets/security.jpg";
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
        <div className="centerContent pt-14">
            <AnimatedSVG/>

                <div className="pl-20 w-1/2">



                    <div className=' w-full pl-31 flex flex-col'>
                        <h1 className="px-5 font-bold text-left font-HeadlandOne text-6xl ">Navigate Seamlessly</h1>
                        <div className="flex flex-col w-full">

                            <p className=" text-left object-right float-right text-xl p-5 pb-9">
                                Find your room in Brigham & Women's with ease. With pathfinding locate your
                                destination in the smallest steps. Never get lost, no wasted time, get there stress
                                free.
                            </p>
                            <a href={"/map"}  className=" hover:animate-none text-xl hover:cursor-pointer hover:text-deep-blue hover:font-bold pb-5" >
                              Click here to navigate!</a>


                        </div>
                        <div
                            className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4 md:flex">
                            <div className="md:shrink-0 md:w-1/2 md:order-1">
                                <img className="h-48 w-full object-cover md:h-full md:w-full rounded-t-xl"
                                     src={example} alt="Lion Dance at pan asian festival 2023"></img>
                            </div>
                            <div className="p-8 md:w-1/2 md:order-2">
                                <h4 className="block mt-4 text-lg leading-tight font-medium text-black">New
                                    Feature:</h4>
                                <h4 className="text-lg leading-tight font-medium text-black">Security Services</h4>
                                <p className="mt-2 text-slate-500">Need help getting to your car?
                                    Somebody bothering you at the hospital?
                                    Submit a Security Service Request we can assist you.</p>
                            </div>
                        </div>


                    </div>
                </div>
        <div className="animate-fade-in centerContent pt-4 bg-deep-blue-900 min-h-screen">
            <AnimatedSVG />
            <div className='w-full flex flex-col items-center'>
                <div className="text-center p-0 rounded w-full max-w-4xl mx-auto animate-scale-in-ver-top">
                    <h1 className="font-bold font-HeadlandOne text-6xl text-deep-blue-900 mb-2">Navigate Seamlessly</h1>
                    <p className="text-xl hover:cursor-pointer hover:text-deep-blue-500 hover:font-bold transition duration-300 ease-in-out">Click here to navigate!</p>
                </div>
                <div className="w-full flex justify-center mt-5">
                    <div className="bg-white p-0 outline-1 shadow-md rounded-lg border-2 border-deep-blue-900 max-w-4xl hover:scale-105 transition-transform duration-300">
                        <Carousel content={content} autoPlay={true} interval={3000} />
                    </div>
                </div>
            </div>
        </div>
        </div>
    );

}

export default LoginPage;
