import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table.tsx";

function LogBook() {

    const [interpreterReq, setInterpreterReq] = useState([]);
    const [maintenanceReq, setMaintenanceReq] = useState([]);

    useEffect(() => {

        axios.get("/api/languageInterpreter/").then((response) => {
            setInterpreterReq(response.data.reverse());
        });
        axios.get("/api/maintenance/").then((response) => {
            setMaintenanceReq(response.data.reverse());
        });
    }, []);

    return (
        <div className="overflow-scroll pb-12">
            <h2 className={"text-3xl font-HeadlandOne py-4"}>Log Book</h2>

            <h2 className={"text-2xl font-HeadlandOne py-4"}>Interpreter Requests</h2>
            <div className="max-h-[60vh] overflow-scroll border-solid border-b-[1px] border-deep-blue">
                <Table data={interpreterReq} headings={["Language", "Location"]}
                       keys={["language", "location"]}/>
            </div>
            <br/>
            <h2 className={"text-2xl font-HeadlandOne py-4"}>Maintenance Requests</h2>
            <div className="max-h-[60vh] overflow-scroll border-solid border-b-[1px] border-deep-blue">
                <Table data={maintenanceReq} headings={["Issue", "Location", "Urgent", "Feedback"]}
                       keys={["issue", "location", "isUrgent", "feedback"]}/>
            </div>
        </div>
    );
}

export default LogBook;
