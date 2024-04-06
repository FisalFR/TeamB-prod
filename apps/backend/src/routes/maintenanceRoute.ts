import express, { request, Router } from "express";
import { MaintenanceRequest } from "common/src/maintenanceRequest";
import maintenanceFunctions from "../maintenanceFunctions";
const router: Router = express.Router();
import client from "../bin/database-connection";

const database: MaintenanceRequest[] = [];

router.get("/", async (req, res) => {
  const formsWithMaintenance = await client.$queryRaw`
        SELECT *
        FROM forms
        JOIN maintenances
        ON forms."formID" = maintenances."maintenanceRequest"
    `;
  res.status(200).json(formsWithMaintenance);
});

router.get("/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < database.length) {
    res.status(200).json(database[index]);
  } else {
    res.status(400).json({
      message: "not a valid index",
    });
  }
});

router.post("/search", async (req, res) => {
  const maintenanceForm: MaintenanceRequest = req.body;
  res.status(200).json({
    message: await maintenanceFunctions.maintenanceFinder(
      maintenanceForm.location,
      maintenanceForm.issue,
    ),
  });
});

router.post("/insert", async (req, res) => {
  const maintenanceForm: MaintenanceRequest = req.body;
  res.status(200).json({
    message: await maintenanceFunctions.maintenanceInsert(maintenanceForm),
  });
});

export default router;
