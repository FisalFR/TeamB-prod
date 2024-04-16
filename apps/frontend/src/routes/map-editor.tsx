import ll1map from "../assets/floors/00_thelowerlevel1.png";
import ll2map from "../assets/floors/00_thelowerlevel2.png";
import l1map from "../assets/floors/01_thefirstfloor.png";
import l2map from "../assets/floors/02_thesecondfloor.png";
import l3map from "../assets/floors/03_thethirdfloor.png";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";
import React, {useEffect, useRef, useState} from "react";
// import axios from "axios";
// import {startEndNodes} from "common/src/pathfinding.ts";
import Node from "../../../../packages/common/src/node";
import ZoomButtons from "../components/map/ZoomButtons.tsx";
import FloorSelector from "../components/map/FloorSelector.tsx";
import useNodes from "../hooks/useNodes.ts";
import useEdges, {useEdgesID} from "../hooks/useEdges.ts";
import {TransformComponent, TransformWrapper, useControls} from "react-zoom-pan-pinch";
import Select from "../components/Select.tsx";
import Button from "../components/Button.tsx";
import axios from "axios";
import EdgeType from "common/src/EdgeType.ts";

export function MapEditor(){


    const [dragging, setDragging] = useState(false);

    const placeholderNode = {
        nodeID: "",
        xcoord: 0,
        ycoord: 0,
        floor: "",
        building: "",
        nodeType: "",
        longName: "",
        shortName: "",
        neighbors: [],
    };

    const [currentNode, setCurrentNode] = useState(placeholderNode);


    const PlusSvg = <img src={plus} alt="Plus" className={"w-5"} />;
    const MinusSvg = <img src={minus} alt="Minus" className={"w-5"} />;

    function ZoomControls() {
        const { zoomIn, zoomOut } = useControls();
        return(
            <ZoomButtons onClick1={() => zoomIn()} plusSvg={PlusSvg}
                         onClick2={() => zoomOut()} minusSvg={MinusSvg}/>
        );
    }




    // const [zoom, setZoom] = useState(0.56);
    // const [showPath, setShowPath] = useState(false);

    // const [request, setRequest] = useState<startEndNodes>({startNode: "", endNode: ""});
    interface FloorImages {
        [key: string]: string;
    }
    const floorImages: FloorImages = {
        "L1": ll1map,
        "L2": ll2map,
        "1": l1map,
        "2": l2map,
        "3": l3map
    };

    // const divRef = useRef<HTMLDivElement>(null);

    const [currentFloor, setCurrentFloor] = useState("2");
    // function zoomIn() {
    //     setZoom(prevZoom => Math.min(prevZoom * 1.2, 1.0)); // Increase zoom level, max 1.0
    // }
    //
    // function zoomOut() {
    //     setZoom(prevZoom => Math.max(prevZoom * 0.8, 0.56)); // Decrease zoom level, min 0.4
    // }

    //const [dragCount, setDragCount] = useState(0);
    const [replaceThis, setReplaceThis] = useState(0);

    const dragNodeID: React.MutableRefObject<string> = useRef("");
    const dragNodeCoordsX = useRef<number>(0);
    const dragNodeCoordsY = useRef<number>(0);

    function startDrag(e: MouseEvent, node: string) {
        const coords = getSVGCoords(e);
        dragNodeCoordsX.current = coords[0];
        dragNodeCoordsY.current = coords[1];
        dragNodeID.current = node;
        setDragging(true);
        setCurrentNode(nodeMap.get(node));
    }
    function handleDrag(e: MouseEvent, nodeID: string) {
        e.preventDefault();
            if (nodeID == dragNodeID.current) {
                const coords = getSVGCoords(e);
                dragNodeCoordsX.current = coords[0];
                dragNodeCoordsY.current = coords[1];
                updateNodes(dragNodeID.current, dragNodeCoordsX.current, dragNodeCoordsY.current);
                setEditNodes(nodes);
                setReplaceThis(replaceThis+1);

        }
    }
    function endDrag() {
        dragNodeID.current = "";
        setDragging(false);


    }

    function updateNodes(node: string, xcoord: number, ycoord: number) {
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].nodeID == node) {
                nodes[i].xcoord = xcoord;
                nodes[i].ycoord = ycoord;
            }
        }
    }

    const imgRef = useRef(null);

    function getSVGCoords(e: MouseEvent) {

        const offsetLeft = imgRef.current.getBoundingClientRect().left;
        const offsetTop = imgRef.current.getBoundingClientRect().top;

        const initialZoomX = 5000/imgRef.current.getBoundingClientRect().width;
        const initialZoomY = 3400/imgRef.current.getBoundingClientRect().height;

        const x = (e.clientX - offsetLeft) * initialZoomX;
        const y= (e.clientY - offsetTop) * initialZoomY;
        // console.log([Math.round(x), Math.round(y)]);
        return ([Math.round(x), Math.round(y)]);
    }

    const {nodes,nodeMap} = useNodes();
    const {edges} = useEdges();

    const nodeStrings: string[] = [];
    for (let i = 0; i < nodes.length; i++) {
        nodeStrings.push(nodes[i].nodeID);
    }

    const [editNodes, setEditNodes] = useState(useNodes().nodes);
    useEffect(() => setEditNodes(nodes), [nodes]);

    const [editEdges, setEditEdges] = useState(useEdges().edges);
    useEffect(() => setEditEdges(edges), [edges]);

    function setXCoords(node) {
        if (node.nodeID == dragNodeID.current) {
            return dragNodeCoordsX.current;
        }
        return node.xcoord;
    }
    function setYCoords(node) {
        if (node.nodeID == dragNodeID.current){
            return dragNodeCoordsY.current;
        }
        return node.ycoord;
    }

    function getNeighbors(node: Node) {
        const neighbors: Node[] = [];
        editEdges.map((edge) => {
            const startNode = nodeMap.get(edge.startNodeID);
            const endNode = nodeMap.get(edge.endNodeID);
            if ((node == startNode) && (endNode != undefined)) {
                neighbors.push(endNode);
            }
            if ((node == endNode) && (startNode != undefined)) {
                neighbors.push(startNode);
            }
        });
        return neighbors;
    }

    function removeNeighbor(editNode: Node, removeNode: Node) {
        const newEdges = editEdges;
        let spliceInd = 0;
        newEdges.map((edge, index) => {
            const startNode = nodeMap.get(edge.startNodeID);
            const endNode = nodeMap.get(edge.endNodeID);
            if (((startNode == editNode) && (endNode == removeNode)) || ((startNode == removeNode) && (endNode == editNode))) {
                spliceInd = index;
            }
        });
        newEdges.splice(spliceInd, 1);
        setEditEdges(newEdges);
        setEditEdgesID(newEdges.map(edge => edge.edgeID));
        setReplaceThis(replaceThis+1);
    }

    const [addedEdges, setAddedEdges] = useState<EdgeType[]>([]);

    function addNeighbor(editNode: Node, addNode: string) {
        const otherNeighbors = getNeighbors(editNode);
        const adding = nodeMap.get(addNode);
        if (adding != undefined) {
            if ((addNode != "Select node") && (!otherNeighbors.includes(adding)) && (adding != currentNode)) {
                const newEdges = editEdges;
                const newEdge: EdgeType = {
                    startNodeID: editNode.nodeID,
                    endNodeID: addNode,
                    edgeID: editNode.nodeID + "_" + addNode
                };
                newEdges.push(newEdge);
                setEditEdges(newEdges);
                addedEdges.push(newEdge);
                setReplaceThis(replaceThis+1);
            }
        }

    }

    const [changeElement, setChangeElement] = useState("");

    //handling form elements
    function autofillByDrag(element: string) {
        if (dragging || changeElement != element) {
            return currentNode[element];
        }
    }

    function handleInput(element: string, e) {
        setChangeElement(element);
        const changeNode = currentNode;
        changeNode[element] = e.target.value;
        setCurrentNode(changeNode);
        setReplaceThis(replaceThis+1);
    }
    function editNode(e) {
        const editing = nodeMap.get(e.target.value);
        if (editing != undefined) {
            setCurrentNode(editing);
            setCurrentFloor(editing.floor);
            setChangeElement("");
        }
    }
    const [neighborToAdd, setNeighborToAdd] = useState(null);

    function setNeighbor(e) {
        setNeighborToAdd(e.target.value);
    }
    function nodeEditor() {
        if (currentNode.nodeID != "") {
            return (
                <>
                    <p>Node ID: {currentNode.nodeID}</p>
                    <div>
                        <label htmlFor="longname">Long Name: </label>
                        <input value={autofillByDrag("longName")} id="longname"
                               onChange={(e) => {
                                   handleInput("longName", e);
                               }} className = "border-deep-blue border-2 rounded"></input>
                    </div>
                    <div>
                        <label htmlFor="shortname">Short Name: </label>
                        <input value={autofillByDrag("shortName")} id="shortname"
                               onChange={(e) => {
                                   handleInput("shortName", e);
                               }} className = "border-deep-blue border-2 rounded"></input>
                    </div>
                    <div>
                        <label htmlFor="building">Building: </label>
                        <input value={autofillByDrag("building")} id="building"
                               onChange={(e) => {
                                   handleInput("building", e);
                               }} className = "border-deep-blue border-2 rounded"></input>
                    </div>
                    <p>Floor: {currentNode.floor}</p>
                    <div>
                        <label htmlFor="nodetype">Type: </label>
                        <input value={autofillByDrag("nodeType")} id="nodetype"
                               onChange={(e) => {
                                   handleInput("nodeType", e);
                               }} maxLength={4} className = "border-deep-blue border-2 rounded"></input>
                    </div>
                    <div>
                        <label htmlFor="xcoord">X Coordinate: </label>
                        <input type="number" value={autofillByDrag("xcoord")} id="longname"
                               onChange={(e) => {
                                   handleInput("xcoord", e);
                               }} className = "border-deep-blue border-2 rounded"></input>
                    </div>
                    <div>
                        <label htmlFor="ycoord">Y Coordinate: </label>
                        <input type="number" value={autofillByDrag("ycoord")} id="longname"
                               onChange={(e) => {
                                   handleInput("ycoord", e);
                               }} className = "border-deep-blue border-2 rounded"></input>
                    </div>
                    <p>Neighbors:</p>
                    <div className="flex flex-row gap-3 flex-wrap">
                        {
                            getNeighbors(currentNode).map((neighbor: Node) => {
                                return (
                                    <div className="bg-deep-blue rounded-2xl font-bold text-white p-2">
                                        {neighbor.nodeID}
                                        <button className="pl-2" onClick={() => {
                                            removeNeighbor(currentNode, neighbor);
                                        }}>X
                                        </button>
                                    </div>
                                );
                            })
                        }
                    </div>

                    <span className="flex flex-row items-center gap-5">
                    <Select defaultOption="Select node" options={nodeStrings} id="addNeighbor"
                            onChange={(e: React.ChangeEvent) => {
                                setNeighbor(e);
                            }} label="Add Neighbor: "/>
                    <button className="bg-deep-blue rounded-2xl px-2 py-1 font-bold text-white"
                            onClick={() => {addNeighbor(currentNode, neighborToAdd);}}>Add</button>
                    </span>
                </>
            );
        } else {
            return (<p>Select node from dropdown or click node on map to edit.</p>);
        }
    }

    const originalEdges = useEdges().edges;

    const [editEdgesID, setEditEdgesID] = useState(useEdgesID().edges);

    function getDeletedEdges() {
        const toDelete = [];
        for (let i = 0; i < originalEdges.length; i++) {
            if (!editEdgesID.includes(originalEdges[i].edgeID)) {
                toDelete.push(originalEdges[i]);
            }
        }
        if(toDelete.length === originalEdges.length){
            return [];
        }
        return toDelete;
    }

    function handleSubmit() {
        //submit editNodes and editEdges to the database
        axios.post("/api/csvManager/editOneNode",currentNode,{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            const toDelete = getDeletedEdges();
            //This should add all the edges and delete all the edges and one go
            if(addedEdges.length > 0){
            axios.post("/api/csvManager/addManyEdge", addedEdges, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then( () => {
                alert("Add Success");
            });
            }
            if(toDelete.length > 0){
                axios.post("/api/csvManager/deleteManyEdge", toDelete, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then( () => {
                    alert("Delete Success");
                });
            console.log(response);
    }});
    }


    return (
        <div className="relative">
            <TransformWrapper disabled={dragging} disablePadding={true} limitToBounds={true}>
                <TransformComponent
                    wrapperStyle={{width: screen.width, height: "calc(100vh - 55px)", position: "fixed"}}>
                    <svg viewBox={"0 0 5000 3400"} width={"100vw"}
                         onMouseMove={(e) => handleDrag(e, dragNodeID.current)}>
                        <image xlinkHref={floorImages[currentFloor]} width={5000} height={3400}
                               key={JSON.stringify(floorImages[currentFloor])}
                               ref={imgRef}></image>
                        {editEdges.map((edge) => {
                            const startNode = nodeMap.get(edge.startNodeID);
                            const endNode = nodeMap.get(edge.endNodeID);
                            const sameFloor = startNode?.floor === endNode?.floor;
                            if (startNode !== undefined && endNode !== undefined) {
                                if (startNode.floor === currentFloor && sameFloor) {
                                    return <line x1={startNode.xcoord}
                                                 y1={startNode.ycoord}
                                                 x2={endNode.xcoord}
                                                 y2={endNode.ycoord}
                                                 stroke={"#012D5A"}
                                                 strokeWidth={5}></line>;
                                }
                            }
                        })}
                        {editNodes.filter(node => {
                            return node.floor === currentFloor;
                        }).map((node) => {
                            return <>
                                <circle cx={setXCoords(node)} cy={setYCoords(node)} r={8}
                                        fill="#F6BD38"
                                        onMouseMove={(e) => handleDrag(e, node.nodeID)}
                                        onMouseDown={(e) => startDrag(e, node.nodeID)}
                                        onMouseUp={() => endDrag()}
                                        className="cursor-pointer"/>

                            </>;
                        })}
                    </svg>
                </TransformComponent>
                <div
                    className="absolute gap-1 top-5 left-5 flex flex-col bg-white h-fit rounded-xl items-start text-left w-96 max-h-[350px] overflow-auto">
                    <div className="p-6 flex flex-col gap-2">
                        <h2 className="font-HeadlandOne text-[24px]">Edit Nodes</h2>

                        <Select defaultOption="Select node to edit" options={nodeStrings} id="pickEditNode"
                                onChange={(e) => {
                                    editNode(e);
                                }} label="Edit Node: "/>
                        <br/>
                        <h3 className="font-bold text-lg">Currently Editing: </h3>
                        {nodeEditor()}
                    </div>

                    <div className = "centerContent w-full p-5 bottom-0 sticky bg-white">
                        <Button onClick={handleSubmit}>Submit Node Edit</Button>
                    </div>
                </div>
                <FloorSelector
                    onClick1={() => setCurrentFloor("L2")}
                    onClick2={() => setCurrentFloor("L1")}
                    onClick3={() => setCurrentFloor("1")}
                    onClick4={() => setCurrentFloor("2")}
                    onClick5={() => setCurrentFloor("3")}
                    currentFloor={currentFloor}
                />
                <ZoomControls></ZoomControls>
            </TransformWrapper>
        </div>

    )
        ;
}

export default MapEditor;
