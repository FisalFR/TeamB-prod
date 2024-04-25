import express, { Router } from "express";
import { SanitationRequest } from "common/src/service-requests/sanitation-request";
import sanitationFunctions from "../service-request-functions/sanitation-functions";
const router: Router = express.Router();
import client from "../bin/database-connection";

router.post("/insert", async (req, res) => {
  const sanitationForm: SanitationRequest = req.body;
  res.status(200).json({
    message: await sanitationFunctions.sanitationInsert(sanitationForm),
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
