import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/button.tsx";
import Node from "packages/common/src/node.ts";
// import Edge from "packages/common/src/edge.ts";
import { parse } from "csv-parse/browser/esm/sync";
import {Table} from "react-bootstrap";
import { Importer, ImporterField } from 'react-csv-importer';

// Refactor the axios portion to use the correct format for issuing a get request; see apps/backend/src/routes/pathfindingRoute.ts

export function CsvManager() {
    // Default Data Importing
    const [nodeData, setNodeData] = useState([]); // TODO ask Nick about adding <Node[] | undefined> to make useState type-safe

    // With no dependencies listed, the Effect will re-run after every re-render of the component.
    useEffect(() => {
        getNodeData();
    }, []);

    function getNodeData() {
        try {
            // local csv lives at "../../../data/L1Nodes.csv"
            const response = axios.get("postgresql://teamb:teamb20@database.cs.wpi.edu:5432/teambdb?schema=teamb");
            const agents = response.json();
            if (response.status == 200) {
                console.log("Received node data from database.");
            }
            setNodeData(agents);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    async function postNodeData() {
        // TODO fix type of outgoingNodes
        const outgoingNodes:Node[] = {};

        // TODO direct post request to local db?
        const res = await axios.post("", outgoingNodes, {
            "Content-Type": "application/json"
        });
        if (res.status == 200) {
            console.log("Node data was sent to the database.");
        }
    }

    // const [tableVisibility, setTableVisibility] = useState({
    //     nodeTable: "block",
    //     edgeTable: "hidden"
    // });
    //
    // function handleShowNodeTable(): void {
    //     setTableVisibility({nodeTable: "block", edgeTable: "hidden"});
    // }
    //
    // function handleShowEdgeTable(): void {
    //     setTableVisibility({nodeTable: "hidden", edgeTable: "block"});
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
            {/*<Button></Button>*/}
            {/*<Button></Button>*/}
            <Button onClick={() => postNodeData().then()} children={}>Push to Database</Button>

            <div className={"nodeTable"}>
                <section>
                    nodeData &&
                    <Table className={"overflow-y-auto hover:bg-slate-300"}
                           data={nodeData}
                           col_labels={['Node ID', 'X-Coordinate', 'Y-Coordinate', 'Floor', 'Building', 'Node Type', 'Long Name', 'Short Name']}
                    />
                </section>
            </div>
        </div>
    );
}

export default CsvManager;
