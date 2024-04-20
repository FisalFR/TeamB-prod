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
        <div className="w-full h-full select-none bg-opacity-30 bg-black rounded  ">
            {content.map((item, index) => (
                <div key={index}
                     className={`flex justify-center items-center space-x-4 ${currentIndex === index ? 'flex' : 'hidden'}`}
                     style={{ height: '100%' }}
                     onClick={() => loginGuest({ path: item.text.route })}>
                    <div className="">
                        <h4 className="py-3 text-xl font-bold text-white underline">
                            <span className="outlined-text">{item.text.title}</span>
                        </h4>
                        <p className="text-white text-left font-Colfax pl-10">
                            <p className="outlined-text ">{item.text.description}</p>
                        </p>
                        <p className="mt-4 pb-3 hover:cursor-pointer text-white font-bold"
                           onClick={(e) => {
                               e.stopPropagation(); // Prevents triggering the outer div's onClick
                               loginGuest({ path: item.text.route });
                           }}>
                            <span className=" outlined-text">{item.text.callToAction}</span>
                        </p>
                    </div>
                    <img src={item.image.src} alt={item.image.alt} className=" deep object-cover rounded" />
                </div>
            ))}
        </div>
    );


};

export default Carousel;
