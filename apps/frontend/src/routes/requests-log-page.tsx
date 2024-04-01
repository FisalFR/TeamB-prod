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
        <div className="flex flex-col">
            {request.length > 0 ? (
                request.map((request, index) => (
                    <div key={index}>
                        <p>Language: {request.language}</p>
                        <p>Location: {request.location}</p>
                    </div>
                ))
            ) : (
                <div>No requests</div>
            )}
        </div>
    );
}

export default RequestLogs;
