import React, {ReactNode} from "react";

function LongButton(props:{onClick:(e: React.MouseEvent) => void, children: ReactNode}) {
    return(
        <button className={"px-32 py-2 bg-deep-blue font-bold text-white w-fit rounded"} onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default LongButton;
