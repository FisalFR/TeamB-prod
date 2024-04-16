import React, { useState, useEffect } from 'react';

import {HandleLogin} from "./handleLogin.tsx";
const Carousel = ({ content, autoPlay, interval }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [, setDirection] = useState(0);

    useEffect(() => {
        if (autoPlay) {
            const timeout = setInterval(() => {
                setCurrentIndex((current) => (current + 1) % content.length);
            }, interval);
            return () => clearInterval(timeout);
        }
    }, [autoPlay, interval, content.length]);
    /* function arrowLeft(){

     }
     function arrowRight(){

     }*/
    const handleNext = () => {
        setDirection(currentIndex + 1);
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 === content.length ? 0 : prevIndex + 1
        );
    };

    const handlePrevious = () => {
        setDirection(currentIndex - 1);
        setCurrentIndex((prevIndex) =>
            prevIndex - 1 < 0 ? content.length - 1 : prevIndex - 1
        );
    };


    return (
        <div className="pr-2 relative w-full select-none">

            {content.map((item, index) => (
                <div onClick={HandleLogin({path: item.text.route})} key={index}
                     className={`flex items-center space-x-4 ${currentIndex === index ? 'flex' : 'hidden'}`}
                     style={{height: '100%'}}>
                    <img src={item.image.src} alt={item.image.alt} className="w-1/2 h-1/2 object-cover"/>
                    <div className="w-1/2 h-1/2 p-lg">
                        <h4 className="text-xl font-bold">{item.text.title}</h4>
                        <p>{item.text.description}</p>

                        <div className="">
                            <p onClick={HandleLogin({path: item.text.route})}
                               className="mt-4 hover:cursor-pointer text-deep-blue">
                                {item.text.callToAction}
                            </p>

                        </div>


                    </div>
                </div>

            ))}
            <div className={``}>

            </div>
            <button onClick={handlePrevious}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-black p-2 rounded-full hover:cursor-pointer">
                {"<"}</button>
            <button onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-black p-2 rounded-full hover:cursor-pointer">
                {">"}</button>
        </div>
    );
};

export default Carousel;
