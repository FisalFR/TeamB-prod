import {useEffect, useRef} from "react";
import HoverDivs from "@/components/arcade/HoverDivs.tsx";
import ArcadeButton from "@/components/arcade/ArcadeButton.tsx";
import tulipPNG from "../../assets/arcade/tulip.png";
import rosePNG from "../../assets/arcade/rose.png";
import closedPNG from "../../assets/arcade/flower-closed.png";

function Plot(props:{x1: number, x2: number,playerX: number, plot: number, currentLoc: string, currentTime: number;
    vase: { hasVase: boolean, flowers: string[] }, addToVase: (flower: string) => void}) {

    const GROW_TIME = 9000;

    const plotStatus = useRef("empty");
    const flower = useRef("Tulip");
    const endGrow = useRef(0);

    useEffect(() => {
        if (props.currentTime == 0) {
            plotStatus.current = "empty";
            endGrow.current = 0;
        }
        if ((plotStatus.current != "empty") && (props.currentTime != 0)) {
            if (props.currentTime == endGrow.current) {
                plotStatus.current = "Grown" + flower.current;
            }
        }
    });

    function growFlower(type: string) {
        endGrow.current = props.currentTime + GROW_TIME;
        flower.current = type;
        plotStatus.current = "Seed" + type;
    }

    function showFlower() {
        if ((plotStatus.current != "empty") && (!plotStatus.current.includes("Grown"))) {
            const branch = {
                height: 75 * (1-(endGrow.current-props.currentTime)/GROW_TIME)
            };
            const bulb = {
                bottom: 34 + 75 * (1-(endGrow.current-props.currentTime)/GROW_TIME) + "px"
            };
            return (
                <>
                    <div className="absolute rounded bottom-[38px] w-[5px] bg-[#526523]" style={branch}></div>
                    <img src={closedPNG} className="absolute" width = {38} style = {bulb}></img>
                </>
            );
        }
        if (plotStatus.current.includes("Grown")) {
            let petals;
            if (flower.current == "Rose") {
                petals = rosePNG;
            }
            else {
                petals = tulipPNG;
            }
            return (
                <>
                    <div className="absolute bottom-[38px] rounded w-[5px] bg-[#526523] h-[75px]"></div>
                    <img src={petals} className="absolute bottom-[105px]" width={40}></img>
                </>
            );
        }
    }
    function plotPos() {
        let display = "none";
        if (props.currentLoc == "Plots") {
            display = "flex";
        }
        return {
            top: "500px",
            left: props.x1 + "px",
            display: display,
            width: props.x2 - props.x1 + "px"

        };
    }

    function pickFlower() {
        plotStatus.current = "empty";
        props.addToVase(flower.current);
    }

    function tossFlower() {
        plotStatus.current = "empty";
    }

    function createButtons() {
        const tossButton =
            <>
                <ArcadeButton onClick={() => tossFlower()}>Toss {flower.current}</ArcadeButton>
            </>;
        if (plotStatus.current == "empty") {
            return(
                <>
                    <ArcadeButton onClick={() => growFlower("Tulip")}>Plant Tulip</ArcadeButton>
                    <ArcadeButton onClick={() => growFlower("Rose")}>Plant Rose</ArcadeButton>
                </>
            );
        }
        if (plotStatus.current.includes("Grown")) {
            if ((props.vase.hasVase) && (props.vase.flowers.length < 4)) {
                return (
                    <>
                        <ArcadeButton onClick={() => pickFlower()}>Add {flower.current} to Vase</ArcadeButton>
                        {tossButton}
                    </>
                );
            }
            else {
                return tossButton;
            }
        }
    }

    return (
        <>
            <div className="absolute flex flex-row centerContent" style={plotPos()}>
                {showFlower()}
            </div>
            <HoverDivs showLoc="Plots" currentLoc={props.currentLoc} playerX={props.playerX} x1={props.x1}
                       x2={props.x2}>
                {createButtons()}
            </HoverDivs>

        </>
    );
}

export default Plot;
