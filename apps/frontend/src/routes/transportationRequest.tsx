
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import RadioButton from "../components/RadioButton.tsx";
import {TransportationRequest} from "common/src/transportationRequest.ts";
import Dropdown from "../components/dropdown.tsx";
import axios from "axios";
import Button from "../components/Button.tsx";

export function TransportationRequestPage() {
    const [request, setRequest] = useState<TransportationRequest>({
        employeeName: "",
        priority: "",
        feedback: "",
        location:"",
        address: "",
        transport: "",
    });
    //TODO switch to my own use state; copy sanitation route backend as example
    const formRef = useRef<HTMLFormElement>(null);
    const [locationOptions, setLocationOptions] = useState<string[]>([]);
    //const [TransportOptions, setTransportOptions] = useState<string[]>([]);
    const [cleared, setCleared] = useState(false);
    useEffect(() => {
        axios.get("/api/maintenance/location").then((response) => {
            const locationOptionsStrings: string[] = [];
            for (let i = 0; i < response.data.length; i++) {
                locationOptionsStrings.push(response.data[i].longName);
            }
            setLocationOptions(locationOptionsStrings);
        });
        //TODO create database for transport options
    }, []);

    function handleSubmit(e: { preventDefault: () => void; }) {
        (formRef.current as HTMLFormElement).requestSubmit();
        e.preventDefault();
        if ((formRef.current as HTMLFormElement).checkValidity()) {
            axios.post("/api/transport/insert",request,{
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then();
            setCleared(true);
           // setSubmittedWindowVisibility({formScreen: "hidden", submittedScreen: "block"});
        }
    }
    function handleClear(e: { preventDefault: () => void; }): void {
        e.preventDefault();
        // TODO figure out how to reset dropdown menu from https://thewebdev.info/2021/02/06/how-to-programmatically-clear-or-reset-a-react-select-dropdown/
        setRequest({feedback: "", employeeName: "", location: "", priority: "", address:"", transport:""});
        // use resetActive from Dropdown?
        setCleared(true);
    }
    function handlePriorityInput(e: ChangeEvent<HTMLInputElement>): void {
        setRequest({...request, priority: e.target.value});
    }
    function handleLocationInput(str: string): void {
        setCleared(false);
        setRequest({...request, location: str});
    }
    function handleFeedbackInput(e: ChangeEvent<HTMLTextAreaElement>): void {
        setRequest({...request, feedback: e.target.value});
    }
    function handleNameInput(e: ChangeEvent<HTMLInputElement>): void{
        setRequest({...request, employeeName: e.target.value});
    }
    function handleAddressInput(e: ChangeEvent<HTMLInputElement>): void{
        setRequest({...request, address:e.target.value});
    }
    function handleTransportInput(str: string): void {
        setCleared(false);
        setRequest({...request, transport: str});
    }

    return (
        <>
            <div className="centerContent flex flex-col">
                <div> {/*TODO this us where the submitted form screen function goes*/}
                    <div className="bg-light-white my-10 p-10 px-20 rounded-3xl w-auto">
                        <div>
                            <h1 className="text-3xl font-HeadlandOne py-4"> Welcome to the External Patient
                                Transportation page! </h1>
                            <p>Fill out the form below if a patient needs to be transported to a location outside of the
                                hospital.</p>
                        </div>
                        <br/>
                        <form ref={formRef} onSubmit={e => {
                            e.preventDefault();
                        }}>
                            <div>
                                <p className="font-bold">Employee Name</p>
                                <input type="text" required
                                       placeholder={"Name"}
                                       onChange={handleNameInput} value={request.employeeName}
                                       className={"border-solid border-deep-blue border-2 rounded overflow-hidden flex items-start p-[5px] w-full"}/>

                            </div>
                            <div>
                                <p className={"text-left font-bold"}>What room is the patient in?</p>
                                <div className="border-deep-blue border-solid border-2 rounded w-fit">
                                    <Dropdown options={locationOptions} placeholder={"Location"}
                                              name={"locationDropdown"}
                                              id={"dropdown1"} value={cleared}
                                              setInput={handleLocationInput} required={true} width={"w-80"}/>
                                </div>
                            </div>
                            <div>
                                <p className={"text-left font-bold"}>How will the patient be transported?</p>
                                <div className="border-deep-blue border-solid border-2 rounded w-fit">
                                    <Dropdown options={locationOptions} placeholder={"Transport Type"}
                                              name={"TransportDropdown"}
                                              id={"dropdown2"} value={cleared}
                                              setInput={handleTransportInput} required={true} width={"w-80"}/>
                                </div>
                            </div>
                            <div>
                                <p className="font-bold">Drop off Location Address</p>

                                <input type="text" required
                                       placeholder={"Address"}
                                       onChange={handleAddressInput} value={request.address}
                                       className={"border-solid border-deep-blue border-2 rounded overflow-hidden flex items-start p-[5px] w-full"}/>
                            </div>
                            <div>
                                <p className={"text-left font-bold "}>What is the priority of this request?</p>
                                <div className={"border-solid border-deep-blue border-2 rounded"}>
                                    <RadioButton value={"Low"} name={"priority"} id={"priority1"}
                                                 state={request.priority}
                                                 onChange={handlePriorityInput} required={true} width={"w-80"}/>
                                    <RadioButton value={"Medium"} name={"priority"} id={"priority2"}
                                                 state={request.priority}
                                                 onChange={handlePriorityInput} required={true} width={"w-80"}/>
                                    <RadioButton value={"High"} name={"priority"} id={"priority3"}
                                                 state={request.priority}
                                                 onChange={handlePriorityInput} required={true} width={"w-80"}/>
                                    <RadioButton value={"Emergency"} name={"priority"} id={"priority4"}
                                                 state={request.priority}
                                                 onChange={handlePriorityInput} required={true} width={"w-80"}/>
                                </div>
                            </div>
                            <div>
                                <p className="font-bold">Additional Comments </p>
                                <textarea id={"feedback"}
                                          className={"w-full max-w-full h-28 max-h-28 p-1 border-deep-blue border-solid border-2 rounded"}
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
            </div>
        </>

    );
}

export default TransportationRequestPage;
