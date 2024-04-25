import express, { Router } from "express";
import { LanguageInterpreterTypes } from "common/src/service-requests/language-interpreter-types";
import languageInterpreterFunctions from "../languageInterpreterFunctions";
import client from "../bin/database-connection";
const router: Router = express.Router();

const database: LanguageInterpreterTypes[] = [];

router.get("/", async (req, res) => {
  const formsWithLanguageStrings = await client.$queryRaw`
    SELECT *
    FROM forms
    JOIN "languageInterpreterRequests"
    ON forms."formID" = "languageInterpreterRequests"."languageRequest"`;
  res.status(200).json(formsWithLanguageStrings);
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

router.post("/search", async (req, res) => {
  const languageInterpreter: LanguageInterpreterTypes = req.body;
  res.status(200).json({
    message: await languageInterpreterFunctions.languageInterpreterFinder(
      languageInterpreter.location,
    ),
  });
});

router.post("/insert", async (req, res) => {
  const languageInterpreter: LanguageInterpreterTypes = req.body;
  res.status(200).json({
    message:
      await languageInterpreterFunctions.languageInterpreterInsert(
        languageInterpreter,
      ),
  });
});

export default router;
