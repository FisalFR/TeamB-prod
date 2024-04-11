import React, { useState } from 'react';
import darkOnSide from "../common/darkOnSide.tsx";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function DarkLightSwitcher() {
    const [colorTheme, setColorTheme] = darkOnSide();
    const [darkSide, setDarkSide] = useState(colorTheme === "light");

    const toggleDarkMode = checked => {
        setColorTheme(colorTheme);
        setDarkSide(checked);
    };
//Test
    return (
        <>
            <div>
                <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} size={50} />
            </div>
        </>
    );

}
