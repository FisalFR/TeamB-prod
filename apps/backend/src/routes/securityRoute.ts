import express, { Router } from "express";
import { SecurityRequestType } from "common/src/SecurityRequestType";
import SecurityFunctions from "../securityFunctions";
const router: Router = express.Router();
import client from "../bin/database-connection";

// const database: SecurityRequestType[] = [];

// router.get("/", async (req, res) => {
//     const all = await client.securityRequests.findMany(); // whatever is listed in the DB?
//     res.status(200).json(all);
// });

router.get("/location", async (req, res) => {
    const nodeType = await client.nodes.findMany({
        where: {
            NOT: {
                longName: {search: "Hall"},
            },
        },
    });
    res.status(200).json(nodeType);
});

// router.post("/search", async (req, res) => {
//     const securityForm: SecurityRequestType = req.body;
//     res.status(200).json({
//         message: await SecurityFunctions.securityFinder(
//             securityForm.name,
//             securityForm.priority,
//             securityForm.location,
//             securityForm.securityNeeded,
//             securityForm.reason,
//             securityForm.status,
//         ),
//     });
// });

router.post("/insert", async (req, res) => {
    const securityForm: SecurityRequestType = req.body;
    res.status(200).json({
        message: await SecurityFunctions.securityInsert(securityForm),
    });
});

export default router;
