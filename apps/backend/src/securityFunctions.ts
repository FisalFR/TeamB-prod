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
        employeeName: request.employeeName,
      },
    });
    await prisma.securityRequests.create({
      data: {
        securityRequest: UUID,
        request: request.securityReason,
        quantity: parseInt(request.quantity),
        additionalInfo: request.additionalInfo,
      },
    });
  }
}
export default securityFunctions;
