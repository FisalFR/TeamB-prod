export type SecurityRequestType = {
    name: string;
    priority: string; //"" | "Low" | "Medium" | "High" | "Emergency";
    location: string;
    securityNeeded: string; //"" | "Yes" | "No";
    reason: string; // reason for security request
    status: string; //"" | "Unassigned" | "Assigned" | "InProgress" | "Closed";
}