import React, {useRef, useState, ChangeEvent, useEffect} from "react";
import {MedicineRequestType} from "../../../../packages/common/src/MedicineRequestType.ts";
import Button from "../components/Button.tsx";
import RadioButton from "../components/RadioButton.tsx";
import Dropdown from "../components/dropdown.tsx";
import axios from "axios";
// import medicinePic from "../assets/serviceRequestBanners/medicine.png";

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

    const [employeeOptions, setEmployeeOptions] = useState<string[]>([]);
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

    useEffect(() => {
        axios.get("/api/employee/").then((response) => {
            const employeeNames: string[] = [];
            for (let i = 0; i < response.data.length; i++) {
                employeeNames.push(response.data[i].firstName);
            }
            setEmployeeOptions(employeeNames);
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

    function handleEmployeeInput(str: string): void {
        setCleared(false);
        setRequest({...request, employeeName: str});
    }

    // function handleUrgentCheck(e: ChangeEvent<HTMLInputElement>): void {
    //     setRequest({...request, isUrgent: e.target.value});
    // }

    function handleQuantityInput(e: ChangeEvent<HTMLInputElement>): void {
        setRequest({...request, quantity: parseFloat(e.target.value)});
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
            <div className="bg-gradient-to-t from-bone-white to-deep-blue relative h-full">
            {/*<img src={medicinePic} alt="medicine Picture" className="w-screen opacity-65 absolute mask-gradient"/>*/}
            <div className="centerContent flex flex-col absolute my-50 right-0 left-0 top-50 bottom-0 margin-auto">
                <div className={submittedWindowVisibility.formScreen}>
                    <div className="relative bg-light-white my-10 p-10 px-20 rounded-3xl w-[1000px] mt-100">
                        <div className="bg-deep-blue absolute inset-0 bottom-[1120px] rounded-t-2xl">
                        <h1 className={"text-4xl font-OpenSans text-white font-extrabold mt-7"}>Medicine Delivery Request</h1>
                        </div>
                        <p className="text-left mt-16">
                            Our facility is dedicated to ensuring the health and well-being of all employees. Our medicine delivery service plays a vital role in this commitment. Please inform your facility manager in advance about your medicine needs.
                        </p>
                        <br/>
                        <p className="text-left">
                            Our medicine delivery team is available during normal business hours, Monday-Friday, 9:00 a.m. to 5:00 p.m. Please fill out the form to request a medicine delivery to your location.
                        </p>
                        <br/>
                        <p className="font-bold text-left ">
                            Please select the type of medicine and the quantity from the dropdown. Any medicines not listed in the dropdown will need to be requested through facility administration.
                        </p>


                    <form ref={formRef} onSubmit={e => {
                        e.preventDefault();
                    }}>
                        <div className="formTest  my-10 gap-24">
                            <div>
                                <p className={"text-left font-bold"}>Employee Name:</p>

                                <div className={"border-solid border-gray-300 border-2 rounded"}>
                                    <Dropdown options={employeeOptions} placeholder={"Employee Name"}
                                              name={"employeeDropdown"}
                                              id={"employeeName"} value={cleared}
                                              setInput={handleEmployeeInput} required={true}
                                              width={"w-[836px]"}/>
                                </div>
                                <br/>


                                    <p className={"text-left font-bold "}>What is the priority of this request?</p>
                                    <div className={"border-solid border-gray-300 border-2 rounded"}>
                                        <RadioButton value={"Low"} name={"priority"} id={"priority1"}
                                                     state={request.priority}
                                                     color={"bg-light-white"}
                                                     onChange={handlePriorityInput} required={true} width={"w-[836px]"}/>
                                        <RadioButton value={"Medium"} name={"priority"} id={"priority2"}
                                                     state={request.priority}
                                                     color={"bg-light-white"}
                                                     onChange={handlePriorityInput} required={true} width={"w-[836px]"}/>
                                        <RadioButton value={"High"} name={"priority"} id={"priority3"}
                                                     state={request.priority}
                                                     color={"bg-light-white"}
                                                     onChange={handlePriorityInput} required={true} width={"w-[836px]"}/>
                                        <RadioButton value={"Emergency"} name={"priority"} id={"priority4"}
                                                     state={request.priority}
                                                     color={"bg-light-white"}
                                                     onChange={handlePriorityInput} required={true} width={"w-[836px]"}/>
                                    </div>

                                    <br/>

                                    <p className={"text-left font-bold"}>Destination of Delivery?</p>
                                    <div className={"border-solid border-gray-300 border-2 rounded"}>
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
                                            <div className={"border-solid border-gray-300 border-2 rounded w-[410px]"}>
                                                <Dropdown options={medicineOptions} placeholder={"Medicine"}
                                                          name={"medicineDropdown"}
                                                          id={"dropdown2"} value={cleared}
                                                          setInput={handleMedicineInput} required={true}
                                                          width={"w-[406px]"}/>
                                            </div>

                                    </div>
                                    <div>
                                        <div>
                                            <p className={"text-left font-bold"}>Quantity</p>
                                            <input
                                                className={"border-solid border-gray-300 border-2 rounded overflow-hidden flex items-start p-2 h-9 w-[410px] bg-light-white"}
                                                type="number" required min={1} value={request.quantity} defaultValue={1}
                                                onChange={handleQuantityInput}/>
                                        </div>
                                    </div>

                                    </div>


                                    <br/>

                                    <label htmlFor={"feedback"} className={"flex w-full text-left font-bold"}>Additional
                                        Comments</label>
                                    <textarea id={"feedback"}
                                              className={"w-full max-w-full h-40 max-h-40   p-1 border-solid border-gray-300 border-2 rounded"}
                                              onChange={handleFeedbackInput}
                                              value={request.additionalComments} required={true}
                                              placeholder="Enter detailed description here..."/><br/>

                                    <br/>
                                </div>
                            </div>

                            <div className={"formButtons flex-auto object-center space-x-10 pb-16"}>
                                <Button onClick={handleSubmit} children={"Submit"} px={"px-8"}/>
                                <Button onClick={handleClear} children={"Clear"} color={"bg-transparent border-2 border-deep-blue"} text={"text-deep-blue"}/>
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
                            <h3 className={"p-3 text-lg text-center font-HeadlandOne mt-3"}>Previous Form
                                Submission:</h3>
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
            </div>
        </>
    );

}

export default MedicineRequest;
