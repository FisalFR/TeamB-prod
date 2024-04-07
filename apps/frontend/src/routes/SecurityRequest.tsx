import {useEffect, useRef, useState} from "react";
//import {SecurityRequest} from "common/src/securityRequest.ts";
import axios from "axios";

export function SecurityRequest() {
    //const [request, setRequest] = useState<SecurityRequest>({name: "", request: "", location: "", priority: ""});
    const [submittedWindowVisibility] = useState({
        formScreen: "block",
        submittedScreen: "hidden"
    });
    //const [cleared, setCleared] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    //const [locationOptions, setLocationOptions] = useState<string[]>([]);

    useEffect(() => {
        axios.get("/api/maintenance/location").then((response) => {
            const locationOptionsStrings: string[] = [];
            for (let i = 0; i < response.data.length; i++) {
                locationOptionsStrings.push(response.data[i].longName);
            }
            console.log(locationOptionsStrings);
            //setLocationOptions(locationOptionsStrings);
        });
    }, []);
/*
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
        setRequest({name: "", request: "", location: "", priority: ""});
        // use resetActive from Dropdown?
        setCleared(true);

    }

    function handleNameInput(e: ChangeEvent<HTMLInputElement>): void {
        setRequest({...request, name: e.target.value});
    }

    function handleRequestInput(e: ChangeEvent<HTMLInputElement>): void {
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
        setRequest({name: "", request: "", location: "", priority: ""});
        setCleared(false);
    }*/

    return (
        <div className="centerContent">
            <div className={submittedWindowVisibility.formScreen}>
                <h1 className={"text-3xl font-HeadlandOne py-4"}>Security Service Request</h1>
                <p>Fill out the form below to make a security request.</p>

                <form ref={formRef} onSubmit={e => {e.preventDefault();}}>
                    <input className={"flex w-full text-left font-bold"}>Employee Name</input>
                </form>
            </div>
            <div className={submittedWindowVisibility.submittedScreen}>

            </div>
        </div>
    );
}
