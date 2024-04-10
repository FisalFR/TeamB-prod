import express, { Router, Request, Response } from "express";
import { Prisma } from "database";
import client from "../bin/database-connection";

const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response) {
    const nodeType = await client.nodes.findMany({});
    res.status(200).json(nodeType);
});

export default router;
