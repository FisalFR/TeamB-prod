import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table.tsx";

function LogBook() {

    const [interpreterReq, setInterpreterReq] = useState([]);
    const [maintenanceReq, setMaintenanceReq] = useState([]);
    const [medicineReq, setMedicineReq] = useState([]);

    useEffect(() => {

        axios.get("/api/languageInterpreter/").then((response) => {
            setInterpreterReq(response.data.reverse());
        });
        axios.get("/api/maintenance/").then((response) => {
            setMaintenanceReq(response.data.reverse());
        });
        axios.get("/api/medicine/").then((response) => {
            setMedicineReq(response.data.reverse());
        });
    }, []);

    return (
        <div className="dark:bg-black overflow-auto pb-12">
            <h2 className={"dark:text-white text-3xl font-HeadlandOne py-4"}>Log Book</h2>

            <h2 className={"dark:text-white text-2xl font-HeadlandOne py-4"}>Interpreter Requests</h2>
            <div className="max-h-[60vh] overflow-auto border-solid border-b-[1px] border-deep-blue">
                <Table data={interpreterReq} headings={["Language", "Location"]}
                       keys={["language", "location"]}/>
            </div>
            <br/>
            <h2 className={"dark:text-white text-2xl font-HeadlandOne py-4"}>Maintenance Requests</h2>
            <div className="max-h-[60vh] overflow-auto border-solid border-b-[1px] border-deep-blue">
                <Table data={maintenanceReq} headings={["Issue", "Location", "Urgent", "Feedback"]}
                       keys={["issue", "location", "isUrgent", "feedback"]}/>
            </div>

            <br/>

            <h2 className={"dark:text-white text-2xl font-HeadlandOne py-4"}>Medicine Requests</h2>
            <div className="max-h-[60vh] overflow-auto border-solid border-b-[1px] border-deep-blue">
                <Table data={medicineReq} headings={["Employee Name", "Priority", "Location", "Medicine", "Quantity", "Additional Comments"]}
                       keys={["employeeName", "priority", "location", "medicine", "quantity", "additionalComments"]}/>
            </div>
        </div>
    );
}

export default LogBook;
