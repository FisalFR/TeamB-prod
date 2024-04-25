import { generateRandomUUIDInteger } from "./randomUUID";

const prisma = client;
import { MedicineRequestType } from "common/src/service-requests/medicine-request-type";
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
        priority: request.priority,
        employeeName: request.employeeName,
      },
    });
    await prisma.medicineRequests.create({
      data: {
        medicineRequest: UUID,
        medicine: request.medicine,
        quantity: parseInt(request.quantity),
        additionalComments: request.additionalComments,
      },
    });
  }
}
export default medicineFunctions;
