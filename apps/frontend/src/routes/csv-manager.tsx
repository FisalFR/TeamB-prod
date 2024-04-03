// import { useState, useEffect } from "react"; // , useMemo
// import axios from "axios";
// import Button from "../components/button.tsx";

// import Node from "packages/common/src/node.ts";
// import readNode from "../../../backend/src/readNode.ts";
// import writeNode from "../../../backend/src/writeNode.ts";
//
// import Edge from "packages/common/src/edge.ts";
// import readEdge from "../../../backend/src/readEdge.ts";
// import writeEdge from "../../../backend/src/writeEdge.ts";

// import useTable from "react-table";

export function CsvManager() {
    // TODO refactor to work with two separate GET URLs based on radio button input
    // const [nodes, setNodes] = useState(["Error accessing node data."]);
    // const [nodeData, setNodeData] = useState({});

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
    // useEffect( () => {
    //     axios.get("/api/csvManager/").then((response) => {
    //         const nodeStrings = [];
    //         const tempNodeData = {};
    //         for (let i = 0; i < response.data.length; i++) {
    //             nodeStrings.push(response.data[i].longName);
    //             tempNodeData[response.data[i].longName] = {id: response.data[i].nodeID, coords: [response.data[i].xcoord, response.data[i].ycoord]};
    //         }
    //         setNodes(nodeStrings);
    //         setNodeData(tempNodeData);
    //     });
    // }, []);

    // async function postNodeData() {
    //     // TODO fix type of outgoingNodes
    //     const outgoingNodes: string[] = [];
    //
    //     // TODO direct post request to local db?
    //     const res = await axios.post("", outgoingNodes, {
    //         "Content-Type": "application/json"
    //     });
    //     if (res.status == 200) {
    //         console.log("Node data was sent to the database.");
    //     }
    // }

    // function handleImport(): void {
    //
    // }
    //
    // function handleExport(): void {
    //
    // }

    return (
        <div className={"csvManager"}>
            <form id='uploadForm'
                  action='http://localhost:3000/api/csvManager/uploadNodes'
                  method='post'
                  encType="multipart/form-data">
                <input type="file" name="importedNodes"/>
                <input type='submit' value='Upload!'/>
            </form>

            <form id='uploadForm'
                  action='http://localhost:3000/api/csvManager/uploadEdges'
                  method='post'
                  encType="multipart/form-data">
                <input type="file" name="importedEdges"/>
                <input type='submit' value='Upload!'/>
            </form>

            {/*<Button onClick={}></Button>*/}
            {/*<Button></Button>*/}
            {/*<Button onClick={() => postNodeData().then()} children={}>Push to Database</Button>*/}

            <div className={"nodeTable"}>
                <section>
                    {/*<Table className={"overflow-y-auto hover:bg-slate-300"}*/}
                    {/*       data={nodeData}*/}
                    {/*       col_labels={[]}*/}
                    {/*/>*/}
                </section>
            </div>
        </div>
    );
}

export default CsvManager;
