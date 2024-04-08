import Dropdown from "../components/dropdown.tsx";
import Table from "../components/Table.tsx";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import LongButton from "../components/LongButton.tsx";
import {forms} from "database/.prisma/client";
import Button from "../components/Button.tsx";
import Modal from "../components/Modal.tsx";
function LogBook() {

    const formRef = useRef<HTMLFormElement>(null);

    const emptyDate: Date = new Date();
    const [form, setForm] = useState([]);
    const [formIDOptions, setFormID] = useState<string[]>([]);
    const [request, setRequest] = useState<forms>({
        formID: "",
        type: "",
        location: "",
        status: "",
        assignee: "",
        dateCreated: emptyDate
    });
    const [assignment, setAssignment] = useState<forms>({
        formID: "",
        type: "",
        location: "",
        status: "",
        assignee: "",
        dateCreated: emptyDate
    });
    const [submitted, setSubmit] = useState<number>(0);
    const [cleared, setCleared] = useState(false);

    const statusTypeOptions = ["Unassigned", "Assigned", "InProgress", "Closed"];
    const staffTypeOptions: string[] = ["Mo", "Colin", "Jade", "Theresa", "Jeremy"];
    const requestTypeOptions: string[] = ["Maintenance", "Language", "Sanitation", "Medicine", "Flower", "Security"];



    function handleSubmit(e: { preventDefault: () => void; }) {
        (formRef.current as HTMLFormElement).requestSubmit();
        e.preventDefault();
        axios.post("/api/csvManager/insert", assignment, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then();
        setSubmit(submitted + 1); // Spaghetti Code to Update the page
        setRequest({  formID: "", type: "", location: "", status: "", assignee: "", dateCreated: emptyDate});
        setCleared(true);
    }

    // Use Effect that updates the page everytime you submit the Assign Staff Request
    useEffect(() => {
        axios.get("/api/csvManager").then((response) => {
            setForm(response.data.reverse());
            const formIDStrings = [];
            for (let i = 0; i < response.data.length; i++) {
                formIDStrings.push(response.data[i].formID);
            }
            setFormID(formIDStrings);
        });
    }, [submitted]);
    
    // Use Effect that updates the page everytime you input something into the dropdowns in Filter Data
    useEffect(() => {
    axios.post("/api/csvManager/filter", JSON.stringify(request), {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        setForm(response.data.reverse());
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

        function handleFormIDAssignment(str: string): void {
            setCleared(false);
            setAssignment({...assignment, formID: str});
        }

        function handleStatusAssignment(str: string): void {
            setCleared(false);
            setAssignment({...assignment, status: str});
        }

        function handleStaffAssignment(str: string): void {
            setCleared(false);
            setAssignment({...assignment, assignee: str});
        }

    const [open, setOpen] = useState<boolean>(false);


    return (
            <div className="flex ">
                {/*Form to filter current requests*/}
                <div className=" h-full mx-3 space-y-7">
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
                    {/*Form to assign requests*/}
                    <div className="rounded-2xl bg-deep-blue bg-opacity-5">
                        <form ref={formRef} onSubmit={e => {
                            e.preventDefault();
                        }}
                              className="w-[22vw]  flex flex-col items-start p-3 gap-4 pl-5">
                            <h2 className={"font-extrabold text-2xl font-HeadlandOne flex items-start"}>Assign Staff
                                Request</h2>
                            <p className={"text-left font-bold"}>Form ID</p>
                            <Dropdown options={formIDOptions} placeholder={"Choose Form ID"}
                                      name={"formIDAssignment"}
                                      id={"dropdown4"} value={cleared}
                                      setInput={handleFormIDAssignment} required={true}/>


                            <p className={"text-left font-bold"}>Request Status</p>
                            <Dropdown options={statusTypeOptions} placeholder={"Choose Status"}
                                      name={"statusAssignment"}
                                      id={"dropdown5"} value={cleared}
                                      setInput={handleStatusAssignment} required={true}/>


                            <p className={"text-left font-bold"}>Assigned Staff</p>
                            <Dropdown options={staffTypeOptions} placeholder={"Assigned Staff"} name={"staffAssignment"}
                                      id={"dropdown6"} value={cleared}
                                      setInput={handleStaffAssignment} required={true}/>

                            <div className={"flex items-center pt-2 pb-4"}>
                                <LongButton onClick={handleSubmit} children={"Submit"}/>
                                <Modal open={open} onClose={() => setOpen(false)}>
                                    <div className="flex flex-col gap-4">
                                        <h1 className="text-2xl">Assigned</h1>
                                    </div>
                                </Modal>
                            </div>
                        </form>
                    </div>
                </div>

                {/*Actual Database Table starts here*/}
                <div
                    className="max-h border-solid border-b-[1px] border-deep-blue w-full h-full max-h-databasetable overflow-auto">
                    <Table data={form} headings={["Form ID", "Type", "Location", "Status", "Assignee", "Date Created"]}
                           keys={["formID", "type", "location", "status", "assignee", "dateCreated"]}/>
                </div>

                <Button onClick={() => setOpen(true)} children={"Open"}/>
                {<Modal open={open} onClose={() => setOpen(false)}>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl">Modal Title</h1>
                        <p>
                            This will grow larger the more text there is to it, This will grow larger the more text there is to it,
                            This will grow larger the more text there is to it, This will grow larger the more text there is to it,
                            This will grow larger the more text there is to it, This will grow larger the more text there is to it,
                            This will grow larger the more text there is to it, This will grow larger the more text there is to it,
                            This will grow larger the more text there is to it, This will grow larger the more text there is to it,
                            This will grow larger the more text there is to it, This will grow larger the more text there is to it,
                            This will grow larger the more text there is to it, This will grow larger the more text there is to it,
                        </p>
                    </div>
                </Modal>
                }

</div>
);
}


export default LogBook;
