import { generateRandomUUIDInteger } from "./randomUUID";

const prisma = client;
import { MedicineRequestType } from "common/src/MedicineRequestType";
import client from "./bin/database-connection";

class medicineFunctions {
  static async medicineInsert(request: MedicineRequestType) {
    const UUID = generateRandomUUIDInteger();
    await prisma.forms.create({
      data: {
        formID: UUID,
        status: "Unassigned",
        type: "Medicine",
        assignee: "",
        location: request.location,
      },
    });
    await prisma.medicineRequests.create({
      data: {
        medicineRequest: UUID,
        employeeName: request.employeeName,
        priority: request.priority,
        medicine: request.medicine,
        quantity: request.quantity,
        additionalComments: request.additionalComments,
      },
    });
  }
}
export default medicineFunctions;
