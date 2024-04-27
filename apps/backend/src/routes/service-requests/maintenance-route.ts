import express, { request, Router } from "express";
import { MaintenanceRequest } from "common/src/service-requests/maintenance-request";
import maintenanceFunctions from "../../service-request-functions/maintenance-functions";
const router: Router = express.Router();
import client from "../../bin/database-connection";

router.get("/", async (req, res) => {
  const formsWithMaintenance = await client.$queryRaw`
        SELECT *
        FROM forms
        JOIN maintenances
        ON forms."formID" = maintenances."maintenanceRequest"
    `;
  res.status(200).json(formsWithMaintenance);
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

router.get("/location", async (req, res) => {
  const nodeType = await client.nodes.findMany({
    where: {
      NOT: {
        longName: { search: "Hall" },
      },
    },
  });
  res.status(200).json(nodeType);
});

export default router;
