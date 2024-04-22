import ll1map from "../assets/floors/00_thelowerlevel1.png";
import ll2map from "../assets/floors/00_thelowerlevel2.png";
import l1map from "../assets/floors/01_thefirstfloor.png";
import l2map from "../assets/floors/02_thesecondfloor.png";
import l3map from "../assets/floors/03_thethirdfloor.png";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";
import React, {useEffect, useRef, useState} from "react";
import ZoomButtons from "../components/map/ZoomButtons.tsx";
import FloorSelector from "../components/map/FloorSelector.tsx";
import useNodes from "../hooks/useNodes.ts";
import useEdges, {useEdgesID} from "../hooks/useEdges.ts";
import {TransformComponent, TransformWrapper, useControls} from "react-zoom-pan-pinch";
import Select from "../components/Select.tsx";
import Button from "../components/Button.tsx";
import axios from "axios";
import EdgeType from "common/src/EdgeType.ts";
import NodeForm from "../components/map/NodeForm.tsx";
import NodeType from "common/src/NodeType.ts";
import nodeAddOrDelete from "common/src/nodeAddOrDelete.ts";
//import nodeType from "common/src/NodeType.ts";

export function MapEditor(){


    const [dragging, setDragging] = useState(false);

    const placeholderNode: NodeType = {
        nodeID: "",
        xcoord: 0,
        ycoord: 0,
        floor: "",
        building: "",
        nodeType: "",
        longName: "",
        shortName: ""
    };
    const nodeLabels = {
        "nodeID": "Node ID",
        "longName": "Long Name",
        "shortName": "Short Name",
        "building": "Building",
        "floor": "Floor",
        "xcoord": "X Coordinate",
        "ycoord": "Y Coordinate",
        "nodeType": "Type"
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



    const [currentFloor, setCurrentFloor] = useState("2");
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
                //setEditNodes(nodes);
                setReplaceThis(replaceThis+1);

        }
    }
    function endDrag() {
        const nodeChanged = nodeMap.get(dragNodeID.current);
        if (nodeChanged != undefined) {
            if (!nodeEdits.current.includes(nodeChanged)) {
                nodeEdits.current.push(nodeChanged);
            }
        }
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


    const nodeEdits = useRef<NodeType[]>([]);
    const nodeAddDeletes = useRef<nodeAddOrDelete[]>([]);

    const nodeStrings: string[] = [];
    for (let i = 0; i < nodes.length; i++) {
        nodeStrings.push(nodes[i].nodeID);
    }


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

    const [addedEdges, setAddedEdges] = useState<EdgeType[]>([]);


    const [changeElement, setChangeElement] = useState("");

    //handling form elements
    function autofillByDrag(element: string, autofill: boolean) {
        if ((dragging || changeElement != element) && autofill) {
            return currentNode[element];
        }
    }

    const addNode = useRef(placeholderNode);
    function handleAddInput(element: string, e) {
        addNode.current[element] = e.target.value;
        setReplaceThis(replaceThis+1);
    }
    function addNewNode() {
        const newNode: NodeType = {
            nodeID: addNode.current["nodeID"],
            xcoord: addNode.current["xcoord"],
            ycoord: addNode.current["ycoord"],
            floor: addNode.current["floor"],
            building: addNode.current["building"],
            nodeType: addNode.current["nodeType"],
            longName: addNode.current["longName"],
            shortName: addNode.current["shortName"]
        };
        nodes.push(newNode);
        nodeMap.set(newNode.nodeID, newNode);
        nodeAddDeletes.current.push({node: newNode, action: "add"});
        setReplaceThis(replaceThis+1);
    }
    function deleteNode() {
        const spliceInd = nodes.indexOf(currentNode);
        removeAllNeighbors(currentNode);
        nodes.splice(spliceInd, 1);
        nodeAddDeletes.current.push({node: currentNode, action: "delete"});
        if (nodeEdits.current.includes(currentNode)) {
            const editSpliceInd = nodeEdits.current.indexOf(currentNode);
            nodeEdits.current.splice(editSpliceInd, 1);
        }
        setReplaceThis(replaceThis+1);

    }
    function removeAllNeighbors(deleteNode: NodeType) {
        const spliceInd: number[] = [];
        edges.map((edge, index) => {
            const startNode = nodeMap.get(edge.startNodeID);
            const endNode = nodeMap.get(edge.endNodeID);
            if ((startNode == deleteNode) || (endNode == deleteNode)) {
                spliceInd.push(index);
            }
        });
        for (let i = 0; i < spliceInd.length; i++) {
            deleteEdge(spliceInd[i]-i);
        }
        //deleteEdge(spliceInd);
        //edgeList.splice(spliceInd, 1);
        //setEditEdges(newEdges);
        //setEditEdgesID(newEdges.map(edge => edge.edgeID));
        setReplaceThis(replaceThis+1);
    }
    function handleInput(element: string, e) {
        setChangeElement(element);
        const changeNode = currentNode;
        changeNode[element] = e.target.value;
        setCurrentNode(changeNode);
        if (!nodeEdits.current.includes(changeNode)) {
            nodeEdits.current.push(changeNode);
        }
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

    function addEdge(edge: EdgeType) {
        edges.push(edge);
        setReplaceThis(replaceThis+1);
    }
    function deleteEdge(spliceInd: number) {
        edges.splice(spliceInd, 1);
        setReplaceThis(replaceThis+1);
    }

    function nodeEditor() {
        if (currentNode.nodeID != "") {
            return (
                <>
                    {<NodeForm node={currentNode} keyLabels={nodeLabels}
                               disabled={["nodeID", "floor"]} handleInput={handleInput} value={autofillByDrag} nodeList={nodes}
                               edgeList={edges} nodeMap={nodeMap} currentNode={currentNode} nodeStrings={nodeStrings}
                               autofill={true} addEdge={addEdge} deleteEdge={deleteEdge}/>}
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
        //alert(nodeAddDeletes.current.length);
        axios.post("/api/csvManager/addDeleteNodes",nodeAddDeletes.current,{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {

            //submit nodeEdits (list of nodes that have been edited) and editEdges to the database
            axios.post("/api/csvManager/editManyNodes",nodeEdits.current,{
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
                    resetEdges();
                    // alert("Add Success");
                });
                }
                if(toDelete.length > 0){
                    axios.post("/api/csvManager/deleteManyEdge", toDelete, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then( () => {
                        // alert("Delete Success");
                    });
                console.log(response);
        }});
    });}

    const resetEdges = () => {
        setAddedEdges([]);
        setEditEdgesID([]); // Reset editEdgesID
    };

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
                        {nodes.filter(node => {
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
                        <Button onClick={deleteNode}>Delete Node</Button>
                    </div>

                    <div className="p-6 flex flex-col gap-2">
                        <h2 className="font-HeadlandOne text-[24px]">Add Node</h2>

                        <NodeForm node={currentNode} keyLabels={nodeLabels}
                                  disabled={[]} handleInput={handleAddInput} value={autofillByDrag} nodeList={nodes}
                                  edgeList={edges} nodeMap={nodeMap} currentNode={addNode.current} nodeStrings={nodeStrings}
                                  autofill={false} addEdge={addEdge} deleteEdge={deleteEdge}/>
                        <Button onClick={addNewNode}>Add Node</Button>
                    </div>

                    <div className="centerContent w-full p-5 bottom-0 sticky bg-white">
                        <Button onClick={handleSubmit}>Submit Changes</Button>
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
