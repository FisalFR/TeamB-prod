import React, {useRef, useState, ChangeEvent, useEffect} from "react";
import {MedicineRequestType} from "../../../../packages/common/src/MedicineRequestType.ts";
import Button from "../components/Button.tsx";
import RadioButton from "../components/RadioButton.tsx";
import Dropdown from "../components/dropdown.tsx";
import axios from "axios";

export function MedicineRequest(){
    const [request, setRequest] = useState<MedicineRequestType>({
        employeeName: "",
        priority: "",
        location: "",
        medicine: "",
        quantity: 1,
        additionalComments: "",
    });
    const[requestList, setRequestList] = useState<MedicineRequestType[]>([]);

    const [submittedWindowVisibility, setSubmittedWindowVisibility] = useState({
        formScreen: "block",
        submittedScreen: "hidden"
    });
    const [cleared, setCleared] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const [locationOptions, setLocationOptions] = useState<string[]>([]);
    const medicineOptions: string[] = ["Tylenol", "Ibuprofen", "Nyquill"];

    useEffect(() => {
        axios.get("/api/medicine/location").then((response) => {
            const locationOptionsStrings: string[] = [];
            for (let i = 0; i < response.data.length; i++) {
                locationOptionsStrings.push(response.data[i].longName);
            }
            setLocationOptions(locationOptionsStrings);
        });
    }, []);

    function handleSubmit(e: { preventDefault: () => void; }) {
        (formRef.current as HTMLFormElement).requestSubmit();
        e.preventDefault();
        if ((formRef.current as HTMLFormElement).checkValidity()) {
            axios.post("/api/medicine/insert",request,{
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then();
            setCleared(true);
            setSubmittedWindowVisibility({formScreen: "hidden", submittedScreen: "block"});
        }
        setRequestList([...requestList, request]);
        requestList.push(request);
    }

    function handleClear(e: { preventDefault: () => void; }): void {
        e.preventDefault();
        setRequest({employeeName: "",
            priority: "",
            location: "",
            medicine: "",
            quantity: 1,
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

    function handleQuantityInput(e: ChangeEvent<HTMLInputElement>): void {
        setRequest({...request, quantity: e.target.value});
    }

    function handleFeedbackInput(e: ChangeEvent<HTMLTextAreaElement>): void {
        setRequest({...request, additionalComments: e.target.value});
    }

    function handleNewSubmission(): void {
        setSubmittedWindowVisibility({formScreen: "block", submittedScreen: "hidden"});
        setRequest({employeeName: "",
            priority: "",
            location: "",
            medicine: "",
            quantity: 1,
            additionalComments: ""});
        setCleared(false);
    }

    return(
        <>

        <div className="centerContent flex flex-col">
            <div className={submittedWindowVisibility.formScreen}>
                <div className="bg-light-white my-10 p-10 px-20 rounded-3xl">
                    <h1 className={"text-3xl font-HeadlandOne pt-2 pb-4"}>Medicine Delivery Request</h1>
                    <p>Fill out the form below to schedule a medicine delivery</p>


                    <form ref={formRef} onSubmit={e => {
                        e.preventDefault();
                    }}>
                        <div className="formTest  my-10 gap-24">
                            <div>
                                <p className={"text-left font-bold"}>Employee Name</p>
                                <input type="text" required
                                       onChange={handleNameInput} value={request.employeeName}
                                       placeholder={"Name"}
                                       className={"border-solid border-deep-blue border-2 rounded overflow-hidden flex items-start p-2 w-100"}/>

                                <br/>


                                <p className={"text-left font-bold "}>What is the priority of this request?</p>
                                <div className={"border-solid border-deep-blue border-2 rounded"}>
                                    <RadioButton value={"Low"} name={"priority"} id={"priority1"}
                                                 state={request.priority}
                                                 onChange={handlePriorityInput} required={true} width={"w-100"}/>
                                    <RadioButton value={"Medium"} name={"priority"} id={"priority2"}
                                                 state={request.priority}
                                                 onChange={handlePriorityInput} required={true} width={"w-100"}/>
                                    <RadioButton value={"High"} name={"priority"} id={"priority3"}
                                                 state={request.priority}
                                                 onChange={handlePriorityInput} required={true} width={"w-100"}/>
                                    <RadioButton value={"Emergency"} name={"priority"} id={"priority4"}
                                                 state={request.priority}
                                                 onChange={handlePriorityInput} required={true} width={"w-100"}/>
                                </div>

                                <br/>

                                <p className={"text-left font-bold"}>Destination of Delivery?</p>
                                <div className={"border-solid border-deep-blue border-2 rounded"}>
                                    <Dropdown options={locationOptions} placeholder={"Location"}
                                              name={"locationDropdown"}
                                              id={"dropdown1"} value={cleared}
                                              setInput={handleLocationInput} required={true}
                                              width={"w-100"}/>
                                </div>

                                <br/>

                                <div className="grid grid-cols-2 space-x-3 flex-auto">
                                    <div>
                                        <p className={"text-left font-bold "}>Medication</p>
                                        <div className={"border-solid border-deep-blue border-2 rounded w-50"}>
                                            <Dropdown options={medicineOptions} placeholder={"Medicine"}
                                                      name={"medicineDropdown"}
                                                      id={"dropdown2"} value={cleared}
                                                      setInput={handleMedicineInput} required={true}
                                                      width={"w-48"}/>
                                        </div>

                                    </div>
                                    <div>
                                        <div>
                                            <p className={"text-left font-bold"}>Quantity</p>
                                            <input
                                                className={"border-solid border-deep-blue border-2 rounded overflow-hidden flex items-start p-2 h-9 w-50"}
                                                type="number" required min={1} value={request.quantity} defaultValue={1} onChange={handleQuantityInput}/>
                                        </div>
                                    </div>

                                </div>


                                <br/>

                                <label htmlFor={"feedback"} className={"flex w-full text-left font-bold"}>Additional
                                    Comments</label>
                                <textarea id={"feedback"}
                                          className={"w-full max-w-full h-40 max-h-40   p-1 border-solid border-deep-blue border-2 rounded"}
                                          onChange={handleFeedbackInput}
                                          value={request.additionalComments} required={true}
                                          placeholder="Enter detailed description here..."/><br/>

                                <br/>
                            </div>
                        </div>

                        <div className={"formButtons flex-auto object-center space-x-5 pb-16"}>
                            <Button onClick={handleSubmit} children={"Submit"} px={"px-8"}/>
                            <Button onClick={handleClear} children={"Clear"}/>
                        </div>

                    </form>
                </div>
            </div>


            <div className={submittedWindowVisibility.submittedScreen}>
                <div className="pt-32">
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

            </div>
            <div>
                <p className={"font-HeadlandOne text-deep-blue"}>Created by Mo and Colin</p>
            </div>
        </div>
        </>
    );

}

export default MedicineRequest;
