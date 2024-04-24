import { generateRandomUUIDInteger } from "./randomUUID";

const prisma = client;
import client from "./bin/database-connection";
import { internalTransportationRequest } from "common/src/internalTransportationRequest";

class internalTransportationFunctions {
  static async internalTransportationInsert(
    request: internalTransportationRequest,
  ) {
    const UUID = generateRandomUUIDInteger();
    await prisma.forms.create({
      data: {
        formID: UUID,
        status: "Unassigned",
        type: "Internal Transport",
        assignee: "",
        location: request.startlocation,
        priority: request.priority,
        employeeName: request.employeeName,
      },
    });
    await prisma.internalTransportationRequests.create({
      data: {
        internalTransportationRequest: UUID,
        feedback: request.feedback,
        endlocation: request.endlocation,
      },
    });
  }
}
export default internalTransportationFunctions;
