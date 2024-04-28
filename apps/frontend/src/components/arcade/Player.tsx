
import rosePNG from "../../assets/arcade/rose.png";
import stem1PNG from "../../assets/arcade/stem1.png";
import stem2PNG from "../../assets/arcade/stem2.png";
import tulipPNG from "@/assets/arcade/tulip.png";

function Player(props:{xpos: number; ypos: number;
    vase: { hasVase: boolean, flowers: string[] }}) {

    function createFlower(flower: string, position: number) {
        let petals;
        let flowerPos = {};
        if (flower == "Rose") {
            petals = rosePNG;
        }
        else {
            petals = tulipPNG;
        }
        let branch;
        if ((position == 0) || (position == 3)) {
            branch = stem1PNG;
        }
        else {
            branch = stem2PNG;
        }
        let branchPos = {};
        if (position > 1) {
            branchPos = {transform: "scaleX(-1)"};
            flowerPos = {transform: "scaleX(-1)"};
        }
        switch(position) {
            case 0:
                flowerPos = {
                    left: "-48px",
                    bottom: "152px",
                    transform: "scaleX(1) rotate(-60deg)"
                };
                break;
            case 1:
                flowerPos = {
                    left: "-19px",
                    bottom: "168px",
                    transform: "scaleX(1) rotate(-20deg)"
                };
                break;
            case 2:
                flowerPos = {
                    left: "19px",
                    bottom: "168px",
                    transform: "scaleX(-1) rotate(-20deg)"
                };
                break;
            case 3:
                flowerPos = {
                    left: "48px",
                    bottom: "152px",
                    transform: "scaleX(-1) rotate(-60deg)"
                };
                break;
        }
        return (
            <>
                <img src={branch} className="absolute bottom-[115px] right-[-40px] max-w-[200px]" width = {120} style={branchPos}></img>
                <img src={petals} className="absolute max-w-[200px]" width={40} style={flowerPos}></img>
            </>
        );

    }

    function createFlowers() {
        return props.vase.flowers.map((flower, index) =>
            createFlower(flower, index)
        );
    }
    function createVase() {
        if (props.vase.hasVase) {
            return (
                <>
                    {createFlowers()}
                </>
            );
        }
    }

    return(
        <>
            <div className="absolute flex flex-col-reverse" style = {{left: props.xpos + "px", top: props.ypos + "px"}}>
                <div className="w-[40px] h-[40px] bg-black"></div>
                {createVase()}
            </div>
        </>
    );
}

export default Player;
