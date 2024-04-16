import {giftItem} from "./giftItem.ts";


export type giftRequest = {
    receiverName: string
    senderName: string
    location: string
    priority: string
    date : string,
    message: string
    employeeName: string
    date: string
    priority: string
    cart: giftItem[]
}
