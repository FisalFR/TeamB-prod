// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Table from "../components/Table.tsx";

import Dropdown from "../components/dropdown.tsx";
import {useState} from "react";
import {MaintenanceRequest} from "common/src/maintenanceRequest.ts";

function LogBook() {

    // const [interpreterReq, setInterpreterReq] = useState([]);
    // const [maintenanceReq, setMaintenanceReq] = useState([]);
    //
    // useEffect(() => {
    //
    //     axios.get("/api/languageInterpreter/").then((response) => {
    //         setInterpreterReq(response.data.reverse());
    //     });
    //     axios.get("/api/maintenance/").then((response) => {
    //         setMaintenanceReq(response.data.reverse());
    //     });
    // }, []);
    const [request, setRequest] = useState<MaintenanceRequest>({issue: "", location: "", isUrgent: "", feedback: ""});
    const requestTypeOptions = ["Maintenance", "Interpreter"];
    const [cleared, setCleared] = useState(false);

    // Handle Functions
    function handleRequestType(str: string): void {
        setCleared(false);
        setRequest({...request, location: str});
    }



    return (
        <div className="">
            <h2 className={"font-extrabold text-3xl font-HeadlandOne"}>Filter Data</h2>

            <form
                className="border-solid border-deep-blue border-r-2 w-[30vw] h-full flex flex-col items-start p-10 gap-4">
                <p className={"text-left font-bold"}>Request Type</p>
                <Dropdown options={requestTypeOptions} placeholder={"Choose Request Type"} name={"requestTypeDropdown"}
                          id={"dropdown1"} value={cleared}
                          setInput={handleRequestType} required={true}/>
            </form>

            <form
                className="border-solid border-deep-blue border-r-2 w-[30vw] h-full flex flex-col items-start p-10 gap-4">
                <p className={"text-left font-bold"}>Request Status</p>
                <Dropdown options={requestTypeOptions} placeholder={"Choose Status"} name={"requestTypeDropdown"}
                          id={"dropdown1"} value={cleared}
                          setInput={handleRequestType} required={true}/>
            </form>

            <form
                className="border-solid border-deep-blue border-r-2 w-[30vw] h-full flex flex-col items-start p-10 gap-4">
                <p className={"text-left font-bold"}>Assigned Staff</p>
                <Dropdown options={requestTypeOptions} placeholder={"Assigned Staff"} name={"requestTypeDropdown"}
                          id={"dropdown1"} value={cleared}
                          setInput={handleRequestType} required={true}/>
            </form>

        </div>
    );
}

export default LogBook;
