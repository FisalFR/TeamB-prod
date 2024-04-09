import express, { Router } from "express";
import { giftRequest } from "common/src/giftRequest";
const router: Router = express.Router();
import client from "../bin/database-connection";
import giftDeliveryFunctions from "../giftDeliveryFunctions";

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
  const giftDeliveryForm: giftRequest = req.body;
  res.status(200).json({
    message: await giftDeliveryFunctions.giftDeliveryInsert(giftDeliveryForm),
  });
});

export default router;
