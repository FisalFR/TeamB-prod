import {NavLink} from "./NavLink.tsx";
import bwhLogo from "../assets/bwh-logo-white.svg";
import NavDropDown from "../components/navDropDown.tsx";
import user_icon from "../assets/user_icon.svg";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {useEffect, useLayoutEffect, useState} from "react";
import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {motion} from "framer-motion"; // need Variants ?

export function NavigationBar() {
    const dropdownList = [
        ["/maintenance", "Maintenance"],
        ["/interpreter", "Interpreter"],
        ["/medicineRequest", "Medicine"],
        ["/sanitation", "Sanitation"],
        ["/security", "Security"],
        ["/giftDelivery", "Gift Delivery"],
    ];

    const adminDropdownList = [
        ["/database", "Database"],
        ["/csvManager", "CSV Manager"],
    ];

    const [showNavbar, setShowNavbar] = useState(false);

    const navbarVariants = {
        hidden: {
            y: "-100vh",
        },
        visible: {
            y: "0",
            transition: {
                type: "springy",
                delay: 0.5,
            },
        },
    };

    // Super-utility function Nick Leslie recommended I include
    // From https://akhilaariyachandra.com/blog/using-clsx-or-classnames-with-tailwind-merge
    // Uses the clsx (https://www.npmjs.com/package/clsx) and tailwind-merge (https://www.npmjs.com/package/tailwind-merge) packages
    function cn(...args: ClassValue[]) {
        return twMerge(clsx(args));
    }

    // Adapted from https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
    function useWindowHeight() {
        const [height, setHeight] = useState(0);
        useLayoutEffect(() => {
            function updateHeight() {
                setHeight(window.innerHeight);
            }

            window.addEventListener('resize', updateHeight);
            updateHeight();
            return () => window.removeEventListener('resize', updateHeight);
        }, []);
        return height;
    }

    const height = useWindowHeight();

    useEffect(() => {
        // TODO add pulltab that occupies the same space as the navbar's container
        const handleMouseMove = (e: MouseEvent) => {
            if (e.clientY < (0.1 * height)) { // Adjust the value based on how close to the top you want the hover to trigger
                setShowNavbar(true);
            } else {
                setShowNavbar(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [height]);

    return (
        <>
        <motion.div className={cn("navbar z-50 bg-deep-blue static h-14 top-0 left-0 grid w-full", showNavbar ? "visible" : "invisible")}
                    variants={navbarVariants}
                    initial={"hidden"}
                    animate={"visible"}
        >
            <img className="h-3/6 self-center px-4" src={bwhLogo}
                 alt="Brighams Logo White"></img>
            <nav className="uppercase divide-x divide-solid centerContent w-fit justify-self-center">

                <NavDropDown mainLink= {["Request"]} dropdownLinks={dropdownList}/>

                <div className="px-16">
                    <NavLink href="/map">Map</NavLink>
                </div>

                <NavDropDown mainLink={["", "Admin"]} dropdownLinks={adminDropdownList}></NavDropDown>
            </nav>
            <div className="self-center">
                <div className="float-end centerContent px-16">
                    <NavLink href="/"><div className="flex flex-row gap-2">
                        <img src={user_icon} alt="Username icon" height="20" width="20"/>LOGOUT</div></NavLink>
                </div>
            </div>
        </motion.div>
        </>
    );
}


export default NavigationBar;
