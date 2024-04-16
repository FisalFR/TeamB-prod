import {giftItem} from "./giftItem.ts";


export type giftRequest = {
    receiverName: string
    senderName: string
    location: string
    message: string
    employeeName: string
    date: string
    priority: string
    cart: giftItem[]
}
