import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {LanguageInterpreterTypes} from 'common/src/languageInterpreterTypes.ts';
import Dropdown from "../components/dropdown.tsx";
import Button from "../components/Button.tsx";
import axios from "axios";
import RadioButton from "../components/RadioButton.tsx";
// import interpreterPic from "../assets/serviceRequestBanners/interpreter.jpg";

function LanguageInterpreter(){
    const [request, setRequest] = useState<LanguageInterpreterTypes>(
        {language: "", location: "", priority: "", employeeName: "", feedback: "" });
    const [submittedWindowVisibility, setSubmittedWindowVisibility] = useState({
        requestScreen: "block",
        submittedScreen: "hidden"
    });
    const [cleared, setCleared] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);


    const languages: string[] = [
        "English",
        "Mandarin Chinese",
        "Hindi",
        "Spanish",
        "French",
        "Modern Standard Arabic",
        "Bengali",
        "Russian",
        "Nigerian Pidgin",
        "Portuguese",
        "Swahili",
        "Korean",
        "Russian",
        "German",
        "Japanese",
        "Urdu",
        "Vietnamese",
        "Indonesian",
        "Telugu",
        "Turkish",
        "Wu Chinese",
        "Tagalog",
        "Iranian Persian",
        "Hausa",
        "Thai",
        "Yu Chinese",
        "Italian",
        "Egyptian Arabic",
        "Marathi",
        "Sign Language (ASL)"
    ];
    const [locationOptions, setLocationOptions] = useState<string[]>([]);
    function handleSubmitLanguage(e: { preventDefault: () => void; }) {

        (formRef.current as HTMLFormElement).requestSubmit();
        e.preventDefault();

        if ((formRef.current as HTMLFormElement).checkValidity()) {
            axios.post("/api/languageInterpreter/insert",request,{
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then();
            setCleared(true);
            setSubmittedWindowVisibility({requestScreen: "hidden", submittedScreen: "block"});
            setCleared(true);
            setSubmittedWindowVisibility({requestScreen: "hidden", submittedScreen: "block"});
        }
    }

    useEffect(() => {
        axios.get("/api/languageInterpreter/location").then((response) => {
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



    function handleClearLanguage(e: { preventDefault: () => void; }): void {
        e.preventDefault();
        // TODO figure out how to reset dropdown menu from https://thewebdev.info/2021/02/06/how-to-programmatically-clear-or-reset-a-react-select-dropdown/
        setRequest({language: "", location: "", priority: "", employeeName:"", feedback:""});
        // use resetActive from Dropdown?

        setCleared(true);

    }
    function handleLocationInput(str: string): void {
        setCleared(false);
        setRequest({...request, location: str});
    }
    function handleLanguageInput(str: string): void {
        setCleared(false);
        setRequest({...request, language: str});
    }
    function handleNewSubmissionLanguage(): void {
        setSubmittedWindowVisibility({requestScreen: "block", submittedScreen: "hidden"});
        // TODO figure out how to reset dropdown menu from https://thewebdev.info/2021/02/06/how-to-programmatically-clear-or-reset-a-react-select-dropdown/
        setRequest({language: "", location: "", priority: "", employeeName:"", feedback:""});
        // use resetActive from Dropdown?
        setCleared(false);
    }
    function handlePriorityInput(e: ChangeEvent<HTMLInputElement>): void {
        setRequest({...request, priority: e.target.value});
    }
    function handleEmployeeInput(str: string): void {
        setCleared(false);
        setRequest({...request, employeeName: str});
    }
    function handleFeedbackInput(e: ChangeEvent<HTMLTextAreaElement>): void {
        setRequest({...request, feedback: e.target.value});
    }

    return (
        <>
            <div className="bg-gradient-to-t from-bone-white to-deep-blue relative h-full">
            {/*<img src={interpreterPic} alt="language interpreter Picture" className="w-screen opacity-65 absolute h-80 mask-gradient"/>*/}
            <div className="centerContent flex flex-col absolute my-50 right-0 left-0 top-60 bottom-0 margin-auto">

                <div className="interpreterContent px-50">
                    <div className={submittedWindowVisibility.requestScreen}>

                        <div className="">
                            <div className="relative bg-light-white my-10 p-10 px-20 rounded-3xl shadow-2xl">
                                <div className="bg-deep-blue rounded-t-2xl absolute top-0 w-full right-[0px] p-8">
                                    <h1 className={"text-4xl font-OpenSans text-white font-extrabold"}>Language Interpreter Request</h1>
                                </div>

                                <p className="text-left mt-20">
                                    Brigham and Women's Hospital is committed to clearly and thoroughly communicating
                                    with
                                    all
                                    patients
                                    and
                                    their families about the care we provide.
                                    Interpreter services for non-English speaking and deaf and hard of hearing patients
                                    are
                                    important to
                                    quality health care.
                                    Please let your doctor know in advance about your language or hearing needs.
                                </p>
                                <br/>
                                <p className="text-left">
                                    Spanish interpreters are available 24 hours a day by appointment only; interpreters
                                    for
                                    29 other
                                    languages are available as needed.
                                    Sign Language interpreters are available Monday-Friday, 9:00 a.m. to 5:00 p.m.
                                    Please
                                    fill out
                                    the
                                    form
                                    to request an interpreter to your location.
                                </p>
                                <br/>
                                <p className="font-bold text-left ">Please select the languages in the dropdown. Any
                                    languages
                                    entered that are not in the dropdown will need
                                    to be requested through hospital administration.
                                </p>
                                <br/>

                            <form ref={formRef} onSubmit={e => {
                                e.preventDefault();
                            }} className="flex flex-col w-full justify-around">
                                    <p className={"text-left font-bold"}>Employee Name</p>
                                    <div className={"border-solid border-deep-blue border-2 rounded w-fit"}>
                                        <Dropdown options={employeeOptions} placeholder={"Employee Name"}
                                                  name={"employeeDropdown"}
                                                  id={"employeeName"} value={cleared}
                                                  setInput={handleEmployeeInput} required={true}
                                                  width={"w-100"}/>
                                    </div>
                                <br/>
                                <div className="flex flex-row justify-between">
                                    <div>
                                        <label className="float-left font-bold"> What language do you need an
                                            interpreter for?</label>
                                        <br/>
                                        <div
                                            className=" float-left border-solid border-deep-blue border-2 rounded">
                                        <Dropdown options={languages} placeholder={"Languages"}
                                                      name={"languagesDropdown"}
                                                      id={"dropdown2"} value={cleared}
                                                      setInput={handleLanguageInput} required={true}
                                                      width={"w-100"}/>

                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-items-start">
                                            <label className="flex justify-start font-bold">What room do you need the
                                                interpreter?</label>
                                            <div
                                                className=" float-start inline-block border-solid border-deep-blue border-2 rounded">
                                                <Dropdown options={locationOptions} placeholder={"Location"}
                                                          name={"locationsDropdown"}
                                                          id={"dropdown3"} value={cleared}
                                                          setInput={handleLocationInput} required={true}
                                                          width={"w-100"}/>
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="flex justify-between">
                                        <div className="w-fit">
                                            <p className={"text-left font-bold "}>What is the priority of this
                                                request?</p>
                                            <div className={"border-solid border-deep-blue border-2 rounded "}>
                                                <RadioButton value={"Low"} name={"priority"} id={"priority1"}
                                                             state={request.priority}
                                                             onChange={handlePriorityInput} required={true}
                                                             width={"w-100"}/>
                                                <RadioButton value={"Medium"} name={"priority"} id={"priority2"}
                                                             state={request.priority}
                                                             onChange={handlePriorityInput} required={true}
                                                             width={"w-100"}/>
                                                <RadioButton value={"High"} name={"priority"} id={"priority3"}
                                                             state={request.priority}
                                                             onChange={handlePriorityInput} required={true}
                                                             width={"w-100"}/>
                                                <RadioButton value={"Emergency"} name={"priority"} id={"priority4"}
                                                             state={request.priority}
                                                             onChange={handlePriorityInput} required={true}
                                                             width={"w-100"}/>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor={"feedback"} className={"flex w-full text-left font-bold"}>Additional
                                                Comments</label>
                                            <textarea id={"feedback"}
                                                      className={"w-100 max-w-full h-40 max-h-40 p-1 border-solid border-deep-blue border-2 rounded"}
                                                      onChange={handleFeedbackInput}
                                                      value={request.feedback} required={false}
                                                      placeholder="Enter detailed description here..."/>
                                        </div>
                                    </div>
                                    <div className="formButtons pt-10 flex gap-4 space-x-5">
                                        <Button onClick={handleSubmitLanguage} children={"Submit"}/>
                                        <Button onClick={handleClearLanguage} children={"Clear"} color={"bg-transparent border-2 border-deep-blue"} text={"text-deep-blue"}/>
                                    </div>
                                </form>
                            </div>
                        </div>


                    </div>

                    <div className={submittedWindowVisibility.submittedScreen}>
                        <div className="pt-32">
                            <div className="p-6 bg-white rounded-2xl">
                                <p className="font-HeadlandOne p-3 text-xl">Thank you for submitting!</p>
                                <Button onClick={handleNewSubmissionLanguage} children="Submit a new request"/>
                            </div>
                            <div className={"text-left"}>
                                <h3 className={"p-3 text-lg text-center font-HeadlandOne mt-3"}>Previous Form
                                    Submission:</h3>
                                <p className={"font-bold"}> Employee Name </p>
                                <p className={""}> {request.employeeName}</p>

                                <p className={"font-bold"}>What language do you need an interpreter for?</p>
                                <p className={""}>{request.language}</p>

                                <p className={"font-bold"}>What room do you need the interpreter?</p>
                                <p className={""}>{request.location}</p>

                                <p className="font-bold">What is the priority of this request?</p>
                                <p className={""}>{request.priority}  </p>

                                <p className="font-bold">Additional Comments </p>
                                <p className={""}>{request.feedback}  </p>


                            </div>
                        </div>

                    </div>
                </div>
                <div>
                    <p className={"font-HeadlandOne text-deep-blue"}>Created by Theresa</p>
                </div>
            </div>
            </div>
        </>
    );

}

export default LanguageInterpreter;
