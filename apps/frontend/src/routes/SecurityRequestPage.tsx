import {ChangeEvent, useEffect, useRef, useState} from "react";
import {SecurityRequestType} from "common/src/SecurityRequestType.ts";
import Dropdown from "frontend/src/components/dropdown.tsx";
import RadioButton from "frontend/src/components/RadioButton.tsx";
import Button from "frontend/src/components/Button.tsx";
import {ServiceRequestDisplay} from "frontend/src/components/display-component/ServiceRequestDisplay.tsx";
import axios from "axios";

export function SecurityRequestPage() {
    const initialRequestState: SecurityRequestType = {
        "name": "",
        "priority": "",
        "location": "",
        "securityNeeded": "",
        "reason": "",
        "status": "",
    }; // empty state of form on initial load
    const formRef = useRef<HTMLFormElement>(null);

    const [request, setRequest] = useState<SecurityRequestType>(initialRequestState); // useState for a single request
    // TODO refactor to not need a useState if data will just be sent to DB
    const [securityRequestData, setSecurityRequestData] = useState<SecurityRequestType[]>([]); // collection of requests
    const [cleared, setCleared] = useState(false); // for use with dropdown components

    const[locations, setLocations] = useState<string[]>();
    // const locationOptions: string[] = ["Day Surgery Family Waiting", "Pre-Op PACU", "Radiation Oncology TX Suite", "Ultrasound", "Medical Records Conference Room", "Abrams Conference Room", "Outpatient Fluoroscopy (Xray)", "Anesthesia Conference Room", "Helen Hogan Conference Room", "Nuclear Medicine", "Cross-Sectional Interventional Radiology (CSIR) MRI", "Volunteers"];
    const reasonOptions: string[] = ["Suspicious Person", "Assistance", "Escort"];

    function handleNameInput(e: ChangeEvent<HTMLInputElement>): void {
        setRequest({...request, name: e.target.value});
    }

    function handlePriorityInput(e: ChangeEvent<HTMLInputElement>): void {
        setRequest({...request, priority: e.target.value});
    }

    function handleLocationInput(str: string): void {
        setCleared(false);
        setRequest({...request, location: str});
    }

    function handleSecurityNeededInput(e: ChangeEvent<HTMLInputElement>): void {
        setRequest({...request, securityNeeded: e.target.value});
    }

    function handleReasonInput(str: string): void {
        setCleared(false);
        setRequest({...request, reason: str});
    }

    function handleStatusInput(e: ChangeEvent<HTMLInputElement>): void {
        setRequest({...request, status: e.target.value});
    }

    function clearForm() {
        setCleared(true);
        setRequest(initialRequestState); // empties form contents
    }

    function handleSubmit(e: { preventDefault: () => void; }) {
        // TODO add validation and axios+express functionality
        setSecurityRequestData(securityRequestData.concat(request));

        (formRef.current as HTMLFormElement).requestSubmit();
        e.preventDefault();
        if ((formRef.current as HTMLFormElement).checkValidity()) {
            axios.post("/api/security/insert",request,{
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then();
            setCleared(true);
            clearForm();
            // setSubmittedWindowVisibility({formScreen: "hidden", submittedScreen: "block"});
        }
    }

    useEffect(() => {
        axios.get("/api/security/location").then((response) => {
            const locationOptionStrings: string[] = [];
            for (let i = 0; i < response.data.length; i++) {
                locationOptionStrings.push(response.data[i].longName);
            }
            setLocations(locationOptionStrings);
        });
    }, []);

    return (
        <div className="centerContent flex-col">
            <form ref = {formRef} onSubmit={e => {e.preventDefault();}}>
                <div id={"nameDiv"}>
                    <p className={"text-left font-bold"}>Employee Name:</p>
                    <input className={"w-full"} onChange={handleNameInput} value={request.name}/>
                    <br/>
                </div>
                <div id={"priorityDiv"}>
                    <p className={"text-left font-bold"}>Priority</p>
                    <RadioButton value={"Low"} name={"priority"} id={"priority1"} state={request.priority}
                                 onChange={handlePriorityInput} required={true}/>
                    <RadioButton value={"Medium"} name={"priority"} id={"priority2"} state={request.priority}
                                 onChange={handlePriorityInput} required={true}/>
                    <RadioButton value={"High"} name={"priority"} id={"priority3"} state={request.priority}
                                 onChange={handlePriorityInput} required={true}/>
                    <RadioButton value={"Emergency"} name={"priority"} id={"priority4"} state={request.priority}
                                 onChange={handlePriorityInput} required={true}/>
                    <br/>
                </div>
                <div id={"locationDiv"}>
                    <p className={"text-left font-bold"}>What location is this issue in?</p>
                    <Dropdown options={locations} placeholder={"Location"} name={"locationDropdown"}
                              id={"dropdown1"} value={cleared}
                              setInput={handleLocationInput} required={true}/>
                    <br/>
                </div>
                <div id={"securityNeededDiv"}>
                    <p className={"text-left font-bold"}>Is security needed?</p>
                    <RadioButton value={"Yes"} name={"security"} id={"security1"} state={request.securityNeeded}
                                 onChange={handleSecurityNeededInput} required={true}/>
                    <RadioButton value={"No"} name={"security"} id={"security2"} state={request.securityNeeded}
                                 onChange={handleSecurityNeededInput} required={true}/>
                    <br/>
                </div>
                <div id={"reasonDiv"}>
                    <p className={"text-left font-bold"}>What is the reason?</p>
                    <Dropdown options={reasonOptions} placeholder={"Reason"} name={"reasonDropdown"}
                              id={"dropdown2"} value={cleared}
                              setInput={handleReasonInput} required={true}/>
                    <br/>
                </div>
                <div id={"statusDiv"}>
                    <p className={"text-left font-bold"}>What is the status?</p>
                    <RadioButton value={"Unassigned"} name={"status"} id={"status1"} state={request.status}
                                 onChange={handleStatusInput} required={true}/>
                    <RadioButton value={"Assigned"} name={"status"} id={"status2"} state={request.status}
                                 onChange={handleStatusInput} required={true}/>
                    <RadioButton value={"InProgress"} name={"status"} id={"status3"} state={request.status}
                                 onChange={handleStatusInput} required={true}/>
                    <RadioButton value={"Closed"} name={"status"} id={"status4"} state={request.status}
                                 onChange={handleStatusInput} required={true}/>
                    <br/>
                </div>
                <div className={"formButtons flex gap-4 my-4"}>
                    <Button onClick={handleSubmit} children={"Submit"}/>
                    <Button onClick={clearForm} children={"Clear"}/>
                </div>
            </form>
            <table className={"w-full table-fixed"}>
                {/*<tr>*/}
                {/*    <th> Name </th>*/}
                {/*    <th> Priority </th>*/}
                {/*    <th> Location </th>*/}
                {/*    <th> Security Needed </th>*/}
                {/*    <th> Reason </th>*/}
                {/*    <th> Status </th>*/}
                {/*</tr>*/}
                <tbody id={"requestDisplayDiv"} className="">
                {securityRequestData.map(
                    (securityRequest) => (
                        <ServiceRequestDisplay
                            submittedRequest={securityRequest}></ServiceRequestDisplay>
                    )
                )
                }
                </tbody>
            </table>
        </div>
    );
}

export default SecurityRequestPage;
