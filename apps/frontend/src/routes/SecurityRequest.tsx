import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {SecurityRequest} from "common/src/securityRequest.ts";
import axios from "axios";
import Dropdown from "../components/dropdown.tsx";
import RadioButton from "../components/RadioButton.tsx";
import Button from "../components/Button.tsx";
// import securityPic from "../assets/serviceRequestBanners/security.jpg";

export function SecurityPage() {
    const [request, setRequest] = useState<SecurityRequest>({
        employeeName: "",
        securityReason: "",
        additionalInfo: "",
        location: "",
        priority: "",
        quantity: 1
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
            setRequest({additionalInfo: "", quantity: 1, employeeName: "", securityReason: "", location: "", priority: ""});
            // use resetActive from Dropdown?
            setCleared(true);
        }

    function handleEmployeeInput(str: string): void {
        setCleared(false);
        setRequest({...request, employeeName: str});
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

    function handleQuantityInput(e: ChangeEvent<HTMLInputElement>): void {
        setRequest({...request, quantity: e.target.value});
    }

    function handleNewSubmission(): void {
        setSubmittedWindowVisibility({formScreen: "block", submittedScreen: "hidden"});
        setRequest({additionalInfo: "", employeeName: "", securityReason: "", location: "", priority: "", quantity:1});
        setCleared(false);
    }

    return (
        <>
            <div className="bg-gradient-to-t from-bone-white to-deep-blue relative h-full">
                {/*<img src={securityPic} alt="maintenance Picture" className="w-screen opacity-65 absolute mask-gradient"/>*/}
                <div className="centerContent flex flex-col absolute my-50 right-0 left-0 top-50 bottom-0 margin-auto">
                <div className={submittedWindowVisibility.formScreen}>
                    <div className="relative bg-light-white drop-shadow-2xl  my-10 p-10 px-20 rounded-3xl w-[1100px]">
                        <div className="absolute bg-deep-blue rounded-t-2xl w-full top-0 right-0 bottom-[780px] ">
                            <h1 className={"text-4xl text-white font-extrabold py-4 mt-4"}>Security Service Request</h1>
                        </div>
                        <p className="text-left mt-20">
                        Our facility is committed to ensuring a safe and secure environment for all occupants. Our
                            security services play a vital role in this mission. Please inform your facility manager in
                            advance about your security needs.
                        </p>
                        <br/>
                        <p className="text-left">
                            Our security team is available 24/7. Please fill out the form to request a security service
                            for your location.
                        </p>
                        <br/>
                        <p className="font-bold text-left ">
                            Please select the type of security service and the priority from the dropdown. Any services
                            not listed in the dropdown will need to be requested through facility administration.
                        </p>

                        <form ref={formRef} onSubmit={e => {
                            e.preventDefault();
                        }}>
                            <div className="formTest w-full my-10 grid grid-cols-2 gap-12">
                                <div>
                                    <div>
                                        <p className={"text-left font-bold"}>Employee Name</p>
                                        <div className={"border-solid border-gray-300 blue border-2 rounded"}>
                                            <Dropdown options={employeeOptions} placeholder={"Employee Name"}
                                                      name={"employeeDropdown"}
                                                      id={"employeeName"} value={cleared}
                                                      setInput={handleEmployeeInput} required={true}
                                                      color={"bg-light-white"}
                                                      width={"w-100"}/>
                                        </div>
                                    </div>


                                    <div className="my-5">
                                        <p className={"text-left font-bold"}>What is the priority?</p>
                                        <div className="border-gray-300 border-solid border-2 rounded w-full">
                                            <RadioButton value={"Low"} name={"priority"} id={"priority1"}
                                                         state={request.priority}
                                                         color={"bg-light-white"}
                                                         onChange={handlePriorityInput} required={true}
                                                         width={"w-full"}/>
                                            <RadioButton value={"Medium"} name={"priority"} id={"priority2"}
                                                         state={request.priority}
                                                         color={"bg-light-white"}
                                                         onChange={handlePriorityInput} required={true}
                                                         width={"w-full"}/>
                                            <RadioButton value={"High"} name={"priority"} id={"priority3"}
                                                         state={request.priority}
                                                         color={"bg-light-white"}
                                                         onChange={handlePriorityInput} required={true}
                                                         width={"w-full"}/>
                                            <RadioButton value={"Emergency"} name={"priority"} id={"priority4"}
                                                         state={request.priority}
                                                         color={"bg-light-white"}
                                                         onChange={handlePriorityInput} required={true}
                                                         width={"w-full"}/>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className={"text-left font-bold w-full"}>Quantity of Personnel</p>
                                    <input
                                        className={"border-solid border-gray-300 border-2 rounded overflow-hidden flex items-start p-2 h-9 w-full bg-light-white"}
                                        type="number" id={"quantity"} value={request.quantity} min='1' required
                                        defaultValue={1} onChange={e => handleQuantityInput(e)}/>


                                    <br/>
                                    <div>
                                        <p className={"text-left font-bold"}>What is the location?</p>
                                        <div className="border-solid border-gray-300 border-2 rounded w-full mb-3">
                                            <Dropdown options={locationOptions} placeholder={"Location"}
                                                      name={"locationDropdown"}
                                                      id={"dropdown1"} value={cleared}
                                                      setInput={handleLocationInput} required={true}
                                                      width={"w-full"}
                                            />
                                        </div>
                                        <br/>

                                        <p className={"flex text-left font-bold w-full"}>What is the reason for the
                                            security
                                            request?</p>
                                        <div className="border-gray-300 border-solid border-2 w-full">
                                            <Dropdown
                                                name="reason"
                                                id="reason"
                                                placeholder="Select a reason"
                                                options={securityOptions}
                                                value={cleared}
                                                setInput={(str: string) => setRequest({
                                                    ...request,
                                                    securityReason: str
                                                })}
                                                required={true}
                                                width={"w-full"}/>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <p className={"flex w-full text-left font-bold"}>Additional Info</p>
                            <textarea id={"additionalInfo"}
                                      className={" w-full w-max-full max-w-full p-[5px] border-gray-300 border-solid border-2 rounded h-20"}
                                      onChange={handleAdditionalInfoInput}
                                      value={request.additionalInfo} required={true}
                                      placeholder="Enter detailed description here..."/>
                            <br/>
                            <div className={"formButtons flex gap-4 my-4 space-x-5"}>
                                <Button onClick={handleSubmit} children={"Submit"}/>
                                <Button onClick={handleClear} children={"Clear"}
                                        color={"bg-transparent border-2 border-deep-blue"} text={"text-deep-blue"}/>
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
                                <p className={"font-bold"}>Employee Name</p>
                                <p className={""}>{request.employeeName}</p>

                                <p className={"font-bold"}>What is the location?</p>
                                <p className={""}>{request.location}</p>

                                <p className={"font-bold"}>What is the priority?</p>
                                <p className={""}>{request.priority}</p>

                                <p className={"font-bold"}>What is the security request?</p>
                            <p className={""}>{request.securityReason}</p>

                            <p className={"font-bold"}>How many personnel are required?</p>
                            <p className={""}>{request.quantity}</p>

                        </div>
                    </div>
                    </div>
                    <div>
                        <p className={"font-HeadlandOne text-deep-blue"}>Created by Nick and Henry</p>
                    </div>
                </div>
            </div>
        </>

    );
}

export default SecurityPage;
