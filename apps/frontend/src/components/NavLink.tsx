import {ReactNode} from "react";

export function NavLink(props: {href: string, children: ReactNode}) {
    return <div className="">
        <p className="py-1 relative group font-OpenSans items-center font-bold text-bone-white">
            <a href={props.href} className="">{props.children}</a>
            <span
                className="absolute bottom-0 left-1/2 w-0 h-1 bg-gold-yellow transition-all group-hover:w-[calc(50%+16px)]"></span>
            <span
                className="absolute bottom-0 right-1/2 w-0 h-1 bg-gold-yellow transition-all group-hover:w-[calc(50%+16px)]"></span>
        </p>
    </div>;
}
