import express, { Router } from "express";
import { MedicineRequestType } from "common/src/service-requests/medicine-request-type";
const router: Router = express.Router();
import client from "../../bin/database-connection";
import medicineFunctions from "../../service-request-functions/medicine-functions";

router.get("/", async (req, res) => {
  const all = await client.medicineRequests.findMany();
  res.status(200).json(all);
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

router.post("/insert", async (req, res) => {
  const medicineForm: MedicineRequestType = req.body;
  res.status(200).json({
    message: await medicineFunctions.medicineInsert(medicineForm),
  });
});

export default router;
