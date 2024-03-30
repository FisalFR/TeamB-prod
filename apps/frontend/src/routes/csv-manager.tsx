import { useState, useEffect } from "react";
import axios from "axios";
// import Button from "../components/button.tsx";
import {Table} from "react-bootstrap";

export function CsvManager() {
    // Default Data Importing
    const [nodeData, setNodeData] = useState([]);

    // With no dependencies listed, the Effect will re-run after every re-render of the component.
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/teambdb@database.cs.wpi.edu/teambdb/teamb/tables/l1Nodes");
            const agents = await response.json();
            if (response.status == 200) {
                console.log("Received node data from database.");
            }
            setNodeData(agents);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    //
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

    return (
        <div className={"csvManager"}>
            {/*<Button></Button>*/}
            {/*<Button></Button>*/}

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
