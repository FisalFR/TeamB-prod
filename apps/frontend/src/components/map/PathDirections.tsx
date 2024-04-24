import {SideTab} from "./SideTab.tsx";
import useNodes from "../../hooks/useNodes.ts";
import useEdges from "../../hooks/useEdges.ts";
import genInstructions from "../../directionTools.ts";
import forwardArrow from "../../assets/Forward.svg";
import leftArrow from "../../assets/LeftArrow.svg";
import rightArrow from "../../assets/RightArrow.svg";
import elevator from "../../assets/Elevator.svg";
import React from "react";
import Node from "common/src/node.ts";

function icon(image:string){
    switch(image){
        case "Forward":
        return (<img src={forwardArrow} alt="FWD"/>);
        case "Left":
            return (<img src={leftArrow} alt="LFT"/>);
        case "Right":
            return (<img src={rightArrow} alt="RGT"/>);
        case "Elevator":
        case "Stairs":
            return (<img src={elevator} alt="ELV"/>);
    }
}

export function PathDirections(props: { Path: Node[]}){
    const {nodeMap} = useNodes();
    const {edgeMap} = useEdges();

    return (
        <SideTab height={"h-[172px]"} yPos={"top-56"} arrow={false}
            tabChildren={
                <div>
                    <b style={{color: "white"}}>PD</b>
                </div>}
            bodyChildren={
            <div className="h-[132px] overflow-y-scroll overflow-hidden w-[415px]">
                    { genInstructions(props.Path, nodeMap,edgeMap ).map(instruction => (
                        <div className=" flex flex-col  text-sm/[17px] gap-36">
                        <div className="  flex flex-row py-3 ">
                            <div className="object-left w-1/4 px-5">
                            <div className=" centerContent ">
                            {icon(instruction.type)}
                            </div>
                            </div>

                            <h1 className="w-3/4 align-middle" style={{color: "#012D5A", fontSize: 17, textAlign:"left"}}>
                                {instruction.content}
                            </h1>
                        </div>
                        </div>))}
                        </div>

                    }/>);

            }
