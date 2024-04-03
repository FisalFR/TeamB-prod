import ll1map from "../assets/floors/00_thelowerlevel1.png";
import Select from "../components/Select.tsx";
import PathVisual from "../components/PathVisual.tsx";
import Button from "../components/Button.tsx";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import axios from "axios";
import {startEndNodes} from "common/src/pathfinding.ts";

export function Map(){

    const [zoom, setZoom] = useState(0.2);
    const [pathPoints, setPathPoints] = useState([0, 0]);
    const [showPath, setShowPath] = useState(false);

    const [request, setRequest] = useState<startEndNodes>({startNode: "", endNode: ""});

    const [nodes, setNodes] = useState(["Error accessing map points"]);

    const [nodeData, setNodeData] = useState({});



    const divRef = useRef<HTMLDivElement>(null);
    function zoomSlider(e: ChangeEvent<HTMLInputElement>) {
        setZoom(0.2 * parseFloat(e.target.value));
        //const scrollDiv = (divRef.current as HTMLDivElement);
        //scrollDiv.scroll(scrollDiv.scrollLeft + (scrollDiv.scrollWidth-scrollDiv.clientWidth)/2, 0);
    }

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
    }

    useEffect( () => {
        axios.get("/api/pathfinding/").then((response) => {
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
            <div className="">
                <p className="font-HeadlandOne text-3xl py-3">Floor: Lower Level 1</p>
                <div className="w-fit h-fit max-w-[1000px] max-h-[calc(100vh-200px)] overflow-scroll" ref={divRef}>
                    <PathVisual key={JSON.stringify(pathPoints)} path={pathPoints} image={ll1map} width={5000} height={3400}
                            scale={zoom} showPath={showPath}/>
                </div>
                <br/><br/>
            </div>
            <div className="text-left w-fit">
                <span className="text-3xl">- </span>
                <input type="range" min="1" max="10" step="any" defaultValue="1" onChange={zoomSlider}
                       id="myRange"></input><span className="text-3xl"> +</span><br/><br/>
                <span style={{color: "#012D5A"}}>● </span>
                <Select label="Starting Location: " id="nodeStartSelect" options={nodes} onChange={handleStartChange}/><br/><br/>
                <span style={{color: "#F6BD38"}}>● </span>
                <Select label="Ending Location: " id="nodeEndSelect" options={nodes} onChange={handleEndChange}/><br/><br/>
                <Button onClick={findPath} children={"Find Path"}/>
            </div>
        </div>
    );
}

export default Map;
