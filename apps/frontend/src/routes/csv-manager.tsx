import {useState, useEffect, useRef} from "react"; // , useMemo
import axios from "axios";
import Table from "../components/Table.tsx";
import Button from "../components/Button.tsx";
//import {LoadingDot} from "../components/loadingDot.tsx";

// import useTable from "react-table";

export function CsvManager() {
    // TODO refactor to work with two separate GET URLs based on radio button input
    const [nodeData, setNodeData] = useState(["Error accessing node data."]);
    const [edgeData, setEdgeData] = useState(["Error accessing edge data."]);

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
                tempNodeData.push({name: response.data[i].longName, id: response.data[i].nodeID, xcord: response.data[i].xcoord, ycord: response.data[i].ycoord});
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
        <div className={"csvManager centerContent flex flex-col"}>
            <div className="flex flex-col bg-light-white my-10 p-10 px-20 rounded-3xl w-1/3 min-w-fit">
                <h2 className={"text-3xl font-HeadlandOne py-4"}>Map CSV Manager</h2>
                <h3 className={"text-xl font-HeadlandOne py-4"}>Upload Node CSV</h3>

                <form ref={formRefNodes} onSubmit={e => {
                    e.preventDefault();
                }}>
                    <div className={"flex flex-row justify-between"}>
                        <input type="file" name="importedNodes"/>
                        <Button onClick={handleImportNodes}>Upload</Button>
                    </div>
                </form>
            <br/>

            <h3 className={"text-xl font-HeadlandOne py-4"}>Upload Edge CSV</h3>

                <form ref={formRefEdges} onSubmit={e => {
                    e.preventDefault();
                }}>
                    <div className={"flex flex-row justify-between"}>
                        <input type="file" name="importedEdges" className="left-4"/>
                        <Button onClick={handleImportEdges}>Upload</Button>
                    </div>
                </form>
            <div className="centerContent gap-10 p-10">
                    {<Button px="px-10" py="py-5" onClick={handleExportNodes}>Download Nodes</Button>}
                    {<Button px="px-10" py="py-5" onClick={handleExportEdges}>Download Edges</Button>}
                </div>
            </div>
            <div className="flex flex-col gap-5 py-20 bg-light-white px-36 my-10 rounded-3xl w-3/4 w-min-fit justify-center centerContent">
                <h3 className={"text-xl font-HeadlandOne"}>Nodes</h3>
                <div className="max-h-[60vh] overflow-scroll border-solid border-b-[1px] border-deep-blue w-full">
                    <Table data={nodeData} headings={["Name", "Node ID", "X-Coord", "Y-Coord"]}
                           keys={["name", "id", "xcord", "ycord"]}/>
                </div>
                <br/>
                <h3 className={"text-xl font-HeadlandOne"}>Edges</h3>
                <div className="max-h-[60vh] overflow-scroll border-solid border-b-[1px] border-deep-blue w-full">
                    <Table data={edgeData} headings={["Edge ID", "Start Node", "End Node"]} keys={["edgeID", "startNodeID", "endNodeID"]}/>
                </div>
            </div>
        </div>

    );
}

export default CsvManager;
