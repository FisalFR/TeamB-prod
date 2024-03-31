import express, { Router } from "express";
import { MaintenanceRequest } from "common/src/MaintenanceRequest";
import maintenanceSearch from "../maintenanceSearch";
const router: Router = express.Router();
import client from "../bin/database-connection";

const database: MaintenanceRequest[] = [];

router.get("/", async (req, res) => {
  const all = await client.maintenances.findMany();
  res.status(200).json(all);
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

router.post("/", async (req, res) => {
  const maintenanceForm: MaintenanceRequest = req.body;
  res.status(200).json({
    message: await maintenanceSearch.maintenanceFinder(
      maintenanceForm.location,
      maintenanceForm.issue,
    ),
  });
});

export default router;
