import express, { Router } from "express";
import { TransportationRequest } from "common/src/service-requests/transportation-request";
const router: Router = express.Router();
import client from "../bin/database-connection";

import transportationFunctions from "../service-request-functions/transportation-functions";

router.get("/", async (req, res) => {
  const formsWithTransportation = await client.$queryRaw`
        SELECT *
        FROM forms
        JOIN transport
        ON forms."formID" = transport."TransportationRequest"
    `;
  res.status(200).json(formsWithTransportation);
});

router.post("/insert", async (req, res) => {
  const transportationForm: TransportationRequest = req.body;
  res.status(200).json({
    message:
      await transportationFunctions.transportationInsert(transportationForm),
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
