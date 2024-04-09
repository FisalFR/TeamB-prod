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

    for (let i = 0; i < request.cart.length; i++) {
      await prisma.giftItem.create({
        data: {
          name: request.cart[i].name,
          cost: request.cart[i].cost,
          quantity: request.cart[i].quantity,
        },
      });

      //TODO: Need to fetch the ID's that for loop creates and then put it inside the cart
    }
    await prisma.giftRequests.create({
      data: {
        giftRequest: UUID,
        receiverName: request.receiverName,
        senderName: request.senderName,
        message: request.message,
        cart: request.cart,
      },
    });
  }
}
export default giftDeliveryFunctions;
