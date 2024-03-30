import {ChangeEvent, useRef, useState} from 'react';
import {MaintenanceRequest} from '../common/maintenance-request';
import RadioButton from "../components/RadioButton";
import Button from "../components/button";
import Dropdown from "../components/dropdown";


export function MaintenancePage() {
    const [request, setRequest] = useState<MaintenanceRequest>({issue: "", location: "", isUrgent: "", feedback: ""});
    const [submittedWindowVisibility, setSubmittedWindowVisibility] = useState({
        formScreen: "block",
        submittedScreen: "hidden"
    });
    const [cleared, setCleared] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const locationOptions: string[] = ["Day Surgery Family Waiting", "Pre-Op PACU", "Radiation Oncology TX Suite", "Ultrasound", "Medical Records Conference Room", "Abrams Conference Room", "Outpatient Fluoroscopy (Xray)", "Anesthesia Conference Room", "Helen Hogan Conference Room", "Nuclear Medicine", "Cross-Sectional Interventional Radiology (CSIR) MRI", "Volunteers"];

    function handleSubmit(e: { preventDefault: () => void; }) {
        (formRef.current as HTMLFormElement).requestSubmit();
        e.preventDefault();
        if ((formRef.current as HTMLFormElement).checkValidity()) {
            console.log(request);
            setCleared(true);
            setSubmittedWindowVisibility({formScreen: "hidden", submittedScreen: "block"});
        }
    }

    function handleClear(e: { preventDefault: () => void; }): void {
        e.preventDefault();
        // TODO figure out how to reset dropdown menu from https://thewebdev.info/2021/02/06/how-to-programmatically-clear-or-reset-a-react-select-dropdown/
        setRequest({issue: "", location: "", isUrgent: "", feedback: ""});
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
        setRequest({...request, isUrgent: e.target.value});
    }

    function handleFeedbackInput(e: ChangeEvent<HTMLTextAreaElement>): void {
        setRequest({...request, feedback: e.target.value});
    }

    function handleNewSubmission(): void {
        setSubmittedWindowVisibility({formScreen: "block", submittedScreen: "hidden"});
        // TODO figure out how to reset dropdown menu from https://thewebdev.info/2021/02/06/how-to-programmatically-clear-or-reset-a-react-select-dropdown/
        setRequest({issue: "", location: "", isUrgent: "", feedback: ""});
        // use resetActive from Dropdown?
        setCleared(false);
    }

    return (
        <div className={"maintenanceRequestPage"}>
            <div className={submittedWindowVisibility.formScreen}>
                <h1 className={"text-3xl font-HeadlandOne py-4"}>Welcome to the Maintenance page!</h1>
                <form ref = {formRef} onSubmit={e => {e.preventDefault();}}>
                    <p className={"text-left font-bold"}>What kind of issue would you like to report?</p>
                    <RadioButton value={"Elevator"} name={"issue"} id={"issue1"} state={request.issue}
                                 onChange={handleIssueInput} required={true}/>
                    <RadioButton value={"Power"} name={"issue"} id={"issue2"} state={request.issue}
                                 onChange={handleIssueInput} required={true}/>
                    <RadioButton value={"Plumbing"} name={"issue"} id={"issue3"} state={request.issue}
                                 onChange={handleIssueInput} required={true}/>
                    <RadioButton value={"Door not working"} name={"issue"} id={"issue4"} state={request.issue}
                                 onChange={handleIssueInput} required={true}/>
                    <RadioButton value={"Alarm ringing"} name={"issue"} id={"issue5"} state={request.issue}
                                 onChange={handleIssueInput} required={true}/>
                    <RadioButton value={"Other"} name={"issue"} id={"issue6"} state={request.issue}
                                 onChange={handleIssueInput} required={true}/>

                    <br/>

                    <p className={"text-left font-bold"}>What location is this issue in?</p>
                    <Dropdown options={locationOptions} placeholder={"Location"} name={"locationDropdown"}
                              id={"dropdown1"} value = {cleared}
                              setInput={handleLocationInput} required={true}/>

                    <br/>

                    <p className={"text-left font-bold"}>Is this an urgent issue?</p>
                    <RadioButton value={"Yes"} name={"urgency"} id={"urgency1"} state={request.isUrgent}
                                 onChange={handleUrgentCheck} required={true}/>
                    <RadioButton value={"No"} name={"urgency"} id={"urgency2"} state={request.isUrgent}
                                 onChange={handleUrgentCheck} required={true}/>

                    <br/>

                    {/*TODO change flex?*/}
                    <label htmlFor={"feedback"} className={"flex w-full text-left font-bold"}>Additional Feedback</label>
                    <textarea id={"feedback"} className={"w-full max-w-full h-28 max-h-28 p-1"}
                              onChange={handleFeedbackInput}
                              value={request.feedback} required={request.issue==="Other"}
                              placeholder="Enter Text Here ..."/><br/>

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
                    <p className={"font-bold"}>What kind of issue would you like to report?</p>
                    <p className={""}>{request.issue}</p>

                    <p className={"font-bold"}>What location is this issue in?</p>
                    <p className={""}>{request.location}</p>

                    <p className={"font-bold"}>Is this an urgent issue?</p>
                    <p className={""}>{request.isUrgent}</p>

                    <p className={"font-bold"}>Additional Feedback</p>
                    <p className={""}>{request.feedback}</p>
                </div>
            </div>
        </div>
    );
}

export default MaintenancePage;
