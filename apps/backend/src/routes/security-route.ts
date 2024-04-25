import express, { Router } from "express";
import { SecurityRequest } from "common/src/service-requests/security-request";
import securityFunctions from "../service-request-functions/security-functions";
const router: Router = express.Router();
import client from "../bin/database-connection";

router.post("/insert", async (req, res) => {
  const securityForm: SecurityRequest = req.body;
  res.status(200).json({
    message: await securityFunctions.securityInsert(securityForm),
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
