import { generateRandomUUIDInteger } from "./randomUUID";

const prisma = client;
import client from "./bin/database-connection";
import { SanitationRequest } from "common/src/service-requests/sanitation-request";

class sanitationFunctions {
  static async sanitationInsert(request: SanitationRequest) {
    const UUID = generateRandomUUIDInteger();
    await prisma.forms.create({
      data: {
        formID: UUID,
        status: "Unassigned",
        type: "Sanitation",
        assignee: "",
        location: request.location,
        priority: request.priority,
        employeeName: request.employeeName,
      },
    });
    await prisma.sanitationRequests.create({
      data: {
        sanitationRequest: UUID,
        serviceType: request.serviceType,
        contaminant: request.contaminant,
        additionalComments: request.additionalComments,
      },
    });
  }
}
export default sanitationFunctions;
