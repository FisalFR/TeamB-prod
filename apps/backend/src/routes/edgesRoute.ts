import express, { Router, Request, Response } from "express";
import { Prisma } from "database";
import client from "../bin/database-connection";

const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response) {
  const edges = await client.edges.findMany({});
  res.status(200).json(edges);
});

router.get("/getID", async function (req: Request, res: Response) {
  const edges = await client.edges.findMany({
    select: {
      edgeID: true,
    },
  });
  res.status(200).json(edges);
});
export default router;
