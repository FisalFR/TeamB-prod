import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {SecurityRequest} from "common/src/securityRequest.ts";
import axios from "axios";
import Dropdown from "../components/dropdown.tsx";
import RadioButton from "../components/RadioButton.tsx";
import Button from "../components/Button.tsx";

export function SecurityPage() {
    const [request, setRequest] = useState<SecurityRequest>({
        employeeName: "",
        securityReason: "",
        additionalInfo: "",
        location: "",
        priority: "",
        quantity: 0
    });
    const securityOptions: string[] = ["Theft","Walk to Car"," Trespassing","Intruder","Threat","VIP","Assault"];
    const [submittedWindowVisibility, setSubmittedWindowVisibility] = useState({
        formScreen: "block",
        submittedScreen: "hidden"
    });
    const [cleared, setCleared] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [locationOptions, setLocationOptions] = useState<string[]>([]);

    useEffect(() => {
        axios.get("/api/security/location").then((response) => {
            const locationOptionsStrings: string[] = [];
            for (let i = 0; i < response.data.length; i++) {
                locationOptionsStrings.push(response.data[i].longName);
            }
            console.log(locationOptionsStrings);
            setLocationOptions(locationOptionsStrings);
        });
    }, []);

        function handleSubmit(e: { preventDefault: () => void; }) {
            (formRef.current as HTMLFormElement).requestSubmit();
            e.preventDefault();
            if ((formRef.current as HTMLFormElement).checkValidity()) {
                axios.post("/api/security/insert",request,{
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
            setRequest({additionalInfo: "", quantity: 0, employeeName: "", securityReason: "", location: "", priority: ""});
            // use resetActive from Dropdown?
            setCleared(true);
        }

    function handleNameInput(e: ChangeEvent<HTMLInputElement>): void {
        setRequest({...request, employeeName: e.target.value});
    }


    function handleAdditionalInfoInput(e: ChangeEvent<HTMLTextAreaElement>): void {
        setRequest({...request, additionalInfo: e.target.value});
    }

    function handleLocationInput(str: string): void {
        setCleared(false);
        setRequest({...request, location: str});
    }

    function handlePriorityInput(e: ChangeEvent<HTMLInputElement>): void {
        setRequest({...request, priority: e.target.value});
    }

    function handleNewSubmission(): void {
        setSubmittedWindowVisibility({formScreen: "block", submittedScreen: "hidden"});
        setRequest({additionalInfo: "", employeeName: "", securityReason: "", location: "", priority: "", quantity:0});
        setCleared(false);
    }

    return (
        <div className="centerContent">
            <div className={submittedWindowVisibility.formScreen}>
                <h1 className={"text-4xl font-HeadlandOne py-4"}>Security Service Request</h1>
                <p className="pb-8 text-center">Fill out the form below to make a security request.</p>

                <form ref={formRef} onSubmit={e => {
                    e.preventDefault();
                }}>
                    <div className="formTest gap-24">
                        <p className={"text-left font-bold"}>Employee Name</p>
                        <div className="border-deep-blue border-solid border-2 w-full">
                            <input
                                className={"border-solid border-deep-blue overflow-hidden flex items-start p-[5px] w-full"}
                                onChange={handleNameInput}
                                value={request.employeeName}
                                placeholder={"Name"}/>

                        </div>
                        <br/>
                        <p className={"text-left font-bold"}>What is the location?</p>
                        <div className="border-deep-blue border-solid border-2">
                            <Dropdown options={locationOptions} placeholder={"Location"} name={"locationDropdown"}
                                      id={"dropdown1"} value={cleared}
                                      setInput={handleLocationInput} required={true}
                                      width={"w-full"}/>
                        </div>
                        <br/>
                        <div className="grid grid-cols-2 space-x-3 flex-auto">
                            <div>
                        <p className={"text-left font-bold"}>What is the priority?</p>
                        <div className="border-deep-blue border-solid border-2 w-full">
                            <RadioButton value={"Low"} name={"priority"} id={"priority1"} state={request.priority}
                                         onChange={handlePriorityInput} required={true} width={"w-full"}/>
                            <RadioButton value={"Medium"} name={"priority"} id={"priority2"} state={request.priority}
                                         onChange={handlePriorityInput} required={true} width={"w-full"}/>
                            <RadioButton value={"High"} name={"priority"} id={"priority3"} state={request.priority}
                                         onChange={handlePriorityInput} required={true} width={"w-full"}/>
                            <RadioButton value={"Emergency"} name={"priority"} id={"priority4"} state={request.priority}
                                         onChange={handlePriorityInput} required={true} width={"w-full"}/>
                        </div>
                            </div>
                            <div>
                                <p className={"text-left font-bold w-full"}>Quantity of Personnel</p>
                                <input
                                    className={"border-solid border-deep-blue border-2 rounded overflow-hidden flex items-start p-2 h-9 w-full"}
                                    type="number" min='1' required placeholder={'1'}/>


                        <br/>

                        <p className={"flex w-full text-left font-bold"}>What is the reason for the security
                            request?</p>
                        <div className="border-deep-blue border-solid border-2 w-full">
                            <Dropdown
                                      name = "reason"
                                      id = "reason"
                                      placeholder="Select a reason"
                                      options={securityOptions}
                                      value={cleared}
                                      setInput={(str:string)=> setRequest({...request, securityReason:str})}
                                      required={true}
                                      width={""}
                            />
                        </div>
                            </div>
                        </div>
                        <br/>
                        <p className={"flex w-full text-left font-bold"}>Additional Info</p>
                            <textarea id={"additionalInfo"} className={"w-full w-max-full max-w-full p-[5px] border-deep-blue border-solid border-2"}
                                      onChange={handleAdditionalInfoInput}
                                      value={request.additionalInfo} required={true}
                                      placeholder="Enter detailed description here..."/>
                        <br/>
                        <div className={"formButtons flex gap-4 my-4"}>
                            <Button onClick={handleSubmit} children={"Submit"}/>
                            <Button onClick={handleClear} children={"Clear"}/>
                        </div>
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
                    <p className={"font-bold"}>Employee Name</p>
                    <p className={""}>{request.employeeName}</p>

                    <p className={"font-bold"}>What is the location?</p>
                    <p className={""}>{request.location}</p>

                    <p className={"font-bold"}>What is the priority?</p>
                    <p className={""}>{request.priority}</p>

                    <p className={"font-bold"}>What is the security request?</p>
                    <p className={""}>{request.securityReason}</p>

                    <p className={"font-bold"}>How many personnel are required??</p>
                    <p className={""}>{request.quantity}</p>

                    <p className={"font-bold"}>What is the priority?</p>
                    <p className={""}>{request.priority}</p>
                </div>
            </div>
        </div>
    );
}

export default SecurityPage;
