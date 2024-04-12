import React from 'react';
import Carousel from "../components/Carousel";
import AnimatedSVG from "../components/HeroImage";
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
    );
}

export default LoginPage;
