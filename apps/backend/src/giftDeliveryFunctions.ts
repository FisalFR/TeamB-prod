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
        type: "Gift Delivery",
        assignee: "",
        location: request.location,
      },
    });

    await prisma.giftRequests.create({
      data: {
        giftRequest: UUID,
        receiverName: request.receiverName,
        senderName: request.senderName,
        message: request.message,
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
