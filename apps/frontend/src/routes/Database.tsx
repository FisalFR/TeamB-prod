import Dropdown from "../components/dropdown.tsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {forms} from "database/.prisma/client";
import HoverTable from "../components/hoverTable.tsx";
function LogBook() {


    const emptyDate: Date = new Date();
    const [form, setForm] = useState([]);
    const [request, setRequest] = useState<forms>({
        formID: "",
        type: "",
        location: "",
        status: "",
        assignee: "",
        dateCreated: emptyDate
    });
    const [cleared, setCleared] = useState(false);
    const statusTypeOptions = ["Unassigned", "Assigned", "InProgress", "Closed"];
    const staffTypeOptions: string[] = ["Mo", "Colin", "Jade", "Theresa", "Jeremy"];
    const requestTypeOptions: string[] = ["Maintenance", "Language", "Sanitation", "Medicine", "Gift", "Security"];


    // Use Effect that updates the page everytime you input something into the dropdowns in Filter Data
    useEffect(() => {
    axios.post("/api/csvManager/filter", JSON.stringify(request), {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        const reversedData = response.data.reverse();
        setForm(reversedData);
    });
    }, [request]);


    // Handler Functions
    function handleRequestType(str: string): void {
        setCleared(false);
        setRequest({...request, type: str});
    }

        function handleStatusType(str: string): void {
            setCleared(false);
            setRequest({...request, status: str});
        }

        function handleAssigneeType(str: string): void {
            setCleared(false);
            setRequest({...request, assignee: str});
        }

    return (
            <div className="flex py-10">
                {/*Form to filter current requests*/}
                <div className=" h-full mx-3 space-y-7 my-3">
                    <div className="rounded-2xl bg-deep-blue bg-opacity-5">
                        <form
                            className="w-[22vw]  flex flex-col items-start p-3 pl-5">
                            <h2 className={"font-extrabold text-2xl font-HeadlandOne flex items-start pb-3"}>Filter
                                Data</h2>
                            <p className={"text-left font-bold"}>Request Type</p>
                            <Dropdown options={requestTypeOptions} placeholder={"Choose Request Type"}
                                      name={"requestTypeDropdown"}
                                      id={"dropdown1"} value={cleared}
                                      setInput={handleRequestType} required={true}/>
                        </form>

                        <form
                            className="w-[22vw]  flex flex-col items-start p-3 gap-4 pl-5">
                            <p className={"text-left font-bold"}>Request Status</p>
                            <Dropdown options={statusTypeOptions} placeholder={"Choose Status"} name={"statusDropdown"}
                                      id={"dropdown2"} value={cleared}
                                      setInput={handleStatusType} required={true}/>
                        </form>

                        <form
                            className="w-[22vw] flex flex-col items-start p-3 gap-4 pl-5">
                            <p className={"text-left font-bold"}>Assigned Staff</p>
                            <Dropdown options={staffTypeOptions} placeholder={"Assigned Staff"}
                                      name={"requestTypeDropdown3"}
                                      id={"dropdown3"} value={cleared}
                                      setInput={handleAssigneeType} required={true}/>
                        </form>
                    </div>
                </div>

                {/*Actual Database Table starts here*/}
                <div
                    className="max-h border-solid border-b-[1px] border-deep-blue w-full h-full max-h-databasetable overflow-auto mt-3">
                    <HoverTable data={form} headings={["Form ID", "Type", "Location", "Status", "Assignee", "Date Created"]}
                           keys={["formID", "type", "location", "status", "assignee", "dateCreated"]}/>
                </div>

</div>

);
}


export default LogBook;
