import { generateRandomUUIDInteger } from "./randomUUID";

const prisma = client;
import client from "./bin/database-connection";
import { SecurityRequest } from "common/src/securityRequest";

class securityFunctions {
  static async securityInsert(request: SecurityRequest) {
    const UUID = generateRandomUUIDInteger();
    await prisma.forms.create({
      data: {
        formID: UUID,
        status: "Unassigned",
        type: "Security",
        assignee: "",
        location: request.location,
        priority: request.priority,
      },
    });
    await prisma.securityRequests.create({
      data: {
        securityRequest: UUID,
        employeeName: request.employeeName,
        request: request.securityReason,
        quantity: request.quantity,
        additionalInfo: request.additionalInfo,
      },
    });
  }
}
export default securityFunctions;
