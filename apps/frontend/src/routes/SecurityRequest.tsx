import {ChangeEvent, useEffect, useRef, useState} from "react";
import {SecurityRequest} from "common/src/securityRequest.ts";
import axios from "axios";
import Dropdown from "../components/dropdown.tsx";
import RadioButton from "../components/RadioButton.tsx";
import Button from "../components/Button.tsx";

export function SecurityPage() {
    const [request, setRequest] = useState<SecurityRequest>({employeeName: "", request: "", location: "", priority: ""});
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
            setRequest({employeeName: "", request: "", location: "", priority: ""});
            // use resetActive from Dropdown?
            setCleared(true);
        }

    function handleNameInput(e: ChangeEvent<HTMLInputElement>): void {
        setRequest({...request, employeeName: e.target.value});
    }

    function handleRequestInput(e: ChangeEvent<HTMLTextAreaElement>): void {
        setRequest({...request, request: e.target.value});
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
        setRequest({employeeName: "", request: "", location: "", priority: ""});
        setCleared(false);
    }

    return (
        <div className="centerContent">
            <div className={submittedWindowVisibility.formScreen}>
                <h1 className={"text-3xl font-HeadlandOne py-4"}>Security Service Request</h1>
                <p>Fill out the form below to make a security request.</p>

                <form ref={formRef} onSubmit={e => {
                    e.preventDefault();
                }}>
                    <p className={"text-left font-bold"}>Employee Name</p>
                    <input className={"flex w-full text-left font-bold "} onChange={handleNameInput}/>

                    <p className={"flex w-full text-left font-bold"}>What is the security request?</p>
                    <div className="border-deep-blue border-solid border-2">
                            <textarea id={"feedback"} className={"w-full max-w-full h-28 max-h-28 p-1"}
                                      onChange={handleRequestInput}
                                      value={request.request} required={true}
                                      placeholder="Enter detailed description here..."/>
                    </div>

                    <p className={"text-left font-bold"}>What is the location?</p>
                    <div className="border-deep-blue border-solid border-2">
                        <Dropdown options={locationOptions} placeholder={"Location"} name={"locationDropdown"}
                                  id={"dropdown1"} value={cleared}
                                  setInput={handleLocationInput} required={true}/>
                    </div>

                    <p className={"text-left font-bold"}>What is the priority?</p>
                    <div className="border-deep-blue border-solid border-2">
                        <RadioButton value={"Low"} name={"priority"} id={"priority1"} state={request.priority}
                                     onChange={handlePriorityInput} required={true}/>
                        <RadioButton value={"Medium"} name={"priority"} id={"priority2"} state={request.priority}
                                     onChange={handlePriorityInput} required={true}/>
                        <RadioButton value={"High"} name={"priority"} id={"priority3"} state={request.priority}
                                     onChange={handlePriorityInput} required={true}/>
                        <RadioButton value={"Emergency"} name={"priority"} id={"priority4"} state={request.priority}
                                     onChange={handlePriorityInput} required={true}/>
                    </div>

                    <div className={"formButtons flex gap-4 my-4"}>
                        <Button onClick={handleSubmit} children={"Submit"}/>
                        <Button onClick={handleClear} children={"Clear"}/>
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

                    <p className={"font-bold"}>What is the security request?</p>
                    <p className={""}>{request.request}</p>

                    <p className={"font-bold"}>What is the location?</p>
                    <p className={""}>{request.location}</p>

                    <p className={"font-bold"}>What is the priority?</p>
                    <p className={""}>{request.priority}</p>
                </div>
            </div>
        </div>
    );
}

export default SecurityPage;
