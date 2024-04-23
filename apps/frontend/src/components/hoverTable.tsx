import Modal from "./Modal.tsx";
import React, {useEffect, useRef, useState} from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {fullServiceFormType} from "common/src/fullServiceForm.ts";
import {FormType} from "common/src/FormType.ts";
import Dropdown from "./dropdown.tsx";
import LongButton from "./LongButton.tsx";
import Button from "./Button.tsx";



function HoverTable(props:{data: NonNullable<unknown>[]; headings: string[], keys: string[], dataUpdated:boolean, setDataUpdated: React.Dispatch<React.SetStateAction<boolean>>}) {


    function createTableHeader(){
        return props.headings.map((heading) =>
            <th className="border-collapse p-2 border-solid border-t-[0px] border-[1px] border-deep-blue bg-graphite text-bone-white">
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

    function BoldBeforeColon({text}) {
        if (!text){
            return "";
            }
        const [label, value] = text.split(':');
        return (
            <p>
                <b>{label}:</b>{value}
            </p>
        );
    }


    const [open, setOpen] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const[information, setInformation] = useState<string[]>([]);
    const emptyDate: Date = new Date();

    const [employeeOptions, setEmployeeOptions] = useState<string[]>([]);
    useEffect(() => {
        axios.get("/api/employee/").then((response) => {
            const employeeNames: string[] = [];
            for (let i = 0; i < response.data.length; i++) {
                employeeNames.push(response.data[i].firstName);
            }
            setEmployeeOptions(employeeNames);
        });
    }, []);
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
            medicine: [],
            transportationRequests: [],
        };
        try {
            const response = await axios.post("/api/csvManager/filterForms", test,{
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);

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
                        newInformation.push("Personnel #: " + response.data.securityRequests[0].quantity);
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
                    } case "Transportation":{
                        newInformation.push("Transportation Method: " + response.data.transportationRequests[0].transport);
                        newInformation.push("Destination: " + response.data.transportationRequests[0].address);
                        newInformation.push("Additional Comments: " + response.data.transportationRequests[0].feedback);
                    }
                }
                setInformation(newInformation);
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
                <div className="flex flex-row items-center gap-8 p-12 w-fit ">
                    <div>
                        <h1 className="text-3xl font-OpenSans font-extrabold border-b border-b-4 border-deep-blue">Information</h1>
                        <ul className="pt-5 flex flex-col items-start leading-8 max-w-100 text-overflow-ellipsis whitespace-nowrap">
                            <li><b>FormID:</b> {assignment.formID}</li>
                            <li><b>Type:</b> {assignment.type}</li>
                            <li><b>Status:</b> {assignment.status}</li>
                            <li><b>Priority:</b> {assignment.priority}</li>
                            <li><b>Assignee:</b> {assignment.assignee}</li>
                            <li><b>Created By:</b> {assignment.employeeName}</li>
                            <li> <BoldBeforeColon text ={information[6]}/> </li>
                            <li> <BoldBeforeColon text ={information[7]}/> </li>
                            <li> <BoldBeforeColon text ={information[8]}/> </li>
                            <li> <BoldBeforeColon text ={information[9]}/> </li>
                            <li> <BoldBeforeColon text ={information[10]}/> </li>
                            <li> <BoldBeforeColon text ={information[11]}/> </li>
                            <li> <BoldBeforeColon text ={information[12]}/> </li>
                            <li><b> Location: </b> {assignment.location}</li>
                            <li><b> Date Created: </b> {assignment.dateCreated.toString()}</li>
                        </ul>
                    </div>
                    <div>
                    <div className="relative rounded-2xl bg-blue-200 h-fit shadow-lg">
                        <form ref={formRef} onSubmit={e => {
                            e.preventDefault();
                        }}
                              className="w-[22vw] flex flex-col items-start p-3 gap-4 pl-5">
                            <h2 className={"font-extrabold text-2xl font-OpenSans flex items-start"}>Assign Staff
                                Request</h2>
                            <p className={"text-left font-bold"}>Request Status</p>
                            <Dropdown options={statusTypeOptions} placeholder={"Choose Status"}
                                      name={"statusAssignment"}
                                      id={"dropdown5"} value={cleared}
                                      setInput={handleStatusAssignment} required={true}
                                      rounded={"rounded-md"}/>
                            <p className={"text-left font-bold"}>Assigned Staff</p>
                            <Dropdown options={employeeOptions} placeholder={"Assigned Staff"} name={"staffAssignment"}
                                      id={"dropdown6"} value={cleared}
                                      setInput={handleStaffAssignment} required={true}
                                      rounded={"rounded-md"}/>
                            <div className={"flex flex-row pt-2 pb-1 w-full"}>
                                <Button onClick={handleSubmit} children={"Submit"} rounded={"rounded-lg"}/>
                            </div>
                        </form>
                        <div className="absolute bottom-[17px] left-[185px]">
                            <Button onClick={firstDelete} children={"Delete"} rounded={"rounded-lg"}/>
                        </div>

                        </div>
                        <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                            <div className="space-y-2">
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
