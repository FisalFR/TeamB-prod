import {useEffect, useRef} from "react";
import Button from "@/components/Button.tsx";
import HoverDivs from "@/components/arcade/HoverDivs.tsx";


function Plot(props:{x1: number, x2: number,playerX: number, plot: number, currentLoc: string, currentTime: number;
    vase: { hasVase: boolean, flowers: string[] }, addToVase: (flower: string) => void}) {

    const GROW_TIME = 9000;

    const plotStatus = useRef("empty");
    const flower = useRef("Tulip");
    const endGrow = useRef(0);

    useEffect(() => {
        if ((plotStatus != "empty") && (props.currentTime != 0)) {
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
                height: 30 * (props.currentTime/endGrow.current)
            };
            return (
                <>
                    <div className="absolute bottom-[75px] w-[3px] bg-green-800" style={branch}></div>
                </>
            );
        }
        if (plotStatus.current.includes("Grown")) {
            let color = "pink";
            if (flower.current == "Rose") {
                color = "red";
            }
            const petals = {
                backgroundColor: color
            };
            return (
                <>
                    <div className="absolute bottom-[75px] w-[3px] bg-green-800 h-[30px]"></div>
                    <div className="absolute bottom-[105px] w-[5px] h-[8px] bg-pink-400" style={petals}></div>
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
                <Button onClick={() => tossFlower()}>Toss {flower.current}</Button>
            </>;
        if (plotStatus.current == "empty") {
            return(
                <>
                    <Button onClick={() => growFlower("Tulip")}>Plant Tulip</Button>
                    <Button onClick={() => growFlower("Rose")}>Plant Rose</Button>
                </>
            );
        }
        if (plotStatus.current.includes("Grown")) {
            if ((props.vase.hasVase) && (props.vase.flowers.length < 4)) {
                return (
                    <>
                        <Button onClick={() => pickFlower()}>Add {flower.current} to Vase</Button>
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
            <HoverDivs showLoc="Plots" currentLoc={props.currentLoc} playerX={props.playerX} x1={props.x1}
                       x2={props.x2}>
                {createButtons()}
            </HoverDivs>

            <div className="absolute flex flex-row centerContent" style = {plotPos()}>
                {showFlower()}
            </div>
        </>
    );
}

export default Plot;
