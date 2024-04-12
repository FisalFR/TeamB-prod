import { generateRandomUUIDInteger } from "./randomUUID";

const prisma = client;
import { MaintenanceRequest } from "common/src/maintenanceRequest";
import client from "./bin/database-connection";

class maintenanceFunctions {
  static async maintenanceInsert(request: MaintenanceRequest) {
    const UUID = generateRandomUUIDInteger();
    await prisma.forms.create({
      data: {
        formID: UUID,
        status: "Unassigned",
        type: "Maintenance",
        assignee: "",
        location: request.location,
        priority: request.priority,
      },
    });
    await prisma.maintenances.create({
      data: {
        maintenanceRequest: UUID,
        issue: request.issue,
        feedback: request.feedback,
      },
    });
  }
}
export default maintenanceFunctions;
