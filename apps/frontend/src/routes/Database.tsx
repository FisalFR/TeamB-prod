import Dropdown from "../components/dropdown.tsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {forms} from "database/.prisma/client";
import HoverTable from "../components/hoverTable.tsx";
import formType from "common/src/FormType.ts";
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
    const [staffTypeOptions, setEmployeeOptions] = useState<string[]>([]);
    const [formIDOptions, setFormID] = useState<string[]>([]);
    const [requestTypeOptions, setRequestOptions] = useState<string[]>([]);
    const [statusTypeOptions, setTypeOptions] = useState<string[]>([]);
    const [locationOptions, setLocation] = useState<string[]>([]);
    const [priorityOptions, setPriority] = useState<string[]>([]);
    const [createdByOptions, setCreatedBy] = useState<string[]>([]);
    const [dataUpdated, setDataUpdated] = useState<boolean>(false);


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
            const statusStrings = [];
            const createdByStrings = [];
            const assignedByStrings = [];
            for (let i = 0; i < response.data.length; i++) {
                formIDStrings.push(response.data[i].formID);
                requestStrings.push(response.data[i].type);
                locationStrings.push(response.data[i].location);
                statusStrings.push(response.data[i].status);
                priorityStrings.push(response.data[i].priority);
                createdByStrings.push(response.data[i].employeeName);
                assignedByStrings.push(response.data[i].assignee);
            }
            setFormID(formIDStrings);
            setRequestOptions(removeDups(requestStrings));
            setLocation(removeDups(locationStrings));
            setTypeOptions(removeDups(statusStrings));
            setPriority(removeDups(priorityStrings));
            setCreatedBy(removeDups(createdByStrings));
            setEmployeeOptions(removeDups(assignedByStrings));
            setDataUpdated(false);
        });
    }, [dataUpdated]);


    // Use Effect that updates the page everytime you input something into the dropdowns in Filter Data
    useEffect(() => {
    axios.post("/api/csvManager/filter", JSON.stringify(request), {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        const reversedData = response.data.reverse();
        setForm(reversedData);
        const formIDStrings = reversedData.map((item: formType) => item.formID);
        const typeStrings = reversedData.map((item: formType) => item.type);
        const locationStrings = reversedData.map((item: formType) => item.location);
        const statusStrings = reversedData.map((item: formType) => item.status);
        const priorityStrings = reversedData.map((item: formType) => item.priority);
        const createdStrings = reversedData.map((item: formType) => item.employeeName);
        const assignedStrings = reversedData.map((item: formType) => item.assignee);


        setFormID(formIDStrings);
        setRequestOptions(removeDups(typeStrings));
        setLocation(removeDups(locationStrings));
        setTypeOptions(removeDups(statusStrings));
        setPriority(removeDups(priorityStrings));
        setCreatedBy(removeDups(createdStrings));
        setEmployeeOptions(removeDups(assignedStrings));

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

    function handleCreatedBy(str: string): void {
        setCleared(false);
        setRequest({...request, employeeName: str});
    }

    function clearAll(){
            setRequest({ formID: "",
                type: "",
                location: "",
                status: "",
                assignee: "",
                dateCreated: emptyDate,
                priority: ""});
            setCleared(true);
        setDataUpdated(true);
    }

    return (
            <div className="flex bg-light-white max-h-[92%] overflow-hidden">
                {/*Form to filter current requests*/}
                <div className="mx-3 space-y-1 my-3">
                    <a onClick={clearAll}
                       className="font-medium text-blue-600 dark:text-blue-500 hover:underline absolute top-[84px] left-60 ">Clear
                        Filter</a>
                    <div className="">
                        <h2 className={"font-extrabold border-b-[2px] border-black text-3xl font-OpenSans flex items-start pl-5 pb-2"}>Filter
                            Data</h2>
                        <form
                            className="w-[22vw]  flex flex-col items-start p-2 pl-5 pt-5">


                            <p className={"text-left font-bold"}>Form ID</p>
                            <Dropdown options={formIDOptions} placeholder={"Choose FormID"}
                                      name={"formIDDropdown"}
                                      id={"dropdown1"} value={cleared}
                                      color={"bg-deep-blue bg-opacity-5"}
                                      rounded={"rounded-md"}
                                      setInput={handleFormID} required={true}/>
                        </form>

                        <form
                            className="w-[22vw] flex flex-col items-start p-2 pl-5">
                            <p className={"text-left font-bold"}>Request Type</p>
                            <Dropdown options={requestTypeOptions} placeholder={"Choose Request Type"}
                                      name={"requestTypeDropdown"}
                                      id={"dropdown2"} value={cleared}
                                      color={"bg-deep-blue bg-opacity-5"}
                                      rounded={"rounded-md"}
                                      setInput={handleRequestType} required={true}/>
                        </form>

                        <form
                            className="w-[22vw] flex flex-col items-start p-2 pl-5">
                            <p className={"text-left font-bold"}>Location</p>
                            <Dropdown options={locationOptions} placeholder={"Choose Location"}
                                      name={"locationDropdown"}
                                      id={"dropdown3"} value={cleared}
                                      color={"bg-deep-blue bg-opacity-5"}
                                      rounded={"rounded-md"}
                                      setInput={handleLocation} required={true}/>
                        </form>

                        <form
                            className="w-[22vw]  flex flex-col items-start p-2 pl-5">
                            <p className={"text-left font-bold"}>Request Status</p>
                            <Dropdown options={statusTypeOptions} placeholder={"Choose Status"} name={"statusDropdown"}
                                      id={"statusDropdown"} value={cleared}
                                      color={"bg-deep-blue bg-opacity-5"}
                                      rounded={"rounded-md"}
                                      setInput={handleStatusType} required={true}/>
                        </form>

                        <form
                            className="w-[22vw] flex flex-col items-start p-2 pl-5">
                            <p className={"text-left font-bold"}>Assigned Staff</p>
                            <Dropdown options={staffTypeOptions} placeholder={"Choose Assignee"}
                                      name={"staffDropdown"}
                                      id={"dropdown5"} value={cleared}
                                      color={"bg-deep-blue bg-opacity-5"}
                                      rounded={"rounded-md"}
                                      setInput={handleAssigneeType} required={true}/>
                        </form>

                        <form
                            className="w-[22vw] flex flex-col items-start p-2 pl-5">
                            <p className={"text-left font-bold"}>Created By</p>
                            <Dropdown options={createdByOptions} placeholder={"Choose Created By"}
                                      name={"createdDropdown"}
                                      id={"dropdown7"} value={cleared}
                                      color={"bg-deep-blue bg-opacity-5"}
                                      rounded={"rounded-md"}
                                      setInput={handleCreatedBy} required={true}/>
                        </form>

                        <form
                            className="w-[22vw] flex flex-col items-start p-2 pb-5 pl-5">
                            <p className={"text-left font-bold"}>Priority</p>
                            <Dropdown options={priorityOptions} placeholder={"Choose Priority"}
                                      name={"priorityDropdown"}
                                      id={"dropdown6"} value={cleared}
                                      color={"bg-deep-blue bg-opacity-5"}
                                      rounded={"rounded-md"}
                                      maxHeight={"max-h-24"}
                                      setInput={handlePriority} required={true}/>
                        </form>
                    </div>
                </div>

                {/*Actual Database Table starts here*/}
                <div
                    className="border-solid border-b-[1px] border-deep-blue w-full max-h-[50%] overflow-y-auto">
                <HoverTable data={form}
                                headings={["Form ID", "Type", "Location", "Status", "Assignee", "Created By", "Priority", "Date Created"]}
                                keys={["formID", "type", "location", "status", "assignee", "employeeName", "priority", "dateCreated"]}
                                dataUpdated={dataUpdated} setDataUpdated={setDataUpdated}/>
                </div>

            </div>
    );
}


export default LogBook;
