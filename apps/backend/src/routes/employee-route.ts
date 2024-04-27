import express, { Router, Request, Response } from "express";
import client from "../bin/database-connection";

const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response) {
  const employee = await client.employee.findMany({});
  res.status(200).json(employee);
});

export default router;
