import React, {useRef, useState, ChangeEvent} from "react";
import {MedicineRequestType} from "../../../../packages/common/src/MedicineRequestType.ts";
import Button from "../components/Button.tsx"s
import RadioButton from "../components/RadioButton.tsx";
import Dropdown from "../components/dropdown.tsx";
import Table from "../components/Table.tsx";

export function MedicineRequest(){
    const [request, setRequest] = useState<MedicineRequestType>({
        employeeName: "",
        priority: "",
        location: "",
        medicine: "",
        quantity: 0,
        additionalComments: "",
    });
    const[requestList, setRequestList] = useState<MedicineRequestType[]>([]);

    const [submittedWindowVisibility, setSubmittedWindowVisibility] = useState({
        formScreen: "block",
        submittedScreen: "hidden"
    });
    const [cleared, setCleared] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const locationOptions: string[] = ["Day Surgery Family Waiting", "Pre-Op PACU", "Radiation Oncology TX Suite", "Ultrasound", "Medical Records Conference Room", "Abrams Conference Room", "Outpatient Fluoroscopy (Xray)", "Anesthesia Conference Room", "Helen Hogan Conference Room", "Nuclear Medicine", "Cross-Sectional Interventional Radiology (CSIR) MRI", "Volunteers"];
    const medicineOptions: string[] = ["Tylenol", "Ibuprofen", "Nyquill"];

    function handleSubmit(e: { preventDefault: () => void; }) {
        (formRef.current as HTMLFormElement).requestSubmit();
        e.preventDefault();
        if ((formRef.current as HTMLFormElement).checkValidity()) {
            setCleared(true);
            setSubmittedWindowVisibility({formScreen: "hidden", submittedScreen: "block"});
        }

        requestList.push(request);
    }

    function handleClear(e: { preventDefault: () => void; }): void {
        e.preventDefault();
        setRequest({employeeName: "",
            priority: "",
            location: "",
            medicine: "",
            quantity: 0,
            additionalComments: ""});
        // use resetActive from Dropdown?
        setCleared(true);

    }


    function handleNameInput(e: ChangeEvent<HTMLInputElement>): void{
        setRequest({...request, employeeName: e.target.value});
    }

    function handlePriorityInput(e: ChangeEvent<HTMLInputElement>): void {
        setRequest({...request, priority: e.target.value});
    }

    function handleLocationInput(str: string): void {
        setCleared(false);
        setRequest({...request, location: str});
    }

    function handleMedicineInput(str: string): void {
        setCleared(false);
        setRequest({...request, medicine: str});
    }

    // function handleUrgentCheck(e: ChangeEvent<HTMLInputElement>): void {
    //     setRequest({...request, isUrgent: e.target.value});
    // }

    function handleFeedbackInput(e: ChangeEvent<HTMLTextAreaElement>): void {
        setRequest({...request, additionalComments: e.target.value});
    }

    function handleNewSubmission(): void {
        setSubmittedWindowVisibility({formScreen: "block", submittedScreen: "hidden"});
        setRequest({employeeName: "",
            priority: "",
            location: "",
            medicine: "",
            quantity: 0,
            additionalComments: ""});
        setCleared(false);
    }

    return(

        <div className="centerContent">
            <div className={submittedWindowVisibility.formScreen}>
                <h1 className={"text-3xl font-HeadlandOne py-4"}>Medicine Delivery Request</h1>
                <p>Fill out the form below to schedule a medicine delivery</p>


                <form ref={formRef} onSubmit={e => {
                    e.preventDefault();
                }}>
                    <div className="formTest w-full my-10 grid grid-cols-2 gap-24">
                        <div>
                            <p className={"text-left font-bold"}>Employee Name</p>
                            <input type="text" required
                                   onChange={handleNameInput} value={request.employeeName}
                                   placeholder={"Name"}
                                   className={"border-solid border-deep-blue border-2 rounded overflow-hidden flex items-start p-2"}/>

                            <br/>


                            <p className={"text-left font-bold "}>What is the priority of this request?</p>
                            <div className={"border-solid border-deep-blue border-2 rounded"}>
                                <RadioButton value={"Low"} name={"priority"} id={"priority1"} state={request.priority}
                                             onChange={handlePriorityInput} required={true}/>
                                <RadioButton value={"Medium"} name={"priority"} id={"priority2"} state={request.priority}
                                             onChange={handlePriorityInput} required={true}/>
                                <RadioButton value={"High"} name={"priority"} id={"priority3"} state={request.priority}
                                             onChange={handlePriorityInput} required={true}/>
                                <RadioButton value={"Emergency"} name={"priority"} id={"priority4"} state={request.priority}
                                             onChange={handlePriorityInput} required={true}/>
                            </div>

                            <br/>

                            <p className={"text-left font-bold"}>Destination of Delivery?</p>
                            <div className={"border-solid border-deep-blue border-2 rounded"}>
                                <Dropdown options={locationOptions} placeholder={"Location"} name={"locationDropdown"}
                                          id={"dropdown1"} value={cleared}
                                          setInput={handleLocationInput} required={true}/>
                            </div>
                            <br/>

                            <p className={"text-left font-bold"}>Medication</p>
                            <div className={"border-solid border-deep-blue border-2 rounded"}>
                                <Dropdown options={medicineOptions} placeholder={"Medicine"} name={"medicineDropdown"}
                                          id={"dropdown2"} value={cleared}
                                          setInput={handleMedicineInput} required={true}/>
                            </div>
                        </div>
                        <div>

                            <p className={"text-left font-bold"}>Quantity</p>
                            <input
                                className={"border-solid border-deep-blue border-2 rounded overflow-hidden flex items-start p-2"}
                                type="number" required/>

                            <br/>

                            <label htmlFor={"feedback"} className={"flex w-full text-left font-bold"}>Additional
                                Comments</label>
                            <textarea id={"feedback"}
                                      className={"w-full max-w-full h-28 max-h-28 p-1 border-solid border-deep-blue border-2 rounded"}
                                      onChange={handleFeedbackInput}
                                      value={request.additionalComments} required={true}
                                      placeholder="Enter detailed description here..."/><br/>

                            <br/>
                        </div>
                    </div>

                    <div className={"formButtons flex-auto object-center space-x-5"}>
                        <Button onClick={handleSubmit} children={"Submit"}/>
                        <Button onClick={handleClear} children={"Clear"}/>
                    </div>

                </form>
            </div>

            <div className={submittedWindowVisibility.submittedScreen}>

                <div className="p-6 bg-white rounded-2xl">
                    <p className="font-HeadlandOne p-3 text-xl">Thank you for submitting!</p>
                    <Button onClick={handleNewSubmission} children="Submit a new request"/>
                </div>

                <div className={"text-left"}>
                    <h3 className={"p-3 text-lg text-center font-HeadlandOne mt-3"}>Previous Form Submission:</h3>
                    <p className={"font-bold"}>Employee Name:</p>
                    <p className={""}>{request.employeeName}</p>

                    <p className={"font-bold"}>Priority Level:</p>
                    <p className={""}>{request.priority}</p>

                    <p className={"font-bold"}>Delivery Location:</p>
                    <p className={""}>{request.location}</p>

                    <p className={"font-bold"}>Medicine Requested:</p>
                    <p className={""}>{request.medicine}</p>

                    <p className={"font-bold"}>Amount of Medicine:</p>
                    <p className={""}>{request.quantity}</p>

                    <p className={"font-bold"}>Additional Comments:</p>
                    <p className={""}>{request.additionalComments}</p>
                </div>
            </div>

            <div className={"p-10"}/>

            <div className="pb-12 p-1">
                <h2 className={"text-3xl font-HeadlandOne py-4"}>Log Book</h2>

                <h2 className={"text-2xl font-HeadlandOne py-4"}>Medicine Requests</h2>
                <div className="max-h-[60vh]  border-solid border-b-[1px] border-deep-blue">
                    <Table data={requestList}
                           headings={["Employee Name", "Priority", "Location", "Medicine", "Quantity", "Additional Comments"]}
                           keys={["employeeName", "priority", "location", "medicine", "quantity", "additionalComments"]}/>
                </div>
            </div>

        </div>
    );

}

export default MedicineRequest;
