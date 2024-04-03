import React, {ReactNode} from "react";

function Button(props:{onClick:(e: React.MouseEvent) => void, children: ReactNode}) {
    return(
        <button className={"px-5 py-2 bg-deep-blue font-bold text-white w-fit rounded"} onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default Button;
