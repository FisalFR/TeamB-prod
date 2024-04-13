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
        dateCreated: emptyDate,
        priority: ""
    });
    const [cleared, setCleared] = useState(false);
    const statusTypeOptions = ["Unassigned", "Assigned", "InProgress", "Closed"];
    const staffTypeOptions: string[] = ["Mo", "Colin", "Jade", "Theresa", "Jeremy"];
    const [formIDOptions, setFormID] = useState<string[]>([]);
    const [requestTypeOptions, setRequestOptions] = useState<string[]>([]);
    const [locationOptions, setLocation] = useState<string[]>([]);
    const [priorityOptions, setPriority] = useState<string[]>([]);


    const removeDups = (arr: string[]): string[] => {
        return arr.filter((item,
                           index) => item !== "" && arr.indexOf(item) === index);
    };


    useEffect(() => {
        axios.get("/api/csvManager").then((response) => {
            setForm(response.data.reverse());
            const formIDStrings = [];
            const requestStrings = [];
            const locationStrings = [];
            const priorityStrings = [];
            for (let i = 0; i < response.data.length; i++) {
                formIDStrings.push(response.data[i].formID);
                requestStrings.push(response.data[i].type);
                locationStrings.push(response.data[i].location);
                priorityStrings.push(response.data[i].priority);
            }
            setFormID(formIDStrings);
            setRequestOptions(removeDups(requestStrings));
            setLocation(removeDups(locationStrings));
            setPriority(removeDups(priorityStrings));
        });
    }, []);


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

        function handleFormID(str: string): void {
            setCleared(false);
            setRequest({...request, formID: str});
        }

        function handleRequestType(str: string): void {
            setCleared(false);
            setRequest({...request, type: str});
        }

        function handleLocation(str: string): void {
            setCleared(false);
            setRequest({...request, location: str});
        }
        function handleStatusType(str: string): void {
            setCleared(false);
            setRequest({...request, status: str});
        }

        function handleAssigneeType(str: string): void {
            setCleared(false);
            setRequest({...request, assignee: str});
        }

    function handlePriority(str: string): void {
        setCleared(false);
        setRequest({...request, priority: str});
    }

    return (
            <div className="flex py-10">
                {/*Form to filter current requests*/}
                <div className=" h-full mx-3 space-y-7 my-3">
                    <div className="rounded-2xl bg-deep-blue bg-opacity-5">
                        <form
                            className="w-[22vw]  flex flex-col items-start p-3 pl-5">
                            <h2 className={"dark:text-light-white font-extrabold text-2xl font-HeadlandOne flex items-start pb-3"}>Filter
                                Data</h2>


                            <p className={"dark:text-light-white text-left font-bold"}>Form ID</p>
                            <Dropdown options={formIDOptions} placeholder={"Choose FormID"}
                                      name={"formIDDropdown"}
                                      id={"dropdown1"} value={cleared}
                                      setInput={handleFormID} required={true}/>
                        </form>

                        <form
                            className="w-[22vw] flex flex-col items-start p-3 gap-4 pl-5">
                            <p className={"dark:text-light-white text-left font-bold"}>Request Type</p>
                            <Dropdown options={requestTypeOptions} placeholder={"Choose Request Type"}
                                      name={"requestTypeDropdown"}
                                      id={"dropdown2"} value={cleared}
                                      setInput={handleRequestType} required={true}/>
                        </form>

                        <form
                            className="w-[22vw] flex flex-col items-start p-3 gap-4 pl-5">
                            <p className={"dark:text-light-white text-left font-bold"}>Location</p>
                            <Dropdown options={locationOptions} placeholder={"Choose Location"}
                                      name={"locationDropdown"}
                                      id={"dropdown3"} value={cleared}
                                      setInput={handleLocation} required={true}/>
                        </form>

                        <form
                            className="w-[22vw]  flex flex-col items-start p-3 gap-4 pl-5">
                            <p className={"dark:text-light-white text-left font-bold"}>Request Status</p>
                            <Dropdown options={statusTypeOptions} placeholder={"Choose Status"} name={"statusDropdown"}
                                      id={"statusDropdown"} value={cleared}
                                      setInput={handleStatusType} required={true}/>
                        </form>

                        <form
                            className="w-[22vw] flex flex-col items-start p-3 gap-4 pl-5">
                            <p className={"dark:text-light-white text-left font-bold"}>Assigned Staff</p>
                            <Dropdown options={staffTypeOptions} placeholder={"Assigned Staff"}
                                      name={"staffDropdown"}
                                      id={"dropdown5"} value={cleared}
                                      setInput={handleAssigneeType} required={true}/>
                        </form>

                        <form
                            className="w-[22vw] flex flex-col items-start p-3 gap-4 pl-5">
                            <p className={"dark:text-light-white text-left font-bold"}>Priority</p>
                            <Dropdown options={priorityOptions} placeholder={"Choose Priority"}
                                      name={"priorityDropdown"}
                                      id={"dropdown6"} value={cleared}
                                      setInput={handlePriority} required={true}/>
                        </form>

                    </div>
                </div>

                {/*Actual Database Table starts here*/}
                <div
                    className="max-h border-solid border-b-[1px] border-deep-blue w-full h-full max-h-databasetable overflow-auto mt-3">
                    <HoverTable data={form}
                                headings={["Form ID", "Type", "Location", "Status", "Assignee", "priority", "Date Created"]}
                                keys={["formID", "type", "location", "status", "assignee", "priority", "dateCreated"]}/>
                </div>

            </div>

    );
}


export default LogBook;
