import React, { useState, useEffect } from 'react';
import HandleLogin from "./handleLogin.tsx";

const Carousel = ({ content, autoPlay, interval }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (autoPlay) {
            const timeout = setInterval(() => {
                setCurrentIndex((current) => (current + 1) % content.length);
            }, interval);
            return () => clearInterval(timeout);
        }
    }, [autoPlay, interval, content.length]);

    return (
        <div className="pr-4 relative w-full select-none">
            {content.map((item, index) => (
                <div key={index} className={`flex items-center space-x-4 ${currentIndex === index ? 'flex' : 'hidden'}`} style={{ height: '100%' }}>
                    <img src={item.image.src} alt={item.image.alt} className="w-1/2 h-1/2 object-cover" />
                    <div className="w-1/2 h-1/2 p-lg">
                        <h4 className="text-xl font-bold">{item.text.title}</h4>
                        <p>{item.text.description}</p>

                            <p onClick={() => HandleLogin({path: item.text.route})}
                               className="mt-4 hover:cursor-pointer text-deep-blue">
                                {item.text.callToAction}
                            </p>
                    </div>
                </div>

            ))}
        </div>
    );
};

export default Carousel;
