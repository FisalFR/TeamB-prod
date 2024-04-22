import {maintenances, languageInterpreterRequests, medicineRequests, sanitationRequests, securityRequests, giftRequests, transportationRequests} from "database";

export type fullServiceFormType = {
    formID: string
    status: string
    type: string
    assignee: string
    dateCreated: Date
    location: string
    priority: string
    employeeName: string
    maintenances?: maintenances[]
    language?: languageInterpreterRequests[]
    medicine?: medicineRequests[]
    sanitation?: sanitationRequests[]
    securityRequests?: securityRequests[]
    giftRequests?: giftRequests[]
    transportationRequests?: transportationRequests[]
}
