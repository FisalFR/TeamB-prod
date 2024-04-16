import { generateRandomUUIDInteger } from "./randomUUID";

const prisma = client;
import { giftRequest } from "common/src/giftRequest";
import client from "./bin/database-connection";

class giftDeliveryFunctions {
  static async giftDeliveryInsert(request: giftRequest) {
    const UUID = generateRandomUUIDInteger();
    await prisma.forms.create({
      data: {
        formID: UUID,
        status: "Unassigned",
        type: "Gift",
        assignee: "",
        location: request.location,
        priority: request.priority,
        employeeName: "N/A",
      },
    });

    await prisma.giftRequests.create({
      data: {
        giftRequest: UUID,
        receiverName: request.receiverName,
        senderName: request.senderName,
        message: request.message,
        date: request.date,
      },
    });

    for (let i = 0; i < request.cart.length; i++) {
      await prisma.giftItem.create({
        data: {
          giftItem: generateRandomUUIDInteger(),
          name: request.cart[i].name,
          quantity: request.cart[i].quantity,
          cost: request.cart[i].cost,
          cart: UUID,
        },
      });
    }
  }
}
export default giftDeliveryFunctions;
