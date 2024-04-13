import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {MaintenanceRequest} from 'common/src/maintenanceRequest.ts';
import RadioButton from "../components/RadioButton.tsx";
import Button from "../components/Button.tsx";
import Dropdown from "../components/dropdown.tsx";
import axios from "axios";



export function MaintenancePage() {
    const [request, setRequest] = useState<MaintenanceRequest>({issue: "", location: "", priority: "", feedback: ""});
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
        setRequest({issue: "", location: "", priority: "", feedback: ""});
        // use resetActive from Dropdown?
        setCleared(true);

    }

    function handleIssueInput(e: ChangeEvent<HTMLInputElement>): void {
        setRequest({...request, issue: e.target.value});
    }

    function handleLocationInput(str: string): void {
        setCleared(false);
        setRequest({...request, location: str});
    }

    function handleUrgentCheck(e: ChangeEvent<HTMLInputElement>): void {
        setRequest({...request, priority: e.target.value});
    }

    function handleFeedbackInput(e: ChangeEvent<HTMLTextAreaElement>): void {
        setRequest({...request, feedback: e.target.value});
    }

    function handleNewSubmission(): void {
        setSubmittedWindowVisibility({formScreen: "block", submittedScreen: "hidden"});
        setRequest({issue: "", location: "", priority: "", feedback: ""});
        setCleared(false);
    }

    return (
        <div className="dark:bg-black centerContent flex flex-col">

            <div className={submittedWindowVisibility.formScreen}>
                <div className="dark:bg-Ash-black bg-light-white my-10 p-10 px-20 rounded-3xl">
                    <h1 className={"dark:text-light-white text-3xl font-HeadlandOne py-4"}>Welcome to the Maintenance page!</h1>
                    <p className={"dark:text-light-white"}>Fill out the form below to report an issue and make a maintenance request.</p>

                    <form ref={formRef} onSubmit={e => {
                        e.preventDefault();
                    }}>
                        <div className="dark:bg-Ash-black formTest w-full my-10 grid grid-cols-2 gap-12">
                            <div className="dark:bg-black">
                                <p className={"dark:text-light-white dark:bg-Ash-black text-left font-bold"}>What kind of issue?</p>
                                <div className="dark:bg-black border-deep-blue border-solid border-2">
                                    <RadioButton value={"Elevator"} name={"issue"} id={"issue1"} state={request.issue}
                                                 onChange={handleIssueInput} required={true}/>
                                    <RadioButton value={"Power"} name={"issue"} id={"issue2"} state={request.issue}
                                                 onChange={handleIssueInput} required={true}/>
                                    <RadioButton value={"Plumbing"} name={"issue"} id={"issue3"} state={request.issue}
                                                 onChange={handleIssueInput} required={true}/>
                                    <RadioButton value={"Repair"} name={"issue"} id={"issue4"} state={request.issue}
                                                 onChange={handleIssueInput} required={true}/>
                                    <RadioButton value={"Other"} name={"issue"} id={"issue5"} state={request.issue}
                                                 onChange={handleIssueInput} required={true}/>
                                </div>

                            </div>

                            <div>
                                <p className={"dark:text-light-white text-left font-bold"}>What location is this issue in?</p>
                                <div className="border-deep-blue border-solid border-2">
                                    <Dropdown options={locationOptions} placeholder={"Location"}
                                              name={"locationDropdown"}
                                              id={"dropdown1"} value={cleared}
                                              setInput={handleLocationInput} required={true}/>
                                </div>


                                <br/>

                                <p className={"dark:text-light-white text-left font-bold"}>Is this an urgent issue?</p>
                                <div className="border-deep-blue border-solid border-2">
                                    <RadioButton value={"Yes"} name={"urgency"} id={"urgency1"} state={request.priority}
                                                 onChange={handleUrgentCheck} required={true}/>
                                    <RadioButton value={"No"} name={"urgency"} id={"urgency2"} state={request.priority}
                                                 onChange={handleUrgentCheck} required={true}/>
                                </div>


                                <br/>
                            </div>
                        </div>

                        <label htmlFor={"feedback"} className={"dark:text-light-white flex w-full text-left font-bold"}>Description of
                            issue</label>
                        <div className="">
                            <textarea id={"feedback"}
                                      className={"dark:bg-black w-full max-w-full h-28 max-h-28 p-1 border-deep-blue border-solid border-2"}
                                      onChange={handleFeedbackInput}
                                      value={request.feedback} required={true}
                                      placeholder="Enter detailed description here..."/>
                        </div>


                        <div className={"formButtons flex gap-4 my-4"}>
                            <Button onClick={handleSubmit} children={"Submit"}/>
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
                <p className={"dark:text-white font-HeadlandOne text-deep-blue"}>Created by Nick</p>
            </div>
        </div>
    );
}

export default MaintenancePage;
