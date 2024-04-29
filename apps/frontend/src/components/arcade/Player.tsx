
import playerPNG from "../../assets/arcade/logo.png";

function Player(props:{xpos: number; ypos: number;
    vase: { hasVase: boolean, flowers: string[] }}) {

    return(
        <>
            <div className="absolute flex z-[4] flex-col-reverse" style = {{left: props.xpos + "px", top: props.ypos + "px"}}>
                <img alt = "player" src={playerPNG} width = {50} className="min-w-[50px]"></img>
            </div>
        </>
    );
}

export default Player;
