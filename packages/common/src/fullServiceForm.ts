import {maintenances, languageInterpreterRequests, medicineRequests, sanitationRequests, securityRequests, giftRequests} from "database";

export type fullServiceFormType = {
    formID: string
    status: string
    type: string
    assignee: string
    dateCreated: Date
    location: string
    maintenances?: maintenances[]
    language?: languageInterpreterRequests[]
    medicine?: medicineRequests[]
    sanitation?: sanitationRequests[]
    securityRequests?: securityRequests[]
    giftRequests?: giftRequests[]
}
