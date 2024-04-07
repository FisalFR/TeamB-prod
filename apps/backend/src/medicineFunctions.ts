const prisma = client;
import { MedicineRequestType } from "common/src/MedicineRequestType";
import client from "./bin/database-connection";

class medicineFunctions {
  static async medicineFinder(loc: string, iss: string) {
    const result: object | MedicineRequestType =
      await prisma.medicineRequests.findMany({
        where: {
          issue: { search: iss },
          location: { search: loc },
        },
      });
    return result;
  }

  static async medicineInsert(request: MedicineRequestType) {
    await prisma.medicineRequests.create({
      data: {
        employeeName: request.employeeName,
        priority: request.priority,
        location: request.location,
        medicine: request.medicine,
        quantity: request.quantity,
        additionalComments: request.additionalComments,
      },
    });
  }
}
export default medicineFunctions;
