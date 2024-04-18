import Modal from "./Modal.tsx";
import React, {useEffect, useRef, useState} from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {fullServiceFormType} from "common/src/fullServiceForm.ts";
import {FormType} from "common/src/FormType.ts";
import Dropdown from "./dropdown.tsx";
import LongButton from "./LongButton.tsx";



function HoverTable(props:{data: NonNullable<unknown>[]; headings: string[], keys: string[], dataUpdated:boolean, setDataUpdated: React.Dispatch<React.SetStateAction<boolean>>}) {


    function createTableHeader(){
        return props.headings.map((heading) =>
            <th className="border-collapse p-2 border-solid border-t-[0px] border-[1px] border-deep-blue bg-deep-blue text-bone-white">
                {heading}
            </th>

        );}

    function createTableRows(){
        return props.data.map((request) =>
            <motion.tr className="odd:bg-white even:bg-gray-100 border-b dark:border-gray-700 hover:bg-blue-200 group"
                       onClick={()=> handleRowClick(request)}
                //whileHover={{scale: 1.01}}
                       whileTap={{scale: 0.9}}>
                {createRow(request)}
            </motion.tr>

        );}
    function createRow(request){
        return props.keys.map((key) =>
            <td className="border-collapse p-2 border-solid border-[1px] border-t-[0px] border-deep-blue">
                {request[key]}
            </td>

        );}


    const [open, setOpen] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const[information, setInformation] = useState<string[]>([]);
    const emptyDate: Date = new Date();


    async function handleRowClick(request){
        setOpen(true);
        const test: fullServiceFormType ={
            formID: request.formID,
            type: request.type,
            location: "",
            status: "",
            assignee: "",
            dateCreated: emptyDate,
            priority: "",
            employeeName: request.employeeName,
            maintenances: [],
            language: [],
            sanitation: [],
            securityRequests: [],
            giftRequests: [],
            medicine: []
        };
        try {
            const response = await axios.post("/api/csvManager/filterForms", test,{
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data) {
                const newInformation: string[] = [
                    "Form ID: " + response.data.formID,
                    "Type: " + response.data.type,
                    "Location: " + response.data.location,
                    "Status: " + response.data.status,
                    "Assignee: " + response.data.assignee,
                    "Priority: " + response.data.priority,
                    "Employee Name: " + response.data.employeeName,
                ];
                switch (response.data.type) {
                    case "Maintenance": {
                        newInformation.push("Issue: " + response.data.maintenanceRequests[0].issue);
                        newInformation.push("Feedback: " + response.data.maintenanceRequests[0].feedback);
                        break;
                    }
                    case "Language": {
                        newInformation.push("Language: " + response.data.languageRequests[0].language);
                        newInformation.push("Feedback: " + response.data.languageRequests[0].feedback);
                        break;
                    } case "Sanitation": {
                        newInformation.push("Issue: " + response.data.sanitationRequests[0].contaminant);
                        newInformation.push("Service Type: " + response.data.sanitationRequests[0].serviceType);
                        newInformation.push("Additional Comments: " + response.data.sanitationRequests[0].additionalComments);
                        break;
                    } case "Security": {
                        newInformation.push("Request: " + response.data.securityRequests[0].request);
                        newInformation.push("Number of Personnel Required: " + response.data.securityRequests[0].quantity);
                        newInformation.push("Additional Comments: " + response.data.securityRequests[0].additionalInfo);
                        break;
                    } case "Medicine": {
                        newInformation.push("Medicine: " + response.data.medicineRequests[0].medicine);
                        newInformation.push("Quantity: " + response.data.medicineRequests[0].quantity);
                        newInformation.push("Additional Comments: " + response.data.medicineRequests[0].additionalComments);
                        break;
                    } case "Gift": {
                        const cart: string[] = [];
                        let totalCost: number = 0;
                        for (let i = 0; i <  response.data.giftRequests[0].cart.length; i++){
                            cart.push(response.data.giftRequests[0].cart[i].name + " (" + response.data.giftRequests[0].cart[i].quantity + ")");
                            totalCost += response.data.giftRequests[0].cart[i].cost;
                        }
                        newInformation.push("Cart: " + cart.toString());
                        newInformation.push("Total Cost: $" + Math.round(totalCost).toString());
                        newInformation.push("Message: " + response.data.giftRequests[0].message);
                        newInformation.push("Recipient: " + response.data.giftRequests[0].receiverName);
                        newInformation.push("Sender: " + response.data.giftRequests[0].senderName);
                        newInformation.push("Delivery Date: " + response.data.giftRequests[0].date);
                        break;
                    }
                }
                setInformation(newInformation);
                console.log(newInformation);
                setAssignment({...assignment, assignee: response.data.assignee, type: response.data.type, location: response.data.location,
                    formID: response.data.formID, priority: response.data.priority, status: response.data.status, dateCreated: response.data.dateCreated, employeeName: response.data.employeeName});
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    const formRef = useRef<HTMLFormElement>(null);
    // const [form, setForm] = useState([]);
    // const [formIDOptions, setFormID] = useState<string[]>([]);
    const [submitted, setSubmit] = useState<number>(0);
    const [cleared, setCleared] = useState(false);
    const statusTypeOptions = ["Unassigned", "Assigned", "InProgress", "Closed"];
    const staffTypeOptions: string[] = ["Mo", "Colin", "Jade", "Theresa", "Jeremy"];
    const [assignment, setAssignment] = useState<FormType>({
        formID: "",
        type: "",
        location: "",
        status: "",
        assignee: "",
        dateCreated: emptyDate,
        employeeName: "",
    });


    function handleStatusAssignment(str: string): void {
        setCleared(false);
        setAssignment({...assignment, status: str});
    }

    function handleStaffAssignment(str: string): void {
        setCleared(false);
        setAssignment({...assignment, assignee: str});
    }

    useEffect(() => {
        axios.get("/api/csvManager").then((response) => {
            // setForm(response.data.reverse());
            const formIDStrings = [];
            for (let i = 0; i < response.data.length; i++) {
                formIDStrings.push(response.data[i].formID);
            }
        });
    }, [submitted]);

    function handleSubmit(e: { preventDefault: () => void; }) {
        (formRef.current as HTMLFormElement).requestSubmit();
        e.preventDefault();
        axios.post("/api/csvManager/update", assignment, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            setCleared(true);
            setSubmit(submitted + 1); // Spaghetti Code to Update the page
            setOpen(close);
            props.setDataUpdated(true);
        });
    }

    function handleDelete() {
        axios.post("/api/csvManager/delete", assignment, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            setOpenDelete(close);
            setOpen(close);
            setCleared(true);
            setSubmit(submitted + 1); // Spaghetti Code to Update the page
            props.setDataUpdated(true);
        });
    }

    function firstDelete(){
        setOpenDelete(open);
    }


    return (
        <table
            className="overflow-scroll border-collapse p-6 border-solid border-[1px] border-t-[0px] border-deep-blue w-full bg-white">
            <thead className="sticky top-0">
            {createTableHeader()}
            </thead>
            <tbody>
            {createTableRows()}
            <Modal open={open} onClose={() => setOpen(false) }>
                <div className="flex flex-row gap-8 p-12 w-fit ">
                    <div>
                        <h1 className="text-3xl">Information</h1>
                        <ul className="item-start justify-start leading-8 max-w-100">
                            <li>FormID: {assignment.formID}</li>
                            <li>Type: {assignment.type}</li>
                            <li>Status: {assignment.status}</li>
                            <li>Priority: {assignment.priority}</li>
                            <li>Assignee: {assignment.assignee}</li>
                            <li>Created By: {assignment.employeeName}</li>
                            <li>{information[6]}</li>
                            <li>{information[7]}</li>
                            <li>{information[8]}</li>
                            <li>{information[9]}</li>
                            <li>{information[10]}</li>
                            <li>{information[11]}</li>
                            <li>{information[12]}</li>
                            <li>Location: {assignment.location}</li>
                            <li>Date Created: {assignment.dateCreated.toString()}</li>
                        </ul>
                    </div>
                    <div className="rounded-2xl bg-deep-blue bg-opacity-5">
                        <form ref={formRef} onSubmit={e => {
                            e.preventDefault();
                        }}
                              className="w-[22vw]  flex flex-col items-start p-3 gap-4 pl-5">
                            <h2 className={"font-extrabold text-2xl font-HeadlandOne flex items-start"}>Assign Staff
                                Request</h2>
                            <p className={"text-left font-bold"}>Request Status</p>
                            <Dropdown options={statusTypeOptions} placeholder={"Choose Status"}
                                      name={"statusAssignment"}
                                      id={"dropdown5"} value={cleared}
                                      setInput={handleStatusAssignment} required={true}/>
                            <p className={"text-left font-bold"}>Assigned Staff</p>
                            <Dropdown options={staffTypeOptions} placeholder={"Assigned Staff"} name={"staffAssignment"}
                                      id={"dropdown6"} value={cleared}
                                      setInput={handleStaffAssignment} required={true}/>
                            <div className={"flex flex-col pt-8 pb-4 pr-4 w-full"}>
                                <LongButton onClick={handleSubmit} children={"Submit"}/>
                            </div>
                        </form>
                        <div className={"flex flex-col p-3 gap-4 pl-5 pb-4 pr-7 w-full "}>
                            <LongButton onClick={firstDelete} children={"Delete Request"}/>
                        </div>
                        <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                            <div className="flex flex-col gap-4">
                                <h1 className="text-2xl">Are you sure?</h1>
                                <LongButton onClick={handleDelete} children={"Delete Request"}/>
                            </div>
                        </Modal>
                    </div>
                </div>
            </Modal>
            </tbody>
        </table>
    );
}

export default HoverTable;
