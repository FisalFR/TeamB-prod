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

    function loginGuest(props:{path:string}){
        if((props.path) === ("/map")){
           return window.location.href = `${window.location.origin.concat('/map')}`;
        }
        else{
            return HandleLogin({path:props.path});
        }
    }
    return (
        <div className="pr-4 relative w-full select-none bg-transparent">
            {content.map((item, index) => (
                <div key={index}
                     className={`flex items-center space-x-4 ${currentIndex === index ? 'flex' : 'hidden'}`}
                     style={{ height: '100%' }}
                     onClick={() => loginGuest({ path: item.text.route })}>
                    <div className="w-1/2">
                        <h4 className="text-xl font-bold text-black">
                            <span className="outlined-text">{item.text.title}</span>
                        </h4>
                        <p className="text-black">
                            <span className="outlined-text">{item.text.description}</span>
                        </p>
                        <p className="mt-4 hover:cursor-pointer text-deep-blue font-bold"
                           onClick={(e) => {
                               e.stopPropagation(); // Prevents triggering the outer div's onClick
                               loginGuest({ path: item.text.route });
                           }}>
                            <span className="outlined-text">{item.text.callToAction}</span>
                        </p>
                    </div>
                    <img src={item.image.src} alt={item.image.alt} className="w-1/2 deep object-cover" />
                </div>
            ))}
        </div>
    );


};

export default Carousel;
