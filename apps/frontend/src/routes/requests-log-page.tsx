//import Button from "../components/Button.tsx";
import React, {useEffect, useState} from "react";
import {LanguageInterpreterTypes} from 'packages/common/src/languageInterpreterTypes.ts';
import axios from "axios";
//import axios from "axios";
export function RequestLogs(){


    //const [request, setRequest] = useState<LanguageInterpreterType>({language: "", location: ""});
    const [request,setRequest] = useState<LanguageInterpreterTypes[]>([]);

        useEffect(()=>{

            axios.get("/api/languageInterpreter").then((response)=>{
                const requestData = response.data.map((item: LanguageInterpreterTypes) => ({
                    language: item.language,
                    location: item.location
                }));

                console.log("Response data", response.data);

                setRequest(requestData);
            });


        },[]);


    return (

        <div className="flex flex-col gap-10 w-96">

            {request.length > 0 ? (
                request.map((request, index) => (
                    <div>
                        <h2 className="font-HeadlandOne text-2xl pb-3">Language Reguest Log {index + 1}</h2>

                <div className="border-2 border-black p-2 rounded-2xl " key={index}>

                        <p className="font-OpenSans pb-5">Language: {request.language}</p>
                        <p className="font-OpenSans pb-5">Location: {request.location}</p>

                    </div>
                    </div>

                ))
            ) : (
                <div>No requests</div>
            )}
        </div>
    );
}

export default RequestLogs;
