import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import RadioButton from "../../components/input-components/RadioButton.tsx";
import {internalTransportationRequest} from "common/src/service-requests/internal-transportation-request.ts";
import Dropdown from "../../components/input-components/Dropdown.tsx";
import axios from "axios";
import Button from "../../components/buttons/Button.tsx";
// import internalTransportPic from "../../assets/serviceRequestBanners/internalTransportPic.jpg";


export function InternalTransportationRequestPage() {
    const [request, setRequest] = useState<internalTransportationRequest>({
        employeeName: "",
        priority: "",
        feedback: "",
        startlocation:"",
        endlocation:"",
    });
    const [submittedWindowVisibility, setSubmittedWindowVisibility] = useState({
        formScreen: "block",
        submittedScreen: "hidden"
    });
    const formRef = useRef<HTMLFormElement>(null);
    const [locationOptions, setLocationOptions] = useState<string[]>([]);
    //const [TransportOptions, setTransportOptions] = useState<string[]>([]);
    const [cleared, setCleared] = useState(false);
    useEffect(() => {
        axios.get("/api/internalTransport/location").then((response) => {
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
            axios.post("/api/internalTransport/insert",request,{
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
        setRequest({feedback: "", employeeName: "", startlocation: "", endlocation: "", priority: ""});
        setCleared(true);
    }
    function handlePriorityInput(e: ChangeEvent<HTMLInputElement>): void {
        setRequest({...request, priority: e.target.value});
    }
    function handleStartLocationInput(str: string): void {
        setCleared(false);
        setRequest({...request, startlocation: str});
    }
    function handleEndLocationInput(str: string): void {
        setCleared(false);
        setRequest({...request, endlocation: str});
    }
    function handleFeedbackInput(e: ChangeEvent<HTMLTextAreaElement>): void {
        setRequest({...request, feedback: e.target.value});
    }
    function handleEmployeeInput(str: string): void {
        setCleared(false);
        setRequest({...request, employeeName: str});
    }
    function handleNewSubmission(): void {
        setSubmittedWindowVisibility({formScreen: "block", submittedScreen: "hidden"});
        setRequest({employeeName: "", startlocation: "", endlocation: "",priority: "", feedback: ""});
        setCleared(false);
    }


    return (
        <>
            <div className="bg-gradient-to-t from-bone-white to-deep-blue relative h-full">
                {/*<img src={internalTransportPic} alt="Internal Transport Picture"*/}
                {/*     className="w-screen opacity-65 absolute mask-gradient"/>*/}
                <div className="centerContent flex flex-col absolute my-50 right-0 left-0 top-60 bottom-0 margin-auto">
                    <div className={submittedWindowVisibility.formScreen}>
                        <div className="relative bg-light-white my-10 p-10 px-20 rounded-3xl w-[860px] drop-shadow-2xl">
                            <div className="absolute bg-deep-blue rounded-t-2xl top-0 right-0 w-full p-6">
                            <h1 className="text-4xl font-OpenSans py-4 font-extrabold text-white"> Internal Transportation Service Request</h1>
                            </div>
                            <p className="text-left mt-24">
                                Our facility is committed to providing efficient and safe internal transportation for
                                all occupants. Our internal transportation services are crucial in this endeavor. Please
                                inform your facility manager in advance about your transportation needs.
                            </p>
                            <br/>
                            <p className="text-left">
                                Our transportation team is available during normal business hours, Monday-Friday, 9:00
                                a.m. to 5:00 p.m. Please fill out the form to request an internal transportation service
                                for your location.
                            </p>
                            <br/>
                            <p className="font-bold text-left ">
                                Please select the type of transportation service, the start location, and the end
                                location from the dropdown. Any services not listed in the dropdown will need to be
                                requested through facility administration.
                            </p>
                            <form ref={formRef} onSubmit={e => {
                                e.preventDefault();
                            }}>
                                <div>
                                    <div className="formTest w-full my-10 grid grid-cols-2 gap-12">
                                        <div className="flex flex-col w-fit">
                                            <div>
                                                <p className={"text-left font-bold"}>Employee Name</p>
                                                <div
                                                    className={"border-solid border-gray-300 border-2 rounded w-full"}>
                                                    <Dropdown options={employeeOptions} placeholder={"Employee Name"}
                                                              name={"employeeDropdown"}
                                                              color={"bg-light-white"}
                                                              id={"employeeName"} value={cleared}
                                                              setInput={handleEmployeeInput} required={true}
                                                              width={"w-80"}/>
                                                </div>
                                            </div>
                                            <div>
                                                <p className={"text-left font-bold"}>What room is the patient in?</p>
                                                <div className="border-gray-300 border-solid border-2 rounded w-fit">
                                                    <Dropdown options={locationOptions} placeholder={"Location"}
                                                              name={"locationDropdown"}
                                                              color={"bg-light-white"}
                                                              id={"dropdown1"} value={cleared}
                                                              setInput={handleStartLocationInput} required={true}
                                                              width={"w-80"}/>
                                                </div>
                                            </div>
                                            <div>
                                                <p className={"text-left font-bold"}>Where does the patient want to
                                                    go?</p>
                                                <div className="border-gray-300 border-solid border-2 rounded w-fit">
                                                    <Dropdown options={locationOptions} placeholder={"Location"}
                                                              name={"locationDropdown"}
                                                              color={"bg-light-white"}
                                                              id={"dropdown2"} value={cleared}
                                                              setInput={handleEndLocationInput} required={true}
                                                              width={"w-80"}/>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="flex flex-col w-fit">
                                            <p className={"text-left font-bold "}>What is the priority of this
                                                request?</p>
                                            <div className={"border-solid border-gray-300 border-2 rounded"}>
                                                <RadioButton value={"Low"} name={"priority"} id={"priority1"}
                                                             state={request.priority}
                                                             color={"bg-light-white"}
                                                             onChange={handlePriorityInput} required={true}
                                                             width={"w-80"}/>
                                                <RadioButton value={"Medium"} name={"priority"} id={"priority2"}
                                                             state={request.priority}
                                                             color={"bg-light-white"}
                                                             onChange={handlePriorityInput} required={true}
                                                             width={"w-80"}/>
                                                <RadioButton value={"High"} name={"priority"} id={"priority3"}
                                                             state={request.priority}
                                                             color={"bg-light-white"}
                                                             onChange={handlePriorityInput} required={true}
                                                             width={"w-80"}/>
                                                <RadioButton value={"Emergency"} name={"priority"} id={"priority4"}
                                                             state={request.priority}
                                                             color={"bg-light-white"}
                                                             onChange={handlePriorityInput} required={true}
                                                             width={"w-80"}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="font-bold text-left">Additional Comments </p>
                                        <textarea id={"feedback"}
                                                  className={"w-full max-w-full h-28 max-h-28 p-1 border-gray-300 border-solid border-2 rounded bg-light-white"}
                                                  onChange={handleFeedbackInput}
                                                  value={request.feedback} required={true}
                                                  placeholder="Enter detailed description here..."/>
                                    </div>
                                    <div className={"formButtons flex gap-4 my-4 space-x-5"}>
                                        <Button onClick={handleSubmit} children={"Submit"}/>
                                        <Button onClick={handleClear} children={"Clear"}
                                                color={"bg-transparent border-2 border-deep-blue"}
                                                text={"text-deep-blue"}/>
                                    </div>
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
                                <p className={"font-bold"}>What is the employee name?</p>
                                <p className={""}>{request.employeeName}</p>

                                <p className={"font-bold"}>What location is the patient in?</p>
                                <p className={""}>{request.startlocation}</p>

                                <p className={"font-bold"}>What location would the patient like to go?</p>
                                <p className={""}>{request.endlocation}</p>

                                <p className={"font-bold"}>Priority:</p>
                                <p className={""}>{request.priority}</p>

                                <p className={"font-bold"}>Additional Feedback</p>
                                <p className={""}>{request.feedback}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p className={"font-HeadlandOne text-deep-blue"}>Created by Kendall</p>
                <br/>
            </div>
        </>

    );
}

export default InternalTransportationRequestPage;
