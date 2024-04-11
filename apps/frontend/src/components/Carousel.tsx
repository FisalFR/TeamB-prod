// Carousel.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection(1); // Always move to the next image
            setCurrentIndex(currentIndex => (currentIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 1,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 1,
        }),
    };

    return (
        <div className="carousel-container relative overflow-hidden" style={{ width: '100%', height: '500px' }}>
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: 'spring', stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    className="w-full h-full absolute object-cover"
                />
            </AnimatePresence>
        </div>
    );
};

export default Carousel;
