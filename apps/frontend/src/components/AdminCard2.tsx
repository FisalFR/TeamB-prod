import {MouseEventHandler} from "react";
import Button from "@/components/buttons/Button.tsx";


function AdminCard2(props:{onClick:MouseEventHandler,Image:ImageAnnotations, Title:string, Description:string} ){
    return(
        <Button onClick={props.onClick} color={"bg-bone-white"}>
            <div onClick={props.onClick} className="flex">
                <div className="flex flex-col w-1/3 bg-bone-white centerContent">
                    <h1 className="text-3xl font-OpenSans font-bold text-black py-4">{props.Title}</h1>
                    <p className="font-OpenSans text-black">{props.Description}</p>
                </div>
                <img src={props.Image} className="w-2/3"/>
            </div>
        </Button>

    );
}

export default AdminCard2;
