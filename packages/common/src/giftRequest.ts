import {giftItem} from "./giftItem.ts";


export type giftRequest = {
    receiverName: string
    senderName: string
    location: string
    date : string,
    priority: string,
    message: string
    employeeName: string
    cart: giftItem[]
}
