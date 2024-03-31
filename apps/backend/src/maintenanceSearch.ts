const prisma = client;
import { MaintenanceRequest } from "common/src/MaintenanceRequest";
import client from "./bin/database-connection";

class maintenanceSearch {
  static async maintenanceFinder(loc: string, iss: string) {
    const result: object | MaintenanceRequest =
      await prisma.maintenances.findMany({
        where: {
          issue: { search: loc },
          location: { search: iss },
        },
      });
    return result;
  }
}
export default maintenanceSearch;
