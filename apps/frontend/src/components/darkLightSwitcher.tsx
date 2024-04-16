import React, { useState } from 'react';
import useDarkOnSide from "../common/darkOnSide.tsx";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function DarkLightSwitcher() {
    const colorThemeHook = useDarkOnSide();
    const [darkSide, setDarkSide] = useState(colorThemeHook.colorTheme === "light");

    const toggleDarkMode = (checked:boolean) => {
        colorThemeHook.setTheme(colorThemeHook.colorTheme);
        setDarkSide(checked);
    };
//Test
    return (
        <>
            <div>
                <DarkModeSwitch moonColor="black" sunColor="white" checked={darkSide} onChange={toggleDarkMode} size={30} />
            </div>
        </>
    );

}
