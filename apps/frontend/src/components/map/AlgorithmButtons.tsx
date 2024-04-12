import React, { ReactNode } from 'react';

export function AlgorithmButtons(props: {href?: string, onClick?:(e: React.MouseEvent) => void, px: string, children?: ReactNode, isActive: boolean}) {
    const handleClick = (e: React.MouseEvent) => {
        if (props.onClick) {
            e.preventDefault();
            props.onClick(e);
        }
    };

    const activeClass = "w-[calc(50%+16px)] h-1 bg-gold-yellow transition-all";
    const inactiveClass = "w-0 h-1 bg-white transition-all group-hover:w-[calc(50%+16px)]";

    return <div className={`${props.px}`}>
        <p className="py-1 relative group font-OpenSans items-center font-bold text-bone-white ">
            <a href={props.href || '#'} onClick={handleClick} className="flex flex-row">{props.children}</a>
            <span className={`absolute bottom-0 left-1/2 ${props.isActive ? activeClass : inactiveClass}`}></span>
            <span className={`absolute bottom-0 right-1/2 ${props.isActive ? activeClass : inactiveClass}`}></span>
        </p>
    </div>;
}
