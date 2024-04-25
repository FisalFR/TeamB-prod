import express, { Router } from "express";
import { internalTransportationRequest } from "common/src/service-requests/internal-transportation-request";
const router: Router = express.Router();
import client from "../bin/database-connection";

import internalTransportationFunctions from "../service-request-functions/internal-transportation-functions";

router.get("/", async (req, res) => {
  const formsWithInternalTransportation = await client.$queryRaw`
        SELECT *
        FROM forms
        JOIN internalTransport
        ON forms."formID" = internalTransport."internalTransportationRequest"
    `;
  res.status(200).json(formsWithInternalTransportation);
});

router.post("/insert", async (req, res) => {
  const internalTransportationForm: internalTransportationRequest = req.body;
  res.status(200).json({
    message: await internalTransportationFunctions.internalTransportationInsert(
      internalTransportationForm,
    ),
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
