// Carousel.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection(1); // Move to the next image
            setCurrentIndex((currentIndex) => (currentIndex + 1) % images.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? '100%' : '-100%', // Slide from right or left
            opacity: 0,
            transition: { duration: 1.5, ease: 'easeInOut' } // Slower transition for smoothness
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            transition: { duration: 1.5, ease: 'easeInOut' }
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? '100%' : '-100%', // Exit to right or left
            opacity: 0, // Ensures that the image fades out smoothly
            transition: { duration: 1.5, ease: 'easeInOut' }
        }),
    };

    return (
        <div className="carousel-container relative overflow-hidden" style={{ width: '100%', height: '100%' }}>
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full h-full absolute object-cover"
                />
            </AnimatePresence>
        </div>
    );
};

export default Carousel;
