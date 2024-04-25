import { generateRandomUUIDInteger } from "./randomUUID";

const prisma = client;
import client from "./bin/database-connection";
import { TransportationRequest } from "common/src/service-requests/transportation-request";

class transportationFunctions {
  static async transportationInsert(request: TransportationRequest) {
    const UUID = generateRandomUUIDInteger();
    await prisma.forms.create({
      data: {
        formID: UUID,
        status: "Unassigned",
        type: "External Transportation",
        assignee: "",
        location: request.location,
        priority: request.priority,
        employeeName: request.employeeName,
      },
    });
    await prisma.transportationRequests.create({
      data: {
        transportationRequest: UUID,
        feedback: request.feedback,
        address: request.address,
        transport: request.transport,
      },
    });
  }
}
export default transportationFunctions;
