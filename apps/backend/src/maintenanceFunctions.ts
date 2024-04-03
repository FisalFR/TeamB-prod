const prisma = client;
import { MaintenanceRequest } from "common/src/maintenanceRequest";
import client from "./bin/database-connection";

class maintenanceFunctions {
  static async maintenanceFinder(loc: string, iss: string) {
    const result: object | MaintenanceRequest =
      await prisma.maintenances.findMany({
        where: {
          issue: { search: iss },
          location: { search: loc },
        },
      });
    return result;
  }

  static async maintenanceInsert(request: MaintenanceRequest) {
    await prisma.maintenances.create({
      data: {
        location: request.location,
        issue: request.issue,
        isUrgent: request.isUrgent,
        feedback: request.feedback,
      },
    });
  }
}
export default maintenanceFunctions;
