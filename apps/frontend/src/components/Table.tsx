import Modal from "./Modal.tsx";
import React, {useState} from "react";
import { motion } from "framer-motion";



function Table(props:{data: NonNullable<unknown>[]; headings: string[], keys: string[]}) {


    function createTableHeader(){
        return props.headings.map((heading) =>
            <th className="border-collapse p-2 border-solid border-t-[0px] border-[1px] border-deep-blue bg-deep-blue text-bone-white">
                {heading}
            </th>

        );}

    function createTableRows(){
        return props.data.map((request) =>
            <motion.tr className="odd:bg-white even:bg-gray-100 border-b dark:border-gray-700 hover:bg-blue-200 "
                   onClick={()=> handleRowClick()}
                       whileHover={{scale: 1.01}}
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

    function handleRowClick(){
        setOpen(true);
    }

    // function tableInformation(){
    //
    // }

    return (
        <table
            className="overflow-scroll border-collapse p-6 border-solid border-[1px] border-t-[0px] border-deep-blue w-full bg-white">
            <thead className="sticky top-0">
            {createTableHeader()}
            </thead>
            <tbody>
                {createTableRows()}
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl">Success!</h1>
                    <p>
                        {/*{tableInformation()}*/}
                    </p>
                </div>
            </Modal>;
            </tbody>
        </table>
    );
}

export default Table;
