import express, { Router } from "express";
import { MedicineRequestType } from "common/src/MedicineRequestType";
const router: Router = express.Router();
import client from "../bin/database-connection";
import medicineFunctions from "../medicineFunctions";

const database: MedicineRequestType[] = [];

router.get("/", async (req, res) => {
  const all = await client.medicineRequests.findMany();
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

router.post("/search", async (req, res) => {
  const medicineForm: MedicineRequestType = req.body;
  res.status(200).json({
    message: await medicineFunctions.medicineFinder(
      medicineForm.location,
      medicineForm.issue,
    ),
  });
});

router.post("/insert", async (req, res) => {
  const medicineForm: MedicineRequestType = req.body;
  res.status(200).json({
    message: await medicineFunctions.medicineInsert(medicineForm),
  });
});

export default router;
