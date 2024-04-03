import { languageInterpreterTypes } from "common/src/languageInterpreterTypes";
const prisma = client;
import client from "./bin/database-connection";

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
    await prisma.languageInterpreterRequests.create({
      data: {
        language: request.language,
        location: request.location,
      },
    });
  }
}
export default languageInterpreterFunctions;
