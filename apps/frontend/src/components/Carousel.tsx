import React, { useState, useEffect } from 'react';
import HandleLogin from "./handleLogin.tsx";
import { motion } from 'framer-motion';

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
        <div className="bg-opacity-35 bg-black rounded w-fit">
            {content.map((item, index) => (
                <div key={index}
                     className={`${currentIndex === index ? 'w-fit flex flex-row' : 'hidden'}`}
                     style={{height: '100%'}}
                     onClick={() => loginGuest({path: item.text.route})}>
                    <div className="flex flex-col w-5/12">
                        <h4 className="text-xl font-semibold text-white">
                            <span className="outlined-text">{item.text.title}</span>
                        </h4>
                        <p className="outlined-text text-center text-white font-extralight text-balance">
                            {item.text.description}
                        </p>
                    </div>
                    <motion.img src={item.image.src} alt={item.image.alt} animate={{scale: [0.92, 0.95]}}
                                className={"size-32 pr-2"}
                                transition={{
                                    duration: 0.4,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                }}/>

                </div>
            ))}
        </div>
    );


};

export default Carousel;
