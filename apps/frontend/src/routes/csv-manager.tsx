import { useState, useEffect } from "react"; // , useMemo
import axios from "axios";
import Table from "../components/Table.tsx";

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

    return (
        <div className={"csvManager"}>
            <label>Node CSV:</label>
            <form id='uploadForm'
                  action='http://localhost:3000/api/csvManager/uploadNodes'
                  method='post'
                  encType="multipart/form-data">
                <input type="file" name="importedNodes"/>
                <input type='submit' value='Upload!'/>
            </form>

            <label>Edge CSV:</label>
            <form id='uploadForm'
                  action='http://localhost:3000/api/csvManager/uploadEdges'
                  method='post'
                  encType="multipart/form-data">
                <input type="file" name="importedEdges"/>
                <input type='submit' value='Upload!'/>
            </form>

            <Table data={nodeData} headings={["Name", "Node ID", "X-Coord","Y-Coord"]} keys={ ["name", "id", "xcord","ycord"] }/>
            <Table data={edgeData} headings={["Start Node", "End Node"]} keys={ ["startNodeID", "endNodeID"] }/>
        </div>
    );
}

export default CsvManager;
