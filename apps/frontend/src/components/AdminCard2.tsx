import {MouseEventHandler} from "react";


function AdminCard2(props:{onClick:MouseEventHandler,Image:ImageAnnotations, Title:string, Description:string} ){
    return(
        <div onClick={props.onClick} className="flex">

            <div className="flex flex-col w-1/3 bg-bone-white centerContent">
                <h1 className="text-3xl font-OpenSans font-bold py-4">{props.Title}</h1>
                <p className="font-OpenSans">{props.Description}</p>
            </div>
            <img src={props.Image} className="w-2/3"/>
        </div>
    );
}

export default AdminCard2;
