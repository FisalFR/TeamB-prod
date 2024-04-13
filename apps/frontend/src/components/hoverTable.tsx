import Modal from "./Modal.tsx";
import React, {useEffect, useRef, useState} from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {fullServiceFormType} from "common/src/fullServiceForm.ts";
import {FormType} from "common/src/FormType.ts";
import Dropdown from "./dropdown.tsx";
import LongButton from "./LongButton.tsx";




function HoverTable(props:{data: NonNullable<unknown>[]; headings: string[], keys: string[]}) {


    function createTableHeader(){
        return props.headings.map((heading) =>
            <th className="border-collapse p-2 border-solid border-t-[0px] border-[1px] border-deep-blue bg-deep-blue text-bone-white">
                {heading}
            </th>

        );}

    function createTableRows(){
        return props.data.map((request) =>
            <motion.tr className="dark:odd:bg-black dark:text-white dark:even:bg-Ash-black dark:hover:bg-blue-900 odd:bg-white even:bg-gray-100 border-b dark:border-gray-700 hover:bg-blue-200 group"
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
                ];
                switch (response.data.type) {
                    case "Maintenance": {
                        newInformation.push("Issue: " + response.data.maintenanceRequests[0].issue);
                        newInformation.push("Feedback: " + response.data.maintenanceRequests[0].feedback);
                        break;
                    }
                    case "Language": {
                        newInformation.push("Language: " + response.data.languageRequests[0].language);
                        break;
                    } case "Sanitation": {
                        newInformation.push("Employee Name: " + response.data.sanitationRequests[0].employeeName);
                        newInformation.push("Issue: " + response.data.sanitationRequests[0].contaminant);
                        newInformation.push("Service Type: " + response.data.sanitationRequests[0].serviceType);
                        newInformation.push("Additional Comments: " + response.data.sanitationRequests[0].additionalComments);
                        break;
                    } case "Security": {
                        newInformation.push("Employee Name: " + response.data.securityRequests[0].employeeName);
                        newInformation.push("Request: " + response.data.securityRequests[0].request);
                        newInformation.push("Number of Personnel Required: " + response.data.securityRequests[0].quantity);
                        newInformation.push("Additional Comments: " + response.data.securityRequests[0].additionalInfo);
                        break;
                    } case "Medicine": {
                        newInformation.push("Employee Name: " + response.data.medicineRequests[0].employeeName);
                        newInformation.push("Medicine: " + response.data.medicineRequests[0].medicine);
                        newInformation.push("Quantity: " + response.data.medicineRequests[0].quantity.toString());
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
                        break;
                    }
                }
                setInformation(newInformation);
                setAssignment({...assignment, assignee: response.data.assignee, type: response.data.type, location: response.data.location,
                    formID: response.data.formID, priority: response.data.priority, status: response.data.status, dateCreated: response.data.dateCreated});
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    const formRef = useRef<HTMLFormElement>(null);
    const [form, setForm] = useState([]);
    const [formIDOptions, setFormID] = useState<string[]>([]);
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
        dateCreated: emptyDate
    });
    const [open2, setOpen2] = useState<boolean>(false);

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

    function handleSubmit(e: { preventDefault: () => void; }) {
        (formRef.current as HTMLFormElement).requestSubmit();
        e.preventDefault();
        axios.post("/api/csvManager/insert", assignment, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            setOpen2(true);
            setCleared(true);
            setSubmit(submitted + 1); // Spaghetti Code to Update the page
            console.log(form);
        });
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
                <div className="dark:bg-Ash-black flex flex-row gap-8 p-12 w-fit ">
                    <div>
                    <h1 className="dark:text-light-white text-3xl">Information</h1>
                        <ul className="dark:bg-Ash-black dark:text-light-white item-start justify-start leading-8 max-w-100">
                            <li>FormID: {assignment.formID}</li>
                            <li>Type: {assignment.type}</li>
                            <li>Status: {assignment.status}</li>
                            <li>Priority: {assignment.priority}</li>
                            <li>Assignee: {assignment.assignee}</li>
                            <li>{information[6]}</li>
                            <li>{information[7]}</li>
                            <li>{information[8]}</li>
                            <li>{information[9]}</li>
                            <li>{information[10]}</li>
                            <li>Location: {assignment.location}</li>
                            <li>Date Created: {assignment.dateCreated.toString()}</li>
                        </ul>
                    </div>
                    <div className="dark:bg-Ash-black rounded-2xl bg-deep-blue bg-opacity-5">
                        <form ref={formRef} onSubmit={e => {
                            e.preventDefault();
                        }}
                              className="w-[22vw]  flex flex-col items-start p-3 gap-4 pl-5">
                            <h2 className={"dark:text-light-white font-extrabold text-2xl font-HeadlandOne flex items-start"}>Assign Staff
                                Request</h2>
                            <p className={"dark:text-light-white text-left font-bold"}>Form ID</p>
                            <Dropdown options={formIDOptions} placeholder={"Choose Form ID"}
                                      name={"formIDAssignment"}
                                      id={"dropdown4"} value={cleared}
                                      setInput={handleFormIDAssignment} required={true}/>


                            <p className={"dark:text-light-white text-left font-bold"}>Request Status</p>
                            <Dropdown options={statusTypeOptions} placeholder={"Choose Status"}
                                      name={"statusAssignment"}
                                      id={"dropdown5"} value={cleared}
                                      setInput={handleStatusAssignment} required={true}/>


                            <p className={"dark:text-light-white text-left font-bold"}>Assigned Staff</p>
                            <Dropdown options={staffTypeOptions} placeholder={"Assigned Staff"} name={"staffAssignment"}
                                      id={"dropdown6"} value={cleared}
                                      setInput={handleStaffAssignment} required={true}/>

                            <div className={"flex items-center pt-2 pb-4"}>
                                <LongButton onClick={handleSubmit} children={"Submit"}/>
                                <Modal open={open2} onClose={() => setOpen2(false)}>
                                    <div className="flex flex-col gap-4">
                                        <h1 className="text-2xl">Success!</h1>
                                        <p>
                                            Assigned
                                        </p>
                                    </div>
                                </Modal>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
            </tbody>
        </table>
    );
}

export default HoverTable;
