import React, {useState, useEffect, useRef} from "react"; // , useMemo
import axios from "axios";
import Table from "../components/Table.tsx";
import Button from "../components/Button.tsx";
//import {LoadingDot} from "../components/loadingDot.tsx";

// import useTable from "react-table";

export function CsvManager() {
    // TODO refactor to work with two separate GET URLs based on radio button input
    const [nodeData, setNodeData] = useState(["Error accessing node data."]);
    // const [edgeData, setEdgeData] = useState(["Error accessing edge data."]);

    const formRefNodes = useRef<HTMLFormElement>(null);
    const formRefEdges = useRef<HTMLFormElement>(null);

    // TODO extract to external function to be called here and in map.tsx
    // With no dependencies listed, the Effect will re-run after every re-render of the component.
    useEffect( () => {
        resetTable();
    }, []);

    function resetTable() {
        axios.get("/api/csvManager/nodes").then((response) => {
            const tempNodeData = [];
            for (let i = 0; i < response.data.length; i++) {
                tempNodeData.push({name: response.data[i].longName, id: response.data[i].nodeID, xcord: response.data[i].xcoord, ycord: response.data[i].ycoord,
                    floor: response.data[i].floor, building: response.data[i].building, nodeType: response.data[i].nodeType, longName: response.data[i].longName, shortName: response.data[i].shortName});
            }
            setNodeData(tempNodeData);
        });

        axios.get("/api/csvManager/edges").then((response) => {
            const tempEdgeData = [];
            for (let i = 0; i < response.data.length; i++) {
                tempEdgeData.push({edgeID: response.data[i].edgeID, startNodeID: response.data[i].startNodeID, endNodeID: response.data[i].endNodeID});
            }
            setEdgeData(tempEdgeData);
        });
    }

    function handleExportNodes(): void {
        axios.get("/api/csvManager/exportNodes").then((response) => {
            const csvData = response.data;
            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const element = document.createElement("a");
            element.href = url;
            element.download = "nodeDataFile.csv";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        });
    }

    function handleExportEdges(): void {
        axios.get("/api/csvManager/exportEdges").then((response) => {
            const csvData = response.data;
            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const element = document.createElement("a");
            element.href = url;
            element.download = "edgeDataFile.csv";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        });
    }

    function handleImportNodes() {
        const formNodeData = new FormData(formRefNodes.current as HTMLFormElement);
        axios.post("/api/csvManager/uploadNodes",formNodeData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            alert(response.data);
            resetTable();
        }
        );
    }

    function handleImportEdges() {
        const formEdgeData = new FormData(formRefEdges.current as HTMLFormElement);
        axios.post("/api/csvManager/uploadEdges", formEdgeData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            alert(response.data);
            resetTable();
        });
    };



    return (
        <div className={"flex pt-8"}>
            <div className=" h-full mx-3 space-y-7 my-3">
                <div className="rounded-2xl bg-deep-blue bg-opacity-5">
                    <div className="flex flex-col items-start p-3 pl-5 rounded-3xl w-1/3 min-w-fit">
                        <h2 className={"font-extrabold text-2xl font-HeadlandOne flex items-start pb-3"}>Map CSV
                            Manager</h2>
                        <h3 className={"text-xl font-HeadlandOne py-4"}>Upload Node CSV</h3>
                        <form ref={formRefNodes} onSubmit={e => {
                            e.preventDefault();
                        }}>
                            <div className={"flex flex-row justify-between bg-light-white p-2 rounded-md"}>
                                <input type="file" name="importedNodes"/>
                            </div>
                            <div className={"flex centerContent space-x-5 pt-5"}>
                                <Button onClick={handleImportNodes}>Upload</Button>
                                {<Button onClick={handleExportNodes}>Download</Button>}
                            </div>
                        </form>

                        <br/>

                        <h3 className={"text-xl font-HeadlandOne py-4"}>Upload Edge CSV</h3>
                        <form ref={formRefEdges} onSubmit={e => {
                            e.preventDefault();
                        }}>
                            <div className={"flex flex-row justify-between bg-light-white p-2 rounded-md"}>
                                <input type="file" name="importedEdges" className="left-4"/>
                            </div>
                            <div className={"flex centerContent space-x-5 pt-5"}>
                                <Button onClick={handleImportEdges}>Upload</Button>
                                {<Button onClick={handleExportEdges}>Download</Button>}
                            </div>
                        </form>

                        <br/>

                        <h3 className={"text-xl font-HeadlandOne py-4"}>Upload Employee CSV</h3>
                        <form ref={formRefEdges} onSubmit={e => {
                            e.preventDefault();
                        }}>
                            <div className={"flex flex-row justify-between bg-light-white p-2 rounded-md"}>
                                <input type="file" name="importedEdges" className="left-4"/>
                            </div>
                            <div className={"flex centerContent space-x-5 pt-5"}>
                                <Button onClick={handleImportEdges}>Upload</Button>
                                {<Button onClick={handleExportEdges}>Download</Button>}
                            </div>
                        </form>

                    </div>
                </div>
            </div>

            <div
                className="max-h border-solid border-b-[1px] border-deep-blue w-full h-full max-h-databasetable mt-3">
                <div className="max-h-[73vh] overflow-auto w-full">
                    <Table data={nodeData}
                           headings={["Name", "Node ID", "X-Coord", "Y-Coord", "Floor", "Building", "Node Type", "Long Name", "Short Name"]}
                           keys={["name", "id", "xcord", "ycord", "floor", "building", "nodeType", "longName", "shortName"]}/>
                </div>
                {/*<br/>*/}
                {/*<h3 className={"text-xl font-HeadlandOne"}>Edges</h3>*/}
                {/*<div className="max-h-[60vh] overflow-auto w-full">*/}
                {/*    <Table data={edgeData}*/}
                {/*           headings={["Edge ID", "Start Node", "End Node"]}*/}
                {/*           keys={["edgeID", "startNodeID", "endNodeID"]}/>*/}
                {/*</div>*/}
            </div>
        </div>

    );
}

export default CsvManager;
