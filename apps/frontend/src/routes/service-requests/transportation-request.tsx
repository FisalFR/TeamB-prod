
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import RadioButton from "../../components/input-components/RadioButton.tsx";
import {TransportationRequest} from "common/src/service-requests/transportation-request.ts";
import Dropdown from "../../components/input-components/Dropdown.tsx";
import axios from "axios";
import Button from "../../components/buttons/Button.tsx";
// import transportPic from "../../assets/serviceRequestBanners/transport-pic.jpg";

export function TransportationRequestPage() {
    const [request, setRequest] = useState<TransportationRequest>({
        employeeName: "",
        priority: "",
        feedback: "",
        location:"",
        address: "",
        transport: "",
    });

    const formRef = useRef<HTMLFormElement>(null);
    const [locationOptions, setLocationOptions] = useState<string[]>([]);
    const vehicleOptions = ["Ambulance", "Helicopter", "Friends/Family/Uber", "Non-Emergency Accessible Van"];
    const [cleared, setCleared] = useState(false);
    const [submittedWindowVisibility, setSubmittedWindowVisibility] = useState({
        formScreen: "block",
        submittedScreen: "hidden"
    });

    useEffect(() => {
        axios.get("/api/transport/location").then((response) => {
            const locationOptionsStrings: string[] = [];
            for (let i = 0; i < response.data.length; i++) {
                locationOptionsStrings.push(response.data[i].longName);
            }
            setLocationOptions(locationOptionsStrings);
        });
    }, []);

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

    function handleSubmit(e: { preventDefault: () => void; }) {
        (formRef.current as HTMLFormElement).requestSubmit();
        e.preventDefault();
        if ((formRef.current as HTMLFormElement).checkValidity()) {
            axios.post("/api/transport/insert",request,{
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then();
            setCleared(true);
           setSubmittedWindowVisibility({formScreen: "hidden", submittedScreen: "block"});
        }
    }
    function handleClear(e: { preventDefault: () => void; }): void {
        e.preventDefault();
        setRequest({feedback: "", employeeName: "", location: "", priority: "", address:"", transport:""});
        // use resetActive from Dropdown?
        setCleared(true);
    }

    function handlePriorityInput(e: ChangeEvent<HTMLInputElement>): void {
        setRequest({...request, priority: e.target.value});
    }
    function handleTransportInput(e: ChangeEvent<HTMLInputElement>): void {
        setRequest({...request, transport: e.target.value});
    }
    function handleLocationInput(str: string): void {
        setCleared(false);
        setRequest({...request, location: str});
    }
    function handleFeedbackInput(e: ChangeEvent<HTMLTextAreaElement>): void {
        setRequest({...request, feedback: e.target.value});
    }
    function handleEmployeeInput(str: string): void {
        setCleared(false);
        setRequest({...request, employeeName: str});
    }
    function handleAddressInput(e: ChangeEvent<HTMLInputElement>): void{
        setRequest({...request, address:e.target.value});
    }


    function handleNewSubmission(): void {
        setSubmittedWindowVisibility({formScreen: "block", submittedScreen: "hidden"});
        setRequest({employeeName: "", location: "", priority: "", feedback: "", transport:"", address:""});
        setCleared(false);
    }

    return (
        <>
            <div className="bg-gradient-to-t from-bone-white to-deep-blue relative h-full">
                {/*<img src={transportPic} alt="transport Picture" className="w-screen opacity-65 absolute h-72 mask-gradient"/>*/}
                <div className="centerContent flex flex-col absolute my-50 right-0 left-0 top-80 bottom-0 margin-auto">
                    <div className={submittedWindowVisibility.formScreen}>
                        <div className=" relative flex flex-col bg-light-white my-10 p-10 px-20 rounded-3xl max-w-[850px] relative drop-shadow-2xl">
                            <div className=" flex flex-col">
                                <div className="absolute bg-deep-blue rounded-t-2xl w-full top-0 right-0 p-4">
                                    <h1 className="text-4xl font-OpenSans text-white font-extrabold py-4"> Welcome to the External Patient
                                        Transportation page! </h1>
                                </div>
                                <p className="text-left mt-32">
                                    Our facility is committed to providing efficient and safe external transportation
                                    for all occupants. Our external transportation services are crucial in this
                                    endeavor. Please inform your facility manager in advance about your transportation
                                    needs.
                                </p>
                                <br/>
                                <p className="text-left">
                                    Our transportation team is available during normal business hours, Monday-Friday,
                                    9:00 a.m. to 5:00 p.m. Please fill out the form to request an external
                                    transportation service for your location.
                                </p>
                                <br/>
                                <p className="font-bold text-left ">
                                    Please select the type of transportation service, the start location, and the end
                                    location from the dropdown. Any services not listed in the dropdown will need to be
                                    requested through facility administration.
                                </p>
                            </div>
                            <br/>
                            <form ref={formRef} onSubmit={e => {
                                e.preventDefault();
                            }} className="">
                                <div className="flex justify-between">
                                    <div className="flex flex-col">
                                        <p className=" text-left font-bold">Employee Name</p>
                                        <div className={"border-solid border-gray-300 border-2 rounded"}>
                                            <Dropdown options={employeeOptions} placeholder={"Employee Name"}
                                                      name={"employeeDropdown"}
                                                      color={"bg-light-white"}
                                                      id={"employeeName"} value={cleared}
                                                      setInput={handleEmployeeInput} required={true}
                                                      width={"w-80"}/>
                                        </div>
                                    </div>
                                    <div className="flex flex-col ">
                                        <p className={"text-left font-bold"}>What room is the patient in?</p>
                                        <div className="border-gray-300 border-solid border-2 rounded w-fit">
                                            <Dropdown options={locationOptions} placeholder={"Location"}
                                                      name={"locationDropdown"}
                                                      color={"bg-light-white"}
                                                      id={"dropdown1"} value={cleared}
                                                      setInput={handleLocationInput} required={true} width={"w-80"}/>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <div className="flex justify-between">
                                    <div>
                                        <p className={"text-left font-bold"}>How will the patient be transported?</p>
                                        <div>
                                            <div className="border-gray-300 border-solid border-2 rounded w-fit">
                                                <Dropdown options={vehicleOptions} placeholder={"How will the patient be transported?"}
                                                          name={"locationDropdown"}
                                                          color={"bg-light-white"}
                                                          id={"dropdown1"} value={cleared}
                                                          setInput={handleTransportInput.toString} required={true}
                                                          width={"w-80"}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-left font-bold">Drop off Location Address</p>
                                        <input type="text" required
                                               placeholder={"Address"}
                                               onChange={handleAddressInput} value={request.address}
                                               className={"border-solid border-gray-300 bg-light-white border-2 rounded overflow-hidden flex items-start p-[5px] w-80"}/>
                                    </div>
                                </div>
                                <br/>
                                <div className="flex justify-between">
                                    <div>
                                        <p className={"text-left font-bold"}>What is the priority of this request?</p>
                                        <div className={"w-80 border-solid border-gray-300 border-2 rounded"}>
                                            <RadioButton value={"Low"} name={"priority"} id={"priority1"}
                                                         state={request.priority}
                                                         color={"bg-light-white"}
                                                         onChange={handlePriorityInput} required={true} width={"w-76"}/>
                                            <RadioButton value={"Medium"} name={"priority"} id={"priority2"}
                                                         state={request.priority}
                                                         color={"bg-light-white"}
                                                         onChange={handlePriorityInput} required={true} width={"w-76"}/>
                                            <RadioButton value={"High"} name={"priority"} id={"priority3"}
                                                         state={request.priority}
                                                         color={"bg-light-white"}
                                                         onChange={handlePriorityInput} required={true} width={"w-76"}/>
                                            <RadioButton value={"Emergency"} name={"priority"} id={"priority4"}
                                                         state={request.priority}
                                                         color={"bg-light-white"}
                                                         onChange={handlePriorityInput} required={true} width={"w-76"}/>
                                        </div>
                                    </div>
                                    <div>
                                        <p className=" text-left font-bold">Additional Comments </p>
                                        <textarea id={"feedback"}
                                                  className={"w-80 max-w-full h-40 max-h-40 p-1 border-gray-300 bg-light-white border-solid border-2 rounded"}
                                                  onChange={handleFeedbackInput}
                                                  value={request.feedback} required={false}
                                                  placeholder="Enter detailed description here..."/>
                                    </div>
                                </div>
                                <br/>
                                <div className={"formButtons flex gap-4 my-4 space-x-5"}>
                                    <Button onClick={handleSubmit} children={"Submit"}/>
                                    <Button onClick={handleClear} children={"Clear"} color={"bg-transparent border-2 border-deep-blue"} text={"text-deep-blue"}/>

                                </div>

                            </form>
                        </div>
                        <div>
                            <p className={"font-HeadlandOne text-deep-blue"}>Created by Lily</p>
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
                                <p className={"font-bold"}>Employee Name</p>
                                <p className={""}>{request.employeeName}</p>

                                <p className={"font-bold"}>What location is this issue in?</p>
                                <p className={""}>{request.location}</p>

                                <p className={"font-bold"}>How will the patient be transported?</p>
                                <p className={""}>{request.transport}</p>

                                <p className={"font-bold"}>Drop off Location Address?</p>
                                <p className={""}>{request.address}</p>

                                <p className={"font-bold"}>Is this an urgent issue?</p>
                                <p className={""}>{request.priority}</p>

                                <p className={"font-bold"}>Additional Feedback</p>
                                <p className={""}>{request.feedback}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default TransportationRequestPage;
