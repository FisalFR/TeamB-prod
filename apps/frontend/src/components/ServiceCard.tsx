function ServiceCard(props:{icon:ImageAnnotations, Request:string, }) {
    return(
        <button className="flex flex-row w-1/3 h-1/4  bg-bone-white rounded-2xl relative drop-shadow-2xl">
            <div>
                <img src={props.icon} className={"size-40"}></img>
            </div>
            <div className="justify-items-center align-middle h-1/4">
                <p className=" flex text-3xl font-OpenSans font-bold py-4 ">{props.Request}</p>
            </div>

        </button>
    );
}

export default ServiceCard;
