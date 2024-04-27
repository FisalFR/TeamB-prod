import express, { Router, Request, Response } from "express";
import client from "../bin/database-connection";
import employee from "../../../../packages/common/src/employee";
import userProfile from "../../../../packages/common/src/profile";

const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response) {
  const employee = await client.employee.findMany({});
  res.status(200).json(employee);
});

router.post("/employeeInfo", async function (req: Request, res: Response) {
  const { employeeEmail }: { employeeEmail: string } = req.body;
  const employee: employee = await client.employee.findUnique({
    where: {
      employeeEmail: employeeEmail,
    },
  });
  res.status(200).json(employee);
});

router.post("/insertPicture", async function (req: Request, res: Response) {
  const user: userProfile = req.body;
  const employee: userProfile = await client.employee.update({
    where: {
      employeeEmail: user.employeeEmail,
    },
    data: {
      picture: user.picture,
    },
  });
  res.status(200).json(employee);
});

export default router;
