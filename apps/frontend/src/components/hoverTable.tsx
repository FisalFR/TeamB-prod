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
    const [test, setTest] = useState<string>();
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
    function handleRowClick(request){
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
        axios.post("/api/csvManager/filterForms", test,{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setTest(response.data);
            //setAssignment(response.data);
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
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="flex flex-col gap-4 p-7 w-full ">
                    <h1 className="text-2xl">Information</h1>
                    {/*<ul className="item-start justify-start">*/}
                    {/*    <li>{information[0]}</li>*/}
                    {/*    <li>{information[1]}</li>*/}
                    {/*    <li>{information[2]}</li>*/}
                    {/*    <li>{information[3]}</li>*/}
                    {/*    <li>{information[4]}</li>*/}
                    {/*    <li>{information[5]}</li>*/}
                    {/*    <li>{information[6]}</li>*/}
                    {/*    <li>{information[7]}</li>*/}
                    {/*    <li>{information[8]}</li>*/}
                    {/*    <li>{information[9]}</li>*/}
                    {/*    <li>{information[10]}</li>*/}

                    {/*</ul>*/}<p className="overflow-auto">{test}</p>
                </div>
            </Modal>
            </tbody>
        </table>
    );
}

export default HoverTable;
