
import playerPNG from "../../assets/arcade/logo.png";

function Player(props:{xpos: number; ypos: number;
    vase: { hasVase: boolean, flowers: string[] }}) {

    return(
        <>
            <div className="absolute flex z-20 flex-col-reverse" style = {{left: props.xpos + "px", top: props.ypos + "px"}}>
                <img src={playerPNG} width = {50} className="min-w-[50px]"></img>
            </div>
        </>
    );
}

export default Player;
