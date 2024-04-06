import Dropdown from "../components/dropdown.tsx";
import Table from "../components/Table.tsx";
import React, {useEffect, useState} from "react";
import {MaintenanceRequest} from "common/src/maintenanceRequest.ts";
import axios from "axios";
function LogBook() {

    // const [interpreterReq, setInterpreterReq] = useState([]);
     const [maintenanceReq, setMaintenanceReq] = useState([]);

     useEffect(() => {
         axios.get("/api/maintenance/").then((response) => {
             setMaintenanceReq(response.data.reverse());
         });
     }, []);
    const [request, setRequest] = useState<MaintenanceRequest>({issue: "", location: "", isUrgent: "", feedback: ""});
    const requestTypeOptions = ["Maintenance", "Interpreter"];
    const [cleared, setCleared] = useState(false);

    // Handle Functions
    function handleRequestType(str: string): void {
        setCleared(false);
        setRequest({...request, location: str});
    }



    return (
        <div className="flex ">
            {/*Form to filter current requests*/}
            <div className=" h-full mx-3 space-y-7">
                <div className="rounded-2xl bg-deep-blue bg-opacity-5">
                <form
                    className="w-[22vw]  flex flex-col items-start p-3">
                    <h2 className={"font-extrabold text-2xl font-HeadlandOne flex items-start pb-3"}>Filter Data</h2>
                    <p className={"text-left font-bold"}>Request Type</p>
                    <Dropdown options={requestTypeOptions} placeholder={"Choose Request Type"}
                              name={"requestTypeDropdown"}
                              id={"dropdown1"} value={cleared}
                              setInput={handleRequestType} required={true}/>
                </form>

                <form
                    className="w-[22vw]  flex flex-col items-start p-3 gap-4">
                    <p className={"text-left font-bold"}>Request Status</p>
                    <Dropdown options={requestTypeOptions} placeholder={"Choose Status"} name={"requestTypeDropdown"}
                              id={"dropdown1"} value={cleared}
                              setInput={handleRequestType} required={true}/>
                </form>

                <form
                    className="w-[22vw] flex flex-col items-start p-3 gap-4">
                    <p className={"text-left font-bold"}>Assigned Staff</p>
                    <Dropdown options={requestTypeOptions} placeholder={"Assigned Staff"} name={"requestTypeDropdown"}
                              id={"dropdown1"} value={cleared}
                              setInput={handleRequestType} required={true}/>
                </form>
                </div>
            {/*Form to assign requests*/}
                <div className="rounded-2xl bg-deep-blue bg-opacity-5">
                <form
                    className="w-[22vw]  flex flex-col items-start p-3 gap-4">
                    <h2 className={"font-extrabold text-2xl font-HeadlandOne flex items-start"}>Assign Staff
                        Request</h2>
                    <p className={"text-left font-bold"}>Request Type</p>
                    <Dropdown options={requestTypeOptions} placeholder={"Choose Request Type"}
                              name={"requestTypeDropdown"}
                              id={"dropdown1"} value={cleared}
                              setInput={handleRequestType} required={true}/>
                </form>

                <form
                    className="w-[22vw] flex flex-col items-start p-3 gap-4">
                    <p className={"text-left font-bold"}>Request Status</p>
                    <Dropdown options={requestTypeOptions} placeholder={"Choose Status"} name={"requestTypeDropdown"}
                              id={"dropdown1"} value={cleared}
                              setInput={handleRequestType} required={true}/>
                </form>

                <form
                    className="w-[22vw]  flex flex-col items-start p-3 gap-4">
                    <p className={"text-left font-bold"}>Assigned Staff</p>
                    <Dropdown options={requestTypeOptions} placeholder={"Assigned Staff"} name={"requestTypeDropdown"}
                              id={"dropdown1"} value={cleared}
                              setInput={handleRequestType} required={true}/>
                </form>
                </div>
            </div>

            {/*Actual Database Table starts here*/}
            <div className="max-h border-solid border-b-[1px] border-deep-blue w-full h-full max-h-400 overflow-auto">
                <Table data={maintenanceReq} headings={["Issue", "Location", "Urgent", "Feedback"]}
                       keys={["issue", "location", "isUrgent", "feedback"]}/>
            </div>

        </div>
    );
}

export default LogBook;
