import ll1map from "../assets/floors/00_thelowerlevel1.png";
import from from "../assets/from_to_icons/circle_from.svg";
import dots from "../assets/from_to_icons/circles_from_to.svg";
import destination from "../assets/from_to_icons/icon_to.svg";
import Select from "../components/Select.tsx";
import PathVisual from "../components/PathVisual.tsx";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import axios from "axios";
import {startEndNodes} from "common/src/pathfinding.ts";

export function Map(){

    // const [zoom, setZoom] = useState(0.2);
    const [pathPoints, setPathPoints] = useState([0, 0]);
    const [showPath, setShowPath] = useState(false);

    const [request, setRequest] = useState<startEndNodes>({startNode: "", endNode: ""});

    const [nodes, setNodes] = useState(["Error accessing map points"]);

    const [nodeData, setNodeData] = useState({});



    const divRef = useRef<HTMLDivElement>(null);
    // function zoomSlider(e: ChangeEvent<HTMLInputElement>) {
    //     setZoom(0.2 * parseFloat(e.target.value));
    //     //const scrollDiv = (divRef.current as HTMLDivElement);
    //     //scrollDiv.scroll(scrollDiv.scrollLeft + (scrollDiv.scrollWidth-scrollDiv.clientWidth)/2, 0);
    // }

    function findPath() {
        axios.post("/api/pathfinding", request,{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.data.nodes.length != 0) {
                const nodeCoords = [];
                for (let i = 0; i < response.data.nodes.length; i++) {
                    nodeCoords.push(response.data.nodes[i]);
                }
                setPathPoints(nodeCoords);
                setShowPath(true);
            }
            else {
                alert("No path on Floor Lower Level 1 with selected nodes");
            }
        });
    }

    function handleStartChange(e: ChangeEvent<HTMLInputElement>) {
        setRequest({...request, startNode: nodeData[e.target.value].id});
        setPathPoints([nodeData[e.target.value].coords, pathPoints[pathPoints.length-1]]);
        setShowPath(false);
    }
    function handleEndChange(e: ChangeEvent<HTMLInputElement>) {
        setRequest({...request, endNode: nodeData[e.target.value].id});
        setPathPoints([pathPoints[0], nodeData[e.target.value].coords]);
        setShowPath(false);
        findPath();
    }

    useEffect( () => {
        axios.get("/api/pathfinding/halls").then((response) => {
            const nodeStrings = [];
            const tempNodeData = {};
            for (let i = 0; i < response.data.length; i++) {
                nodeStrings.push(response.data[i].longName);
                tempNodeData[response.data[i].longName] = {id: response.data[i].nodeID, coords: [response.data[i].xcoord, response.data[i].ycoord]};
            }
            setNodes(nodeStrings);
            setNodeData(tempNodeData);
            setRequest({startNode: tempNodeData[nodeStrings[0]].id, endNode: tempNodeData[nodeStrings[0]].id});
            setPathPoints([tempNodeData[nodeStrings[0]].coords]);
        });
    }, []);

    return (
        <div className="centerContent gap-10 w-full h-full">
            <div className="relative"> {/* Add relative positioning here */}
                <div className="w-full h-full overflow-scroll" ref={divRef}>
                    <PathVisual key={JSON.stringify(pathPoints)} path={pathPoints} image={ll1map} width={5000}
                                height={3400}
                        // scale={zoom}
                                scale={0.2}
                                showPath={showPath}/>
                </div>
                <div className="absolute top-5 left-5 flex flex-row p-2 bg-white h-fit rounded-2xl items-end">
                    <div className="grid grid-cols-[auto_1fr] grid-rows-3 h-fit justify-items-center items-center">
                        <img src={from} alt="from" className={"px-1"}/>
                        <Select label="" id="nodeStartSelect" options={nodes}
                                onChange={handleStartChange}/>
                        <img src={dots} alt="dots" className={"pb-1 px-1"}/>
                        <div></div>
                        <img src={destination} alt="destination" className={"px-1"}/>
                        <Select label="" id="nodeEndSelect" options={nodes}
                                onChange={handleEndChange}/>
                    </div>
                </div>
                {/*<div*/}
                {/*    className="absolute top-0 left-0 flex flex-row p-4 bg-white h-fit"> /!* Add absolute positioning here *!/*/}
                {/*    /!*<input type="range" min="1" max="10" step="any" defaultValue="1" onChange={zoomSlider}*!/*/}
                {/*    /!*       id="myRange"></input><span className="text-3xl"> +</span><br/><br/>*!/*/}

                {/*    <div className={"flex flex-col"}>*/}
                {/*        <div className={"flex flex-row"}>*/}
                {/*            <img src={from} alt="from icon"/>*/}
                {/*        </div>*/}
                {/*        <div className={"flex"}>*/}
                {/*            <img src={dots} alt="dots"/>*/}
                {/*        </div>*/}
                {/*        <div className={"flex flex-row"}>*/}
                {/*            <img src={destination} alt="destination"/>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className={"flex flex-col justify-around"}>*/}
                {/*        <Select label="" id="nodeStartSelect" options={nodes}*/}
                {/*                onChange={handleStartChange}/>*/}
                {/*        <Select label="" id="nodeEndSelect" options={nodes}*/}
                {/*                onChange={handleEndChange}/>*/}
                {/*    </div>*/}

                {/*    <Button onClick={findPath} children={"Find Path"}/>*/}


                {/*</div>*/}
            </div>
        </div>
    );
}

export default Map;
