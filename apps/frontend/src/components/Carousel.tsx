import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(null);

    const slideVariants = {
        hiddenRight: {
            x: "100%",
            opacity: 0,
        },
        hiddenLeft: {
            x: "-100%",
            opacity: 0,
        },
        visible: {
            x: "0",
            opacity: 1,
            transition: {
                duration: 1,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.5,
            },
        },
    };

    const slidersVariants = {
        hover: {
            scale: 1.2,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
        },
    };

    const dotsVariants = {
        initial: {
            y: 0,
        },
        animate: {
            y: -10,
            scale: 1.2,
            transition: { type: "spring", stiffness: 1000, damping: 10 },
        },
        hover: {
            scale: 1.1,
            transition: { duration: 0.2 },
        },
    };

    const handleNext = () => {
        setDirection("right");
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 === images.length ? 0 : prevIndex + 1
        );
    };

    const handlePrevious = () => {
        setDirection("left");
        setCurrentIndex((prevIndex) =>
            prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleDotClick = (index) => {
        setDirection(index > currentIndex ? "right" : "left");
        setCurrentIndex(index);
    };

    return (
        <div className="relative max-w-lg mx-auto overflow-hidden rounded-lg">
            <div className="relative w-full h-full">
                <AnimatePresence>
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
                        animate="visible"
                        exit="exit"
                        variants={slideVariants}
                        className="w-full h-full object-cover"
                    />
                </AnimatePresence>
                <div className="absolute inset-0 flex justify-between items-end pb-10">
                    <motion.div
                        variants={slidersVariants}
                        whileHover="hover"
                        className="text-white p-2 rounded-full cursor-pointer left-4"
                        onClick={handlePrevious}
                    >
                        {/* SVG for left arrow */}
                    </motion.div>
                    <motion.div
                        variants={slidersVariants}
                        whileHover="hover"
                        className="text-white p-2 rounded-full cursor-pointer right-4"
                        onClick={handleNext}
                    >
                        {/* SVG for right arrow */}
                    </motion.div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-5 py-2 bg-black bg-opacity-50">
                {images.map((_, index) => (
                    <motion.div
                        key={index}
                        className={`dot w-4 h-4 rounded-full cursor-pointer ${currentIndex === index ? "bg-gray-800" : "bg-gray-300"}`}
                        onClick={() => handleDotClick(index)}
                        initial="initial"
                        animate={currentIndex === index ? "animate" : ""}
                        whileHover="hover"
                        variants={dotsVariants}
                    ></motion.div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
