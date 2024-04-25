import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {MaintenanceRequest} from 'common/src/maintenanceRequest.ts';
import RadioButton from "../components/RadioButton.tsx";
import Button from "../components/Button.tsx";
import Dropdown from "../components/dropdown.tsx";
import axios from "axios";
import maintenancePic from "../assets/serviceRequestBanners/Two-technicians-robotic-arm_1200x628.jpg";


export function MaintenancePage() {
    const [request, setRequest] = useState<MaintenanceRequest>({employeeName: "", issue: "", location: "", priority: "", feedback: ""});
    const [submittedWindowVisibility, setSubmittedWindowVisibility] = useState({
        formScreen: "block",
        submittedScreen: "hidden"
    });
    const [cleared, setCleared] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const [locationOptions, setLocationOptions] = useState<string[]>([]);

    useEffect(() => {
            axios.get("/api/maintenance/location").then((response) => {
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
            axios.post("/api/maintenance/insert",request,{
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
        // TODO figure out how to reset dropdown menu from https://thewebdev.info/2021/02/06/how-to-programmatically-clear-or-reset-a-react-select-dropdown/
        setRequest({employeeName: "", issue: "", location: "", priority: "", feedback: ""});
        // use resetActive from Dropdown?
        setCleared(true);

    }

    function handleEmployeeInput(str: string): void {
        setCleared(false);
        setRequest({...request, employeeName: str});
    }
    function handleIssueInput(e: ChangeEvent<HTMLInputElement>): void {
        setRequest({...request, issue: e.target.value});
    }

    function handleLocationInput(str: string): void {
        setCleared(false);
        setRequest({...request, location: str});
    }

    function handlePriorityInput(e: ChangeEvent<HTMLInputElement>): void {
        setRequest({...request, priority: e.target.value});
    }

    function handleFeedbackInput(e: ChangeEvent<HTMLTextAreaElement>): void {
        setRequest({...request, feedback: e.target.value});
    }

    function handleNewSubmission(): void {
        setSubmittedWindowVisibility({formScreen: "block", submittedScreen: "hidden"});
        setRequest({employeeName: "", issue: "", location: "", priority: "", feedback: ""});
        setCleared(false);
    }

    return (
        <>
            <div className="bg-gradient-to-t from-bone-white to-deep-blue relative h-full">
                <img src={maintenancePic} alt="maintenance Picture" className="w-screen opacity-65 absolute"/>
                <div className="centerContent flex flex-col absolute my-50 right-0 left-0 top-50 bottom-0 margin-auto">
                    <div className={submittedWindowVisibility.formScreen}>
                        <div className="bg-light-white my-10 p-10 px-20 rounded-3xl w-auto drop-shadow-xl">
                            <h1 className={"text-3xl font-extrabold font-HeadlandOne py-4"}>Maintenance Service Request</h1>
                            <p>Fill out the form below to report an issue and make a maintenance request.</p>

                    <form ref={formRef} onSubmit={e => {
                        e.preventDefault();
                    }}>
                        <div className="formTest w-full my-10 grid grid-cols-2 gap-12">
                            <div className="flex flex-col max-w-fit">
                                <p className={"text-left font-bold"}>Employee Name</p>
                                <div className={"border-solid border-deep-blue border-2 rounded"}>
                                    <Dropdown options={employeeOptions} placeholder={"Employee Name"}
                                              name={"employeeDropdown"}
                                              id={"employeeName"} value={cleared}
                                              setInput={handleEmployeeInput} required={true}
                                              width={"w-80"}/>
                                </div>
                                <br/>

                                <div>
                                    <p className={"text-left font-bold w-80"}>What kind of issue?</p>
                                    <div className="border-deep-blue border-solid border-2 rounded w-fit">
                                        <RadioButton value={"Elevator"} name={"issue"} id={"issue1"}
                                                     state={request.issue}
                                                     onChange={handleIssueInput} required={true} width={"w-80"}/>
                                        <RadioButton value={"Power"} name={"issue"} id={"issue2"} state={request.issue}
                                                     onChange={handleIssueInput} required={true} width={"w-80"}/>
                                        <RadioButton value={"Plumbing"} name={"issue"} id={"issue3"}
                                                     state={request.issue}
                                                     onChange={handleIssueInput} required={true} width={"w-80"}/>
                                        <RadioButton value={"Repair"} name={"issue"} id={"issue4"} state={request.issue}
                                                     onChange={handleIssueInput} required={true} width={"w-80"}/>

                                            </div>


                                        </div>
                                    </div>


                                    <div className="flex flex-col w-fit">
                                        <p className={"text-left font-bold"}>What location is this issue in?</p>
                                        <div className="border-deep-blue border-solid border-2 rounded w-fit">
                                            <Dropdown options={locationOptions} placeholder={"Location"}
                                                      name={"locationDropdown"}
                                                      id={"dropdown1"} value={cleared}
                                                      setInput={handleLocationInput} required={true}
                                                      width={"w-80"}/>
                                        </div>


                                        <br/>


                                        <p className={"text-left font-bold "}>What is the priority of this
                                            request?</p>
                                        <div className={"border-solid border-deep-blue border-2 rounded"}>
                                            <RadioButton value={"Low"} name={"priority"} id={"priority1"}
                                                         state={request.priority}
                                                         onChange={handlePriorityInput} required={true}
                                                         width={"w-80"}/>
                                            <RadioButton value={"Medium"} name={"priority"} id={"priority2"}
                                                         state={request.priority}
                                                         onChange={handlePriorityInput} required={true}
                                                         width={"w-80"}/>
                                            <RadioButton value={"High"} name={"priority"} id={"priority3"}
                                                         state={request.priority}
                                                         onChange={handlePriorityInput} required={true}
                                                         width={"w-80"}/>
                                            <RadioButton value={"Emergency"} name={"priority"} id={"priority4"}
                                                         state={request.priority}
                                                         onChange={handlePriorityInput} required={true}
                                                         width={"w-80"}/>
                                        </div>


                                    </div>
                                </div>

                                <label htmlFor={"feedback"} className={"flex w-full text-left font-bold"}>Description
                                    of
                                    issue</label>


                                <div className="">
                                <textarea id={"feedback"}
                                          className={"w-full max-w-full h-28 max-h-28 p-1 border-deep-blue border-solid border-2 rounded"}
                                          onChange={handleFeedbackInput}
                                          value={request.feedback} required={true}
                                          placeholder="Enter detailed description here..."/>


                                    <div className={"formButtons flex gap-4 my-4"}>
                                        <Button onClick={handleSubmit} children={"Submit"}/>
                                        <Button onClick={handleClear} children={"Clear"} color={"bg-transparent border-2 border-deep-blue"} text={"text-deep-blue"}/>
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
                                <p className={"font-bold"}>What kind of issue would you like to report?</p>
                                <p className={""}>{request.issue}</p>

                                <p className={"font-bold"}>What location is this issue in?</p>
                                <p className={""}>{request.location}</p>

                                <p className={"font-bold"}>Is this an urgent issue?</p>
                                <p className={""}>{request.priority}</p>

                                <p className={"font-bold"}>Additional Feedback</p>
                                <p className={""}>{request.feedback}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className={"font-HeadlandOne text-deep-blue"}>Created by Nick</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MaintenancePage;
