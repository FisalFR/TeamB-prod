import express, { Router } from "express";
import fileUpload from "express-fileupload";
const router: Router = express.Router();
import client from "../bin/database-connection";
import readNode from "../readNode";
import populateNode from "../populateNode";
import readEdge from "../readEdge";
import populateEdge from "../populateEdge";
import { filePath } from "common/src/file-path";
import fs from "fs";

router.use(fileUpload());

router.post("/upload", function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const importedNodesFile = req.files.importedNodes;
  console.log(importedNodesFile);

  client.l1Edges.deleteMany({}); // deletes all records of Edges table
  client.l1Nodes.deleteMany({}); // deletes all records of Nodes table

  // Store info in .env ???
  // populateNode.populateNodeDB(importedNodesFile);

  res.send(importedNodesFile); // "File uploaded!"
});

router.get("/", async (req, res) => {
  // TODO add if statement or refactor to use a different URL
  const allNodes = await client.l1Nodes.findMany();
  res.status(200).json(allNodes);
});

router.post("/nodes", async (req, res) => {
  await client.l1Edges.deleteMany({}); // deletes all records of Edges table
  await client.l1Nodes.deleteMany({}); // deletes all records of Nodes table

  // TODO refactor and remove
  const incomingNodes: filePath = req.body;

  fs.writeFileSync("../../data/" + incomingNodes, "");

  res.status(200).json({
    message: await populateNode.populateNodeDB(
      await readNode.readNodeCSV(incomingNodes.filePath),
    ),
  });
});

router.post("/edges", async (req, res) => {
  await client.l1Edges.deleteMany({}); // deletes all records of Edges table

  const incomingEdges: string = req.body;

  res.status(200).json({
    message: await populateEdge.populateEdgeDB(
      await readEdge.readEdgeCSV(incomingEdges),
    ),
  });
});

export default router;
