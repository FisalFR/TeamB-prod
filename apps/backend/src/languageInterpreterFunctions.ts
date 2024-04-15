import { languageInterpreterTypes } from "common/src/languageInterpreterTypes";
const prisma = client;
import client from "./bin/database-connection";
import { generateRandomUUIDInteger } from "./randomUUID";

class languageInterpreterFunctions {
  static async languageInterpreterFinder(loc: string) {
    const result: object | languageInterpreterTypes =
      await prisma.languageInterpreterRequests.findMany({
        where: {
          location: { search: loc },
        },
      });
    return result;
  }

  static async languageInterpreterInsert(request: languageInterpreterTypes) {
    const UUID = generateRandomUUIDInteger();
    await prisma.forms.create({
      data: {
        formID: UUID,
        status: "Unassigned",
        type: "Language",
        assignee: "",
        location: request.location,
        priority: request.priority,
        employeeName: request.employeeName,
      },
    });
    await prisma.languageInterpreterRequests.create({
      data: {
        languageRequest: UUID,
        language: request.language,
        feedback: request.feedback,
      },
    });
  }
}
export default languageInterpreterFunctions;
