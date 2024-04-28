import {giftItem} from "./gift-item.ts";


export type giftRequest = {
    receiverName: string
    senderName: string
    location: string
    priority: string
    date : string,
    message: string
    employeeName: string
    cart: giftItem[]
}
