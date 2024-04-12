import from from "../../assets/from_to_icons/circle_from.svg";
import Select from "../Select.tsx";
import dots from "../../assets/from_to_icons/circles_from_to.svg";
import destination from "../../assets/from_to_icons/icon_to.svg";
import {AlgorithmButtons} from "./AlgorithmButtons.tsx";
import star from "../../assets/Star.svg";

export function PathSelector(props: {
    options: string[],
    handleStartChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    handleEndChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    onClick: () => void,
    selectedAlgo: string | null,
    onClick1: () => void,
    onClick2: () => void,
    onClick3: () => void
}) {
    return <div
        className="absolute top-5 left-5 flex flex-col bg-white h-fit rounded-xl items-end">
        <div className="grid grid-cols-[auto_1fr] grid-rows-3 h-fit justify-items-center items-center pt-2 pr-2 pl-2">
            <img src={from} alt="from" className={"px-1"}/>
            <Select label="" id="nodeStartSelect" options={props.options}
                    onChange={props.handleStartChange as (e: React.ChangeEvent<HTMLSelectElement>) => void}
                    defaultOption={"Select your start location"}/>
            <img src={dots} alt="dots" className={"h-7 pb-1 px-1"}/>
            <div></div>
            <img src={destination} alt="destination" className={"px-1"}/>
            <Select label="" id="nodeEndSelect" options={props.options}
                    onChange={props.handleEndChange as (e: React.ChangeEvent<HTMLSelectElement>) => void}
                    defaultOption={"Select your end location"}/>
        </div>
        <div
            className="flex flex-row justify-center mt-2 w-full bg-deep-blue rounded-br-xl rounded-bl-xl font-OpenSans items-center font-bold text-bone-white">
            <div className="divide-x divide-solid py-2 flex flex-row">
                <AlgorithmButtons px="px-8" onClick={props.onClick} isActive={props.selectedAlgo === "Astar"}>
                    A <img src={star} alt="A Star Icon" height="15" width="15"/>
                </AlgorithmButtons>
                <AlgorithmButtons px="px-8" onClick={props.onClick1}
                                  isActive={props.selectedAlgo === "BFS"}> BFS </AlgorithmButtons>
                <AlgorithmButtons px="px-8" onClick={props.onClick2}
                                  isActive={props.selectedAlgo === "DFS"}> DFS </AlgorithmButtons>
                <AlgorithmButtons px="px-8" onClick={props.onClick3}
                                  isActive={props.selectedAlgo === "DIJKSTRA"}> DIJKSTRA </AlgorithmButtons>
            </div>
        </div>
    </div>;
}

