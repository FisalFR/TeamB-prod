import React from 'react';
//import Carousel from "../components/Carousel"; // Ensure Carousel is set up for image objects and animation
// import image1 from '../assets/Carousel/car.jpg'; // Adjust paths as necessary
// import image2 from '../assets/Carousel/hill.jpg';
// import image3 from '../assets/Carousel/lightbulb.jpg';

export function LoginPage() {
    // Example dummy content to test the carousel
    const dummyContent = [
        {
            image: { src: "https://via.placeholder.com/150", alt: "Placeholder Image" },
            text: {
                title: "Slide One",
                description: "This is the first slide",
                callToAction: "Learn More"
            }
        },
        {
            image: { src: "https://via.placeholder.com/150", alt: "Placeholder Image" },
            text: {
                title: "Slide Two",
                description: "This is the second slide",
                callToAction: "Discover More"
            }
        }
    ];



    return (
        <div className="relative w-3/4 h-64 mx-auto select-none overflow-hidden"> {/* Adjusted for a smaller and centered carousel */}
            {dummyContent.map((item, index) => ( // Use dummyContent for testing
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
                    style={{ width: '100%', height: '100%' }}
                >
                    <div className="flex items-center space-x-4 w-full h-full">
                        <img src={item.image.src} alt={item.image.alt} className="w-1/2 h-full object-cover" /> {/* Adjusted image to fill height */}
                        <div className="w-1/2 h-full p-lg flex flex-col justify-center"> {/* Use flex column for text layout */}
                            <h4 className="text-xl font-bold">{item.text.title}</h4>
                            <p>{item.text.description}</p>
                            <button className="mt-4 text-blue-500 bg-origin-padding">
                                {item.text.callToAction}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

}

export default LoginPage;
