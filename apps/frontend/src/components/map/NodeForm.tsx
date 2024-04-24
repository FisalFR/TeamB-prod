import Select from "../input-components/Select.tsx";
import React, {useState} from "react";
import NodeType from "common/src/NodeType.ts";
import EdgeType from "common/src/EdgeType.ts";

function NodeForm(props:{node: NodeType,
    keyLabels:  {nodeID: string, longName: string, shortName: string, building: string, floor: string, xcoord: string, nodeType: string}, disabled: string[],
    handleInput:(key: string, e: React.ChangeEvent) => void, value:(key: string, autofill: boolean) => string,
    nodeList: NodeType[], edgeList: EdgeType[], nodeMap: Map<string, NodeType>, currentNode: NodeType,
    nodeStrings: string[], autofill: boolean, addEdge: (edge: EdgeType) => void, deleteEdge: (spliceInd: number) => void}) {

    const [replaceThis, setReplaceThis] = useState(0);
    const [neighborToAdd, setNeighborToAdd] = useState("");

    function setNeighbor(e: React.ChangeEvent<HTMLSelectElement>) {
        setNeighborToAdd(e.currentTarget.value);
    }

    function getNeighbors(node: NodeType) {
        const neighbors: NodeType[] = [];
        props.edgeList.map((edge) => {
            const startNode = props.nodeMap.get(edge.startNodeID);
            const endNode = props.nodeMap.get(edge.endNodeID);
            if ((node == startNode) && (endNode != undefined)) {
                neighbors.push(endNode);
            }
            if ((node == endNode) && (startNode != undefined)) {
                neighbors.push(startNode);
            }
        });
        return neighbors;
    }


    function addNeighbor(editNode: NodeType, addNode: string) {
        const otherNeighbors = getNeighbors(editNode);
        const adding = props.nodeMap.get(addNode);
        if (adding != undefined) {
            if ((addNode != "Select node") && (!otherNeighbors.includes(adding)) && (adding != props.currentNode)) {
                //const newEdges = props.edgeList;
                const newEdge: EdgeType = {
                    startNodeID: editNode.nodeID,
                    endNodeID: addNode,
                    edgeID: editNode.nodeID + "_" + addNode
                };
                props.addEdge(newEdge);

                setReplaceThis(replaceThis+1);
            }
        }

    }

    function removeNeighbor(editNode: NodeType, removeNode: NodeType) {
        let spliceInd = 0;
        props.edgeList.map((edge, index) => {
            const startNode = props.nodeMap.get(edge.startNodeID);
            const endNode = props.nodeMap.get(edge.endNodeID);
            if (((startNode == editNode) && (endNode == removeNode)) || ((startNode == removeNode) && (endNode == editNode))) {
                spliceInd = index;
            }
        });
        props.deleteEdge(spliceInd);
        setReplaceThis(replaceThis+1);
    }

    function createInputs() {
        const inputDivs = [];
        for (const [key, keyLabel] of Object.entries(props.keyLabels)) {
            if (props.disabled.includes(key)) {
                inputDivs.push(
                    <>
                        <p>{keyLabel}: </p>
                        <p>{props.currentNode[key]}</p>
                    </>
                );
            }
            else {
                inputDivs.push(
                    <>
                        <label htmlFor={key + "Edit"}>{keyLabel}: </label>
                        <input value={props.value(key, props.autofill)} id={key + "Edit"}
                               onChange={(e) => {
                                   props.handleInput(key, e);
                               }} className="border-deep-blue border-2 rounded flex-grow"></input>
                    </>
                );
            }
        }
        return inputDivs;

    }

    function createNeighborEdit() {
        if (props.autofill) {
            return (
                <>
                    <p>Neighbors:</p>
                    <div className="flex flex-row gap-3 flex-wrap">
                        {
                            getNeighbors(props.currentNode).map((neighbor: NodeType) => {
                                return (
                                    <div className="bg-deep-blue rounded-2xl font-bold text-white p-2">
                                        {neighbor.nodeID}
                                        <button className="pl-2" onClick={() => {
                                            removeNeighbor(props.currentNode, neighbor);
                                        }}>X
                                        </button>
                                    </div>
                                );
                            })
                        }
                    </div>

                    <span className="flex flex-row items-center gap-5">
                    <Select defaultOption="Select node" options={props.nodeStrings} id="addNeighbor"
                            onChange={(e: React.ChangeEvent) => {
                                setNeighbor(e);
                            }} label="Add Neighbor: "/>
                    <button className="bg-deep-blue rounded-2xl px-2 py-1 font-bold text-white"
                            onClick={() => {
                                addNeighbor(props.currentNode, neighborToAdd);
                            }}>Add</button>
                    </span>
                </>
            );
        }
        return (
            <>
                <p>Create node to add and edit neighbors.</p>
            </>
        );

    }

    return (
        <>
            <div className={"grid grid-cols-[auto_auto] gap-1 justify-items-start"}>
                {createInputs()}
            </div>
            <div className="justify-items-start text-left flex flex-col gap-3 pb-5">
                {createNeighborEdit()}
            </div>
        </>
    );
}

export default NodeForm;
