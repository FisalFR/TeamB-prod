import {useRef, useState} from "react";
import {LanguageInterpreterType} from 'common/src/languageInterpreterTypes.ts';
import Dropdown from "../components/dropdown.tsx";
import Button from "../components/Button.tsx";
import axios from "axios";

function LanguageInterpreter(){
    const [request, setRequest] = useState<LanguageInterpreterType>({language: "", location: ""});
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
    const locationOptions: string[] = ["Day Surgery Family Waiting", "Pre-Op PACU", "Radiation Oncology TX Suite", "Ultrasound", "Medical Records Conference Room", "Abrams Conference Room", "Outpatient Fluoroscopy (Xray)", "Anesthesia Conference Room", "Helen Hogan Conference Room", "Nuclear Medicine", "Cross-Sectional Interventional Radiology (CSIR) MRI", "Volunteers"];
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
            setSubmittedWindowVisibility({formScreen: "hidden", submittedScreen: "block"});
            setCleared(true);
            setSubmittedWindowVisibility({requestScreen: "hidden", submittedScreen: "block"});
        }
    }

    function handleClearLanguage(e: { preventDefault: () => void; }): void {
        e.preventDefault();
        // TODO figure out how to reset dropdown menu from https://thewebdev.info/2021/02/06/how-to-programmatically-clear-or-reset-a-react-select-dropdown/
        setRequest({language: "", location: ""});
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
        setRequest({language: "", location: ""});
        // use resetActive from Dropdown?
        setCleared(false);
    }

    return (
        <div className="interpreterContent px-20">
            <div className={submittedWindowVisibility.requestScreen}>


                <div className="">
                    <h1 className={" text-3xl font-HeadlandOne "}>Language Interpreter Request</h1>
                    <br/>
                    <p className="text-left">
                        Brigham and Women's Hospital is committed to clearly and thoroughly communicating with all
                        patients
                        and
                        their families about the care we provide.
                        Interpreter services for non-English speaking and deaf and hard of hearing patients are
                        important to
                        quality health care.
                        Please let your doctor know in advance about your language or hearing needs.
                    </p>
                    <br/>
                    <p className="text-left">
                        Spanish interpreters are available 24 hours a day by appointment only; interpreters for 29 other
                        languages are available as needed.
                        Sign Language interpreters are available Monday-Friday, 9:00 a.m. to 5:00 p.m. Please fill out
                        the
                        form
                        to request an interpreter to your location.
                    </p>
                    <br/>
                    <p className="font-bold text-left">Please select the languages in the dropdown. Any languages
                        entered that are not in the dropdown will need
                        to be requested through hospital administration.
                    </p>
                    <br/>
                    <h2 className=" float-left inline-block">What language do you need an interpreter for?</h2>
                    <h2 className=" float-right inline-block">What room do you need the interpreter?</h2>
                    <br/>
                    <form ref={formRef} onSubmit={e => {
                        e.preventDefault();
                    }}>

                        <div className="pt-3 float-left inline-block">
                            <Dropdown options={languages} placeholder={"Languages"} name={"languagesDropdown"}
                                      id={"dropdown2"} value={cleared}
                                      setInput={handleLanguageInput} required={true}/>
                        </div>


                        <div className="pt-3 float-right inline-block">

                            <Dropdown options={locationOptions} placeholder={"Location"} name={"locationsDropdown"}
                                      id={"dropdown3"} value={cleared}
                                      setInput={handleLocationInput} required={true}/>
                        </div>

                        <div className={"formButtons pt-32 flex gap-4 space-x-5"}>

                            <Button onClick={handleSubmitLanguage} children={"Submit"}/>
                            <Button onClick={handleClearLanguage} children={"Clear"}/>
                        </div>

                    </form>

                </div>


            </div>

            <div className={submittedWindowVisibility.submittedScreen}>
                <div className="p-6 bg-white rounded-2xl">
                    <p className="font-HeadlandOne p-3 text-xl">Thank you for submitting!</p>
                    <Button onClick={handleNewSubmissionLanguage} children="Submit a new request"/>
                </div>
                <div className={"text-left"}>
                    <h3 className={"p-3 text-lg text-center font-HeadlandOne mt-3"}>Previous Form Submission:</h3>
                    <p className={"font-bold"}>What language do you need an interpreter for?</p>
                    <p className={""}>{request.language}</p>

                    <p className={"font-bold"}>What room do you need the interpreter?</p>
                    <p className={""}>{request.location}</p>


                </div>
            </div>

        </div>

    );

}

export default LanguageInterpreter;
