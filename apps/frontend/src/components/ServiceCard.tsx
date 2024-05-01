import {MouseEventHandler} from "react";
import Button from "@/components/buttons/Button.tsx";

function ServiceCard(props:{onClick:MouseEventHandler, icon: string, Request:string, description:string }) {
    return(
        <div className="w-1/4 h-1/2 centerContent">
            <Button onClick={props.onClick} color={"bg-bone-white"} rounded={"rounded-2xl"}>
                <div className="flex flex-col centerContent">
                    <img alt="ServiceCardImage" src={props.icon} className={"size-24"}></img>
                    <p className="text-2xl font-OpenSans font-bold text-black py-4 ">{props.Request}</p>
                    <p className="font-OpenSans text-black">{props.description}</p>
                </div>
            </Button>
        </div>


    );
}

export default ServiceCard;
