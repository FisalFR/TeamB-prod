import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {SanitationRequest} from "common/src/sanitationRequest.ts";
import RadioButton from "../components/RadioButton.tsx";
import Button from "../components/Button.tsx";
import Dropdown from "../components/dropdown.tsx";
import axios from "axios";

function Sanitation() {
    const [request, setRequest] = useState<SanitationRequest>({employeeName: '', priority: '', location: '', serviceType: '', contaminant: '', additionalComments: '', status: ''});
    const [submittedWindowVisibility, setSubmittedWindowVisibility] = useState({
        formScreen: "block",
        submittedScreen: "hidden"
    });
    const [cleared, setCleared] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const employeeNameOptions: string[] = ["Employee 1", "Employee 2", "Employee 3", "Employee 4"];
    const [locationOptions, setLocationOptions] = useState<string[]>([]);

    useEffect(() => {
        axios.get("/api/sanitation/location").then((response) => {
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
            axios.post("/api/sanitation/insert",request,{
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
        setRequest({employeeName: '', priority: '', location: '', serviceType: '', contaminant: '', additionalComments: '', status: ''});
        setCleared(true);
    }

    function handleInput(e: ChangeEvent<HTMLInputElement>): void {
        setRequest({...request, [e.target.name]: e.target.value});
    }

    function handleAdditionalComments(e: ChangeEvent<HTMLTextAreaElement>): void {
        setRequest({...request, additionalComments: e.target.value});
    }

    function handleLocationInput(str: string): void {
        setCleared(false);
        setRequest({...request, location: str});
    }

    function handleNewSubmission(): void {
        setSubmittedWindowVisibility({formScreen: "block", submittedScreen: "hidden"});
        setRequest({employeeName: '', priority: '', location: '', serviceType: '', contaminant: '', additionalComments: '', status: ''});
        setCleared(false);
    }

    return (
        <div className="centerContent">
            <div className={submittedWindowVisibility.formScreen}>

                <div className="bg-light-white my-10 p-10 px-20 rounded-3xl">
                    <h1 className={"text-3xl font-HeadlandOne py-4"}>Welcome to the Sanitation page!</h1>
                    <p>Fill out the form below to report an issue and make a sanitation request.</p>

                    <form ref={formRef} onSubmit={e => {
                        e.preventDefault();
                    }}>
                        <div className="formTest w-full my-10 grid grid-cols-2 gap-12">
                            <div>
                                <p className={"text-left font-bold"}>Employee Name:</p>
                                <div className="border-solid border-deep-blue border-2 rounded">
                                    <Dropdown options={employeeNameOptions} placeholder={"Employee Name"}
                                              name={"employeeNameDropdown"}
                                              id={"dropdownEmployeeName"} value={cleared}
                                              setInput={(str: string) => setRequest({...request, employeeName: str})}
                                              required={true}/>
                                </div>
                                <br/>
                                <p className={"text-left font-bold"}>What kind of service?</p>
                                <div className="border-solid border-deep-blue border-2 rounded">
                                    <RadioButton value={"Bed Cleaning"} name={"serviceType"} id={"serviceType1"}
                                                 state={request.serviceType}
                                                 onChange={handleInput} required={true}/>
                                    <RadioButton value={"Toilet Cleaning"} name={"serviceType"} id={"serviceType2"}
                                                 state={request.serviceType}
                                                 onChange={handleInput} required={true}/>
                                    <RadioButton value={"General Sanitation"} name={"serviceType"} id={"serviceType3"}
                                                 state={request.serviceType}
                                                 onChange={handleInput} required={true}/>
                                </div>
                                <br/>
                                <p className={"text-left font-bold"}>Priority</p>
                                <div className="border-solid border-deep-blue border-2 rounded">
                                    <RadioButton value={"Low"} name={"priority"} id={"priority1"}
                                                 state={request.priority}
                                                 onChange={handleInput} required={true}/>
                                    <RadioButton value={"Medium"} name={"priority"} id={"priority2"}
                                                 state={request.priority}
                                                 onChange={handleInput} required={true}/>
                                    <RadioButton value={"High"} name={"priority"} id={"priority3"}
                                                 state={request.priority}
                                                 onChange={handleInput} required={true}/>
                                    <RadioButton value={"Emergency"} name={"priority"} id={"priority3"}
                                                 state={request.priority}
                                                 onChange={handleInput} required={true}/>
                                </div>

                            </div>

                            <div>


                                <p className={"text-left font-bold"}>What location is this issue in?</p>
                                <div className="border-solid border-deep-blue border-2 rounded">
                                    <Dropdown options={locationOptions} placeholder={"Location"}
                                              name={"locationDropdown"}
                                              id={"dropdown1"} value={cleared}
                                              setInput={handleLocationInput} required={true}/>
                                </div>
                                <br/>
                                <p className={"text-left font-bold"}>Contaminant</p>
                                <div className="border-solid border-deep-blue border-2 rounded">
                                    <RadioButton value={"Biological Fluids"} name={"contaminant"} id={"contaminant1"}
                                                 state={request.contaminant}
                                                 onChange={handleInput} required={true}/>
                                    <RadioButton value={"Waste Stains"} name={"contaminant"} id={"contaminant2"}
                                                 state={request.contaminant}
                                                 onChange={handleInput} required={true}/>
                                    <RadioButton value={"Dust and Debris"} name={"contaminant"} id={"contaminant3"}
                                                 state={request.contaminant}
                                                 onChange={handleInput} required={true}/>
                                </div>
                                <br/>
                                <label htmlFor={"additionalComments"} className={"flex w-full text-left font-bold"}>Additional
                                    Comments</label>
                                <textarea id={"additionalComments"}
                                          className={"w-full max-w-full h-40 max-h-40 p-1 border-solid border-deep-blue border-2 rounded"}
                                          onChange={handleAdditionalComments}
                                          value={request.additionalComments} required={false}
                                          placeholder="Enter detailed description here..."/>
                            </div>
                        </div>


                        <div className={"formButtons flex gap-4 my-4"}>
                            <Button onClick={handleSubmit} children={"Submit"}/>
                            <Button onClick={handleClear} children={"Clear"}/>
                        </div>
                    </form>
                </div>
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

                    <p className={"font-bold"}>What kind of service would you like to report?</p>
                    <p className={""}>{request.serviceType}</p>

                    <p className={"font-bold"}>What location is this issue in?</p>
                    <p className={""}>{request.location}</p>

                    <p className={"font-bold"}>Contaminant</p>
                    <p className={""}>{request.contaminant}</p>

                    <p className={"font-bold"}>Priority</p>
                    <p className={""}>{request.priority}</p>

                    <p className={"font-bold"}>Status</p>
                    <p className={""}>{request.status}</p>

                    <p className={"font-bold"}>Additional Comments</p>
                    <p className={""}>{request.additionalComments}</p>
                </div>
            </div>
            <p className={"absolute bottom-2 left-2 text-deep-blue font-HeadlandOne"}>Created by Jeremy</p>
        </div>
    );
}

export default Sanitation;
