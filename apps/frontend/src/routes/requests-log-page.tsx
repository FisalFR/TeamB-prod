import React, { useEffect, useState } from "react";
import { LanguageInterpreterTypes } from 'packages/common/src/languageInterpreterTypes.ts';
import { MaintenanceRequest } from 'packages/common/src/maintenanceRequest.ts';
import axios from "axios";

export function RequestLogs() {
    const [languageRequests, setLanguageRequests] = useState<LanguageInterpreterTypes[]>([]);

    useEffect(() => {
        axios.get("/api/languageInterpreter").then((response) => {
            setLanguageRequests(response.data);
        });
    }, []);

    return (
        <div className="w-1/2">
            <h2 className="font-HeadlandOne text-2xl pb-3">Language Request Logs</h2>
            {languageRequests.length > 0 ? languageRequests.map((request, index) => (
                    <div className="border-2 border-black p-2 rounded-2xl" key={index}>
                        <p className="font-OpenSans pb-5">Language: {request.language}</p>
                        <p className="font-OpenSans pb-5">Location: {request.location}</p>
                    </div>
                )) : <div>No language requests</div>}
        </div>
    );
}

export function RequestMaintenanceLogs() {
    const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([]);

    useEffect(() => {
        axios.get("/api/maintenance").then((response) => {
            setMaintenanceRequests(response.data);
        });
    }, []);

    return (
        <div className="w-1/2">
            <h2 className="font-HeadlandOne text-2xl pb-3">Maintenance Request Logs</h2>
            {maintenanceRequests.length > 0 ? (
                maintenanceRequests.map((request, index) => (
                    <div className="border-2 border-black p-2 rounded-2xl" key={index}>
                        <p className="font-OpenSans pb-5">Issue: {request.issue}</p>
                        <p className="font-OpenSans pb-5">Location: {request.location}</p>
                        <p className="font-OpenSans pb-5">Urgent: {request.isUrgent ? "Yes" : "No"}</p>
                        <p className="font-OpenSans pb-5">Feedback: {request.feedback}</p>
                    </div>
                ))
            ) : (
                <div>No maintenance requests</div>
            )}
        </div>
    );
}

export default RequestLogs;
