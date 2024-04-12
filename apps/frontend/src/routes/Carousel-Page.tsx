import React from 'react';
import Carousel from "../components/Carousel"; // Ensure Carousel is set up for image objects and animation
import image1 from '../assets/Carousel/car.jpg'; // Adjust paths as necessary
import image2 from '../assets/Carousel/hill.jpg';
import image3 from '../assets/Carousel/lightbulb.jpg';

export function LoginPage() {
    const images = [
        { src: image1, alt: 'Description of image 1' },
        { src: image2, alt: 'Description of image 2' },
        { src: image3, alt: 'Description of image 3' },
    ];

    return (
        <div className="min-h-4xl bg-gray-10 flex items-center justify-center p-2">
            <Carousel images={images} autoPlay={true} interval={3000} />
        </div>
    );
}

export default LoginPage;
