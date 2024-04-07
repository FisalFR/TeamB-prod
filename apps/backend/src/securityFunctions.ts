const prisma = client;
import { SecurityRequestType } from "common/src/SecurityRequestType";
import client from "./bin/database-connection";

class SecurityFunctions {
    // Colin said securityFinder was extraneous as of

    // static async securityFinder(name: string, prio: string, ) {
    //     const result: object | SecurityRequestType =
    //         await prisma.security?.findMany({
    //             where: {
    //                 name: { ? },
    //                 priority: { ? },
    //                 location: { ? },
    //                 securityNeeded: { ? },
    //                 reason: { ? },
    //                 status: { ? },
    //             },
    //         });
    //     return result;
    // }

    static async securityInsert(request: SecurityRequestType) {
        await prisma.security.create({
            data: {
                name: request.name,
                priority: request.priority,
                // location: request.location,
                securityNeeded: request.securityNeeded,
                reason: request.reason,
                status: request.status,
            },
        });
    }
}
export default SecurityFunctions;
