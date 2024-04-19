//import {useState} from "react";

import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import RadioButton from "../components/RadioButton.tsx";
import {MaintenanceRequest} from "common/src/maintenanceRequest.ts";
import Dropdown from "../components/dropdown.tsx";
import axios from "axios";

export function TransportationRequestPage() {
    // const [request, setRequest] = useState<TransportationRequest>({
    //     employeeName: "",
    //     priority: "",
    //     feedback: "",
    // });
    //TODO switch to my own use state; copy sanitation route backend as example
    const [request, setRequest] = useState<MaintenanceRequest>({employeeName: "", location: "", priority: "", feedback: ""});
    const formRef = useRef<HTMLFormElement>(null);
    const [locationOptions, setLocationOptions] = useState<string[]>([]);
    const [cleared, setCleared] = useState(false);
    useEffect(() => {
        axios.get("/api/maintenance/location").then((response) => {
            const locationOptionsStrings: string[] = [];
            for (let i = 0; i < response.data.length; i++) {
                locationOptionsStrings.push(response.data[i].longName);
            }
            setLocationOptions(locationOptionsStrings);
        });
    }, []);
    function handlePriorityInput(e: ChangeEvent<HTMLInputElement>): void {
        setRequest({...request, priority: e.target.value});
    }
    function handleLocationInput(str: string): void {
        setCleared(false);
        setRequest({...request, location: str});
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
                                {/*onChange={handleNameInput} value={request.employeeName}*/}
                                <input type="text" required
                                       placeholder={"Name"}
                                       className={"border-solid border-deep-blue border-2 rounded overflow-hidden flex items-start p-[5px] w-full"}/>

                            </div>
                            <div>
                                <p className={"text-left font-bold"}>What location is this issue in?</p>
                                <div className="border-deep-blue border-solid border-2 rounded w-fit">
                                    <Dropdown options={locationOptions} placeholder={"Location"}
                                              name={"locationDropdown"}
                                              id={"dropdown1"} value={cleared}
                                              setInput={handleLocationInput} required={true} width={"w-80"}/>
                                </div>
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

                        </form>
                    </div>
                </div>
            </div>
        </>

    );
}

export default TransportationRequestPage;
