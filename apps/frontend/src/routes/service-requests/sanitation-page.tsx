import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {SanitationRequest} from "common/src/service-requests/sanitation-request.ts";
import RadioButton from "../../components/input-components/RadioButton.tsx";
import Button from "../../components/buttons/Button.tsx";
import Dropdown from "../../components/input-components/Dropdown.tsx";
import axios from "axios";
import sanitationPic from "../../assets/serviceRequestBanners/sanitation.jpg";

function Sanitation() {
    const [request, setRequest] = useState<SanitationRequest>({employeeName: '', priority: '', location: '', serviceType: '', contaminant: '', additionalComments: '', status: ''});
    const [submittedWindowVisibility, setSubmittedWindowVisibility] = useState({
        formScreen: "block",
        submittedScreen: "hidden"
    });
    const [cleared, setCleared] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

   // const employeeNameOptions: string[] = ["Employee 1", "Employee 2", "Employee 3", "Employee 4"];
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

    function handleEmployeeInput(str: string): void {
        setCleared(false);
        setRequest({...request, employeeName: str});
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
        <>
            <div className="bg-gradient-to-t from-bone-white to-deep-blue relative h-full">
                <img src={sanitationPic} alt="maintenance Picture" className="w-screen opacity-65 absolute h-80"/>
                <div className="centerContent flex flex-col absolute my-50 right-0 left-0 top-50 bottom-0 margin-auto">
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
                                <div className={"border-solid border-deep-blue border-2 rounded"}>
                                    <Dropdown options={employeeOptions} placeholder={"Employee Name"}
                                              name={"employeeDropdown"}
                                              id={"employeeName"} value={cleared}
                                              setInput={handleEmployeeInput} required={true}
                                              width={"w-100"}/>
                                </div>

                                <br/>
                                <p className={"text-left font-bold"}>What kind of service?</p>
                                <div className="border-solid border-deep-blue border-2 rounded overflow-hidden w-full">
                                    <RadioButton value={"Bed Cleaning"} name={"serviceType"} id={"serviceType1"}
                                                 state={request.serviceType}
                                                 onChange={handleInput} required={true}
                                                 width={"w-full"}/>
                                    <RadioButton value={"Toilet Cleaning"} name={"serviceType"} id={"serviceType2"}
                                                 state={request.serviceType}
                                                 onChange={handleInput} required={true}
                                                 width={"w-full"}/>
                                    <RadioButton value={"General Sanitation"} name={"serviceType"} id={"serviceType3"}
                                                 state={request.serviceType}
                                                 onChange={handleInput} required={true}
                                                 width={"w-full"}/>
                                </div>
                                <br/>
                                <p className={"text-left font-bold"}>Priority</p>
                                <div className="border-solid border-deep-blue border-2 rounded overflow-hidden">
                                    <RadioButton value={"Low"} name={"priority"} id={"priority1"}
                                                 state={request.priority}
                                                 onChange={handleInput} required={true}
                                                 width={"w-full"}/>
                                    <RadioButton value={"Medium"} name={"priority"} id={"priority2"}
                                                 state={request.priority}
                                                 onChange={handleInput} required={true}
                                                 width={"w-full"}/>
                                    <RadioButton value={"High"} name={"priority"} id={"priority3"}
                                                 state={request.priority}
                                                 onChange={handleInput} required={true}
                                                 width={"w-full"}/>
                                    <RadioButton value={"Emergency"} name={"priority"} id={"priority3"}
                                                 state={request.priority}
                                                 onChange={handleInput} required={true}
                                                 width={"w-full"}/>
                                </div>

                                </div>

                                <div>


                                <p className={"text-left font-bold"}>What location is this issue in?</p>
                                <div className="border-solid border-deep-blue border-2 rounded ">
                                    <Dropdown options={locationOptions} placeholder={"Location"}
                                              name={"locationDropdown"}
                                              id={"dropdown1"} value={cleared}
                                              setInput={handleLocationInput} required={true}
                                              width={"w-100"}/>
                                </div>
                                <br/>
                                <p className={"text-left font-bold"}>Contaminant</p>
                                <div className="border-solid border-deep-blue border-2 rounded overflow-hidden">
                                    <RadioButton value={"Biological Fluids"} name={"contaminant"} id={"contaminant1"}
                                                 state={request.contaminant}
                                                 onChange={handleInput} required={true}
                                                 width={"w-full"}/>
                                    <RadioButton value={"Waste Stains"} name={"contaminant"} id={"contaminant2"}
                                                 state={request.contaminant}
                                                 onChange={handleInput} required={true}
                                                 width={"w-full"}/>
                                    <RadioButton value={"Dust and Debris"} name={"contaminant"} id={"contaminant3"}
                                                 state={request.contaminant}
                                                 onChange={handleInput} required={true}
                                                 width={"w-full"}/>
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
                    <div className="pt-32">
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
                </div>
                <div>
                    <p className={"font-HeadlandOne text-deep-blue"}>Created by Jeremy and Ben</p>
                </div>
            </div>
            </div>
        </>
    );
}

export default Sanitation;
