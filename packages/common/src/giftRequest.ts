import {giftItem} from "./giftItem.ts";


export type giftRequest = {
    receiverName: string
    senderName: string
    location: string
    date : Date,
    priority: string,
    message: string
    employeeName: string
    cart: giftItem[]
}
