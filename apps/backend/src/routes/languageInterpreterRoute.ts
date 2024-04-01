import express, { Router } from "express";
import { languageInterpreterTypes } from "common/src/languageInterpreterTypes";
import languageInterpreterFunctions from "../languageInterpreterFunctions";
const router: Router = express.Router();

const database: languageInterpreterTypes[] = [];

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
  const languageInterpreter: languageInterpreterTypes = req.body;
  res.status(200).json({
    message: await languageInterpreterFunctions.languageInterpreterFinder(
      languageInterpreter.location,
    ),
  });
});

router.post("/insert", async (req, res) => {
  const languageInterpreter: languageInterpreterTypes = req.body;
  res.status(200).json({
    message:
      await languageInterpreterFunctions.languageInterpreterInsert(
        languageInterpreter,
      ),
  });
});

export default router;
