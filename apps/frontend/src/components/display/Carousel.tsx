import React, { useState, useEffect } from 'react';
import HandleLogin from "../authentication/HandleLogin.tsx";
import { motion } from 'framer-motion';
import {useAuth0} from "@auth0/auth0-react";

const Carousel = ({ content, autoPlay, interval }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const {isAuthenticated,isLoading} = useAuth0();

    useEffect(() => {
        if (autoPlay) {
            const timeout = setInterval(() => {
                setCurrentIndex((current) => (current + 1) % content.length);
            }, interval);
            return () => clearInterval(timeout);
        }
    }, [autoPlay, interval, content.length]);

    function LoginGuest(props:{path:string}){
        if((props.path) === ("/map")){
            return window.location.href = `${window.location.origin.concat('/map')}`;
        }
        else{
            return HandleLogin({path:props.path,auth:isAuthenticated,load:isLoading});
        }
    }
    return (
        <div className="bg-opacity-35 bg-black rounded w-fit">
            {content.map((item, index) => (
                <div key={index}
                     className={`${currentIndex === index ? ' flex flex-auto' : 'hidden '}`}
                     // style={{height: '100%'}}
                     onClick={() => LoginGuest({path: item.text.route})}>
                    <div className="w-[400px] p-2">
                        <h4 className="font-semibold text-white text-2xl">
                            <span className="outlined-text">{item.text.title}</span>
                        </h4>
                        <p className="outlined-text text-center text-white font-extralight text-xl">
                            {item.text.description}
                        </p>
                    </div>
                    <motion.img src={item.image.src} alt={item.image.alt} animate={{scale: [0.92, 0.95]}}
                                className={"size-40 pr-2"}
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
