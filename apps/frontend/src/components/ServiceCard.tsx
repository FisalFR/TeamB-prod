import {MouseEventHandler} from "react";

function ServiceCard(props:{onClick:MouseEventHandler, icon:ImageAnnotations, Request:string, description:string }) {
    return(
        <button onClick={props.onClick} className="flex flex-col w-1/5 h-1/2
         centerContent bg-bone-white rounded-2xl drop-shadow-2xl">
                <img src={props.icon} className={"size-24"}></img>
                <p className="text-2xl font-OpenSans font-bold py-4 ">{props.Request}</p>
                <p className="font-OpenSans">{props.description}</p>

        </button>
    );
}

export default ServiceCard;
