import Modal from "./Modal.tsx";
import React, {useState} from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {fullServiceFormType} from "common/src/fullServiceForm.ts";



function HoverTable(props:{data: NonNullable<unknown>[]; headings: string[], keys: string[]}) {


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
            <td className="border-collapse p-2 border-solid border-[1px] border-t-[0px] border-deep-blue group-hover:border-2 group-hover:border-gold-yellow">
                {request[key]}
            </td>

        );}


    const [open, setOpen] = useState<boolean>(false);
    //const [information, setString] = useState<string[]>([]);
    // const [test, setTest] = useState<string>();
    const[information, setInformation] = useState<string[]>([]);
    const emptyDate: Date = new Date();
    // const [assignment, setAssignment] = useState<fullServiceFormType>({
    //     formID: "",
    //     type: "",
    //     location: "",
    //     status: "",
    //     assignee: "",
    //     dateCreated: emptyDate,
    //     maintenances: [],
    //     language: [],
    //     sanitation: [],
    //     securityRequests: [],
    //     giftRequests: [],
    //     medicine: []
    // });


    async function handleRowClick(request){
        setOpen(true);
        const test: fullServiceFormType ={
            formID: request.formID,
            type: request.type,
            location: "",
            status: "",
            assignee: "",
            dateCreated: emptyDate,
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
                console.log(response.data);
                const newInformation: string[] = [
                    "Form ID: " + response.data.formID,
                    "Type: " + response.data.type,
                    "Location: " + response.data.location,
                    "Status: " + response.data.status,
                    "Assignee: " + response.data.assignee,
                    "Date Created: " + new Date(response.data.dateCreated).toISOString(),
                ];

                switch (response.data.type) {
                    case "Maintenance": {
                        newInformation.push("Maintenance Request: " + response.data.maintenanceRequests[0].maintenanceRequest);
                        newInformation.push("Issue: " + response.data.maintenanceRequests[0].issue);
                        newInformation.push("Urgency: " + response.data.maintenanceRequests[0].isUrgent);
                        newInformation.push("Feedback: " + response.data.maintenanceRequests[0].feedback);
                        break;
                    }
                    case "Language": {
                        newInformation.push("Language: " + response.data.languageRequests[0].language);
                        break;
                    } case "Sanitation": {
                        newInformation.push("Employee Name: " + response.data.sanitationRequests[0].employeeName);
                        newInformation.push("Priority: " + response.data.sanitationRequests[0].priority);
                        newInformation.push("Issue: " + response.data.sanitationRequests[0].contaminant);
                        newInformation.push("Service Type: " + response.data.sanitationRequests[0].serviceType);
                        newInformation.push("Additional Comments: " + response.data.sanitationRequests[0].additionalComments);
                        break;
                    } case "Security": {
                        newInformation.push("Employee Name: " + response.data.securityRequests[0].employeeName);
                        newInformation.push("Priority: " + response.data.securityRequests[0].priority);
                        newInformation.push("Request: " + response.data.securityRequests[0].request);
                        newInformation.push("Number of Personnel Required: " + response.data.securityRequests[0].quantity);
                        newInformation.push("Additional Comments: " + response.data.securityRequests[0].additionalInfo);
                        break;
                    } case "Medicine": {
                        newInformation.push("Employee Name: " + response.data.medicineRequests[0].employeeName);
                        newInformation.push("Priority: " + response.data.medicineRequests[0].priority);
                        newInformation.push("Medicine: " + response.data.medicineRequests[0].medicine);
                        newInformation.push("Quantity: " + response.data.medicineRequests[0].quantity.toString());
                        newInformation.push("Additional Comments: " + response.data.medicineRequests[0].additionalComments);
                        break;
                    } case "Gift Delivery": {
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
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    return (
        <table
            className="overflow-scroll border-collapse p-6 border-solid border-[1px] border-t-[0px] border-deep-blue w-full bg-white">
            <thead className="sticky top-0">
            {createTableHeader()}
            </thead>
            <tbody>
            {createTableRows()}
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="flex flex-col gap-4 p-7 w-full ">
                    <h1 className="text-2xl">Information</h1>
                    <ul className="item-start justify-start">
                        <li>{information[0]}</li>
                        <li>{information[1]}</li>
                        <li>{information[2]}</li>
                        <li>{information[3]}</li>
                        <li>{information[4]}</li>
                        <li>{information[5]}</li>
                        <li>{information[6]}</li>
                        <li>{information[7]}</li>
                        <li>{information[8]}</li>
                        <li>{information[9]}</li>
                        <li>{information[10]}</li>
                    </ul>
                </div>
            </Modal>
            </tbody>
        </table>
    );
}

export default HoverTable;
