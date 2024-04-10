import * as React from "react";
import {AnimatePresence, motion, useAnimation} from "framer-motion";
import {useEffect, useState} from "react";


const icon = {
    hidden: {
        opacity: 1,
        pathLength: 0,
    },
    visible: {
        opacity: 1,
        pathLength: 1,
        transition: {
            duration: 5,
            ease: "linear",
        },
    },
    hidePost: {
        opacity: 0,
        transition: {
            duration: 2,
            ease: "easeInOut",
        },
    },
};

export const MazeLineComponent = () => {
    const controls = useAnimation();
    const [loopCount, setLoopCount] = useState(0);

    useEffect(() => {
        const loopAnimation = async () => {
            while (loopCount < 50) {
                await controls.start("visible");
                await controls.start("hidePost");
                await controls.set("hidden");
                setLoopCount(loopCount + 1);
            }
        };

        loopAnimation();

        return () => {
            // Clean up if necessary
        };
    }, [controls, loopCount]);

    return (
            <AnimatePresence>
                <svg
                    className="p-3 object-cover"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 930 930"
                    key="svg"
                >
                    <defs>
                        <style>
                            {
                                ".cls-1 {\r\n        fill: none;\r\n        stroke: #009ca6;\r\n        stroke-miterlimit: 10;\r\n        stroke-width: 8px;\r\n      }"
                            }
                        </style>
                        <style>{".cls-2{fill:#012d5a;stroke-width:0}"}</style>
                    </defs>
                    <g>
                        <path className="cls-2"
                              stroke = "#009ca6"
                              d="m54.03,449.37h46.76c-.32,6.25-.48,12.54-.48,18.87,0,103.2,43.09,196.52,112.2,262.94l3.3-3.3h0s42.49-42.49,42.49-42.49c53.87,51.34,126.69,82.94,206.8,82.94,155.67,0,284-119.16,298.67-271.05h-65.12c1.18-9.53,1.86-19.21,1.86-29.05,0-115.07-83.01-211.05-192.28-231.38v18.25c99.3,20.06,174.31,108,174.31,213.12,0,119.89-97.54,217.44-217.44,217.44-58.79,0-112.18-23.49-151.35-61.54l33.01-33.01c30.71,29.59,72.43,47.83,118.34,47.83,94.13,0,170.71-76.58,170.71-170.71,0-13.61-1.65-26.84-4.67-39.53h-18.52c3.38,12.62,5.22,25.86,5.22,39.53,0,72.48-50.77,133.29-118.6,148.85v-48.48c41.76-14.24,71.88-53.85,71.88-100.37,0-42.41-25.04-79.06-61.1-96v20.31c25.8,15.37,43.13,43.54,43.13,75.69,0,43.03-31.03,78.92-71.88,86.54v65.34c-5.32.56-10.71.86-16.17.86-47.42,0-89.85-21.72-117.89-55.73l-3.54,3.54-42.29,42.29c-33.41-38.24-53.72-88.2-53.72-142.85,0-2.31.1-4.6.17-6.89h-17.97c-.07,2.29-.17,4.58-.17,6.89,0,129.8,105.6,235.41,235.41,235.41,113.71,0,208.83-81.03,230.68-188.38h47.45c-22.46,133.25-138.59,235.11-278.13,235.11-81.6,0-155.19-34.86-206.75-90.43l-2.72,2.72h0s-43.05,43.05-43.05,43.05c-58.43-62.1-94.29-145.67-94.29-237.46s35.92-175.5,94.44-237.62l33.1,33.1c-50.07,53.63-80.82,125.53-80.82,204.52,0,65.96,21.44,126.98,57.65,176.57l12.88-12.88c-33.04-46.2-52.56-102.69-52.56-163.69,0-80.49,33.93-153.15,88.18-204.6l-7.21-7.21-5.49-5.49-33.09-33.09c62.33-59.7,146.82-96.43,239.73-96.43s169.95,33.58,231.38,88.7l12.72-12.72c-62.62-56.49-144.85-91.64-235.12-93.84V38.87c-2.99-.06-5.98-.11-8.98-.11-230.49,0-419.13,182.52-429.04,410.61h17.98ZM456.1,56.84v46.72c-184.65,4.49-335.72,146.86-353.95,327.84h-46.89C73.69,224.63,245.68,61.37,456.1,56.84Z"/>
                        <path className="cls-2"
                              stroke = "#009ca6"
                              d="m510.01,41.1v18.09c101.49,11.07,191.99,59.2,257.69,130.52l-33.03,33.03h0l-12.71,12.71c50.64,55.83,83.29,128.21,88.97,207.92h-46.92c-12.69-153.87-141.83-275.24-298.92-275.24-67.09,0-129.1,22.14-179.14,59.48l12.88,12.88c43.95-32.17,97.49-51.97,155.48-54.17v46.75c-110.34,5-201.08,86.35-220.65,192.33h66.16c-3.55,13.69-5.45,28.04-5.45,42.83,0,28.64,7.12,55.64,19.64,79.37l13.35-13.35c-9.62-19.99-15.02-42.39-15.02-66.02,0-81.21,63.7-147.79,143.76-152.46v46.84c-54.27,4.58-97.04,50.18-97.04,105.61,0,51.71,37.21,94.86,86.26,104.15v-18.36c-39.06-9-68.29-44.03-68.29-85.79,0-48.55,39.5-88.05,88.05-88.05,3.03,0,6.03.15,8.98.45v-64.84c53.15,3.1,99.08,33.49,123.95,77.35v-.39h20.14c-27.91-56.37-86.02-95.24-153.07-95.24-72.72,0-134.93,45.72-159.48,109.92h-49.27c26.37-90.39,109.96-156.64,208.76-156.64,2.41,0,4.8.1,7.19.18v-64.69c149.95,3.78,271.14,125.07,274.76,275.06h64.7c.04,2.3.16,4.58.16,6.89,0,191.24-155.58,346.82-346.82,346.82-80.06,0-153.86-27.28-212.62-73.02l-12.8,12.8c60.12,47.38,135.45,76.22,217.34,78.01v46.8c-217.49-4.22-394.17-178-403.04-394.34h-17.98c9,228.93,198.01,412.41,429.11,412.41s429.48-192.66,429.48-429.48c0-221.65-168.77-404.6-384.56-427.14Zm-35.04,838.52v-46.73c196.59-5.26,354.91-166.81,354.91-364.65,0-87.99-31.33-168.8-83.41-231.88l33.15-33.15c60.47,71.65,96.99,164.14,96.99,265.02,0,223.6-179.27,406.12-401.63,411.39Z"/>
                    </g>
                    <motion.path
                        className="cls-1"
                        d="m10.9,467.55l62.44.91c.26,36.04,5.6,103.08,42.56,175.89,29.51,58.12,67.39,96.7,92.77,118.78,14.42-16.34,28.84-32.69,43.26-49.03,98.7,81.88,235.68,99.84,350.42,45.98,108.7-51.03,180.95-158.77,187.95-279.85-21.77-.72-43.54-1.43-65.31-2.15.77-16.33,3.7-112.76-71.21-189.45-63.53-65.05-141.58-73.42-161.8-74.98v64.49c15.11,1.13,56.98,6.24,96.44,38.35,40.62,33.05,53.89,74.53,57.82,89.01-20.98,1.09-41.96,2.17-62.94,3.26-5.41-10.33-16.17-27.62-35.59-42.98-21.46-16.97-42.99-23.3-54.67-25.85.71,42.18,1.41,84.36,2.12,126.54h-31.62v134.77c-11.46-.05-37.46-1.69-64.77-17.95-26.52-15.79-40.25-37.03-45.88-47.01-17.02,14.62-34.03,29.24-51.05,43.86-8.48-14.78-18.49-35.73-25.23-62.22-7.32-28.78-8.18-53.83-7.42-71.66h-60.67c2.29-22.38,8.44-56.16,26.3-93.35,19.94-41.54,45.89-69.43,63.22-85.4-13.99-14.37-27.98-28.75-41.97-43.12,19.6-16.64,98.53-79.71,216.62-78.28,124.92,1.51,205.08,74.14,222.62,90.84,15.4-14.31,30.79-28.62,46.19-42.92-23.34-23.38-62.65-57.07-119.46-82.9-51.76-23.53-98.51-31.65-130.06-34.62V15.39"
                        initial="hidden"
                        animate={controls}
                        exit="hidden"
                        variants={icon}
                    />
                </svg>
            </AnimatePresence>
    );
};

export default MazeLineComponent;



