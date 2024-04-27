import {ReactNode} from "react";

export function NavLink(props: {href?: string, onClick?:(e: React.MouseEvent) => void, px: string, children: ReactNode}) {
    const handleClick = (e: React.MouseEvent) => {
        if (props.onClick) {
            e.preventDefault();
            props.onClick(e);
        }
    };

    return <div className={`${props.px}`}>
        <p className="py-1 relative group font-OpenSans items-center font-bold text-bone-white">
            <a href={props.href || '#'} onClick={handleClick} className="">{props.children}</a>
            <span
                className="absolute bottom-0 left-1/2 w-0 h-1 bg-gold-yellow transition-all group-hover:w-[calc(50%+16px)]"></span>
            <span
                className="absolute bottom-0 right-1/2 w-0 h-1 bg-gold-yellow transition-all group-hover:w-[calc(50%+16px)]"></span>
        </p>
    </div>;
}

NavLink.defaultProps ={
    px: "px-0"
};
