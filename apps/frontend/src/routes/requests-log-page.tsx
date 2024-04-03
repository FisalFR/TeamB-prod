import React, { useEffect, useState } from "react";
import axios from "axios";

function LogBook() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const languageResponse = await axios.get("/api/languageInterpreter");
                const maintenanceResponse = await axios.get("/api/maintenance");

                const newLogs = [
                    ...languageResponse.data.map(request => ({
                        type: "Language",
                        message: `Language: ${request.language}, Location: ${request.location}`
                    })),
                    ...maintenanceResponse.data.map(request => ({
                        type: "Maintenance",
                        message: `Issue: ${request.issue}, Location: ${request.location}, Urgent: ${request.isUrgent ? "Yes" : "No"}, Feedback: ${request.feedback}`
                    }))
                ];

                setLogs(prevLogs => [...prevLogs, ...newLogs]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <h2 style={{ fontSize: "18px", margin: "0", marginBottom: "10px" }}>Log Book</h2>
            <div style={{ width: "100%", overflowY: "auto", padding: "10px", boxSizing: "border-box" }}>
                {logs.map((log, index) => (
                    <div key={index} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", marginBottom: "10px" }}>
                        <strong>{log.type}</strong>
                        <p>{log.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LogBook;
