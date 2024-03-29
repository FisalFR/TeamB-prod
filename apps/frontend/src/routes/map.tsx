import ll1map from "../assets/floors/00_thelowerlevel1.png";

export function Map(){
    return (
        <div>
            <p className="font-HeadlandOne text-3xl py-3">Floor: Lower Level 1</p>
            <img className="drop-shadow-md" src={ll1map} alt= "Lower Level One"></img>
        </div>
    );
}

export default Map;
