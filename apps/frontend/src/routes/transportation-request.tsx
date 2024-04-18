//import {useState} from "react";

import React, {useRef} from "react";

export function TransportationRequestPage() {
    // const [request, setRequest] = useState<TransportationRequest>({
    //     employeeName: "",
    //     priority: "",
    //     feedback: "",
    // });
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <>
            <div className="centerContent flex flex-col">
                <div> {/*this us where the submitted form screen function goes*/}
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
                                <p>Employee Name</p>
                                {/*onChange={handleNameInput} value={request.employeeName}*/}
                                <input type="text" required
                                       placeholder={"Name"}
                                       className={"border-solid border-deep-blue border-2 rounded overflow-hidden flex items-start p-[5px] w-full"}/>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
}

export default TransportationRequestPage;
