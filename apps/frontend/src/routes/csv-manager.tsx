import { useState, useEffect } from "react"; // , useMemo
import axios from "axios";
import Table from "../components/Table.tsx";
import Button from "../components/Button.tsx";

// import useTable from "react-table";

export function CsvManager() {
    // TODO refactor to work with two separate GET URLs based on radio button input
    const [nodeData, setNodeData] = useState(["Error accessing node data."]);
    const [edgeData, setEdgeData] = useState(["Error accessing edge data."]);

    // const Table = ({}) => {
    //     const columns = useMemo(
    //         () => [
    //             {Header: "Node  ID", accessor: "node_id"},
    //             {Header: "X-Coordinate", accessor: "x_coordinate"},
    //             {Header: "Y-Coordinate", accessor: "y_coordinate"},
    //             {Header: "Floor", accessor: "floor"},
    //             {Header: "Building", accessor: "building"},
    //             {Header: "Node Type", accessor: "node_type"},
    //             {Header: "Long Name", accessor: "long_name"},
    //             {Header: "Short Name", accessor: "short_name"}
    //         ],
    //         []
    //     );
    // };

    // const tableInstance {
    //     getTableProps,
    //     getTableBodyProps,
    //     headerGroups,
    //     rows,
    //     prepareRow
    // } = useTable({ columns, nodeData });

    // TODO extract to external function to be called here and in map.tsx
    // With no dependencies listed, the Effect will re-run after every re-render of the component.
    useEffect( () => {
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
                tempEdgeData.push({startNodeID: response.data[i].startNodeID, endNodeID: response.data[i].endNodeID});
            }
            setEdgeData(tempEdgeData);
        });
    }, []);

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

    return (
        <div className={"csvManager"}>
            <h2 className={"text-3xl font-HeadlandOne py-4"}>Map CSV Manager</h2>
            <h3 className={"text-xl font-HeadlandOne py-4"}>Upload Node CSV</h3>
            <form id='uploadForm'
                  action='http://localhost:3000/api/csvManager/uploadNodes'
                  method='post'
                  encType="multipart/form-data">
                <input type="file" name="importedNodes"/>
                <input type='submit' value='Upload!' className="px-5 py-2 bg-deep-blue font-bold text-white w-fit rounded"/>
            </form>
            <br/>

            <h3 className={"text-xl font-HeadlandOne py-4"}>Upload Edge CSV</h3>
            <form id='uploadForm'
                  action='http://localhost:3000/api/csvManager/uploadEdges'
                  method='post'
                  encType="multipart/form-data">
                <input type="file" name="importedEdges"/>
                <input type='submit' value='Upload!' className="px-5 py-2 bg-deep-blue font-bold text-white w-fit rounded"/>
            </form>

            <div className="centerContent gap-10 p-10">
                {<Button onClick={handleExportNodes}>Download Nodes</Button>}
                {<Button onClick={handleExportEdges}>Download Edges</Button>}
            </div>
            <div className="centerContent gap-5 flex-col w-full py-10">
                <h3 className={"text-xl font-HeadlandOne"}>Nodes</h3>
                <div className="max-h-[60vh] overflow-scroll border-solid border-b-[1px] border-deep-blue w-full">
                    <Table data={nodeData} headings={["Name", "Node ID", "X-Coord", "Y-Coord"]}
                           keys={["name", "id", "xcord", "ycord"]}/>
                </div>
                <br/>
                <h3 className={"text-xl font-HeadlandOne"}>Edges</h3>
                <div className="max-h-[60vh] overflow-scroll border-solid border-b-[1px] border-deep-blue w-full">
                    <Table data={edgeData} headings={["Start Node", "End Node"]} keys={["startNodeID", "endNodeID"]}/>
                </div>
            </div>
        </div>
    );
}

export default CsvManager;
