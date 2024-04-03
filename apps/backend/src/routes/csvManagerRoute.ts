import express, { Router } from "express";
import fileUpload from "express-fileupload";
const router: Router = express.Router();
import client from "../bin/database-connection";
import populateNode from "../populateNode";
import populateEdge from "../populateEdge";

router.use(fileUpload());

router.get("/", async (req, res) => {
  // TODO add if statement or refactor to use a different URL
  const allNodes = await client.l1Nodes.findMany();
  res.status(200).json(allNodes);
});

router.post("/uploadNodes", function (req, res) {
  client.l1Edges.deleteMany().then(); // deletes all records of Edges table
  client.l1Nodes.deleteMany().then(); // deletes all records of Nodes table
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const importedNodesFile = req.files.importedNodes;

  // for debugging
  // if (!Array.isArray(importedNodesFile)) {
  //   // Resolves type ambiguity to allow the use of importedNodesFile.data
  //   console.log(importedNodesFile.data);
  //   console.log(importedNodesFile.data.toString());
  // }

  if (!Array.isArray(importedNodesFile)) {
    // Resolves type ambiguity to allow the use of importedNodesFile.data
    const nodes = importedNodesFile.data
      .toString()
      .split("\n")
      .map((row: string): string[] => {
        return row.split(",");
      });
    nodes.shift();
    populateNode.populateNodeDB(nodes).then();
  }

  res.send("File uploaded!");
});

router.post("/uploadEdges", function (req, res) {
  client.l1Edges.deleteMany().then(); // deletes all records of Edges table

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const importedEdgesFile = req.files.importedEdges;

  if (!Array.isArray(importedEdgesFile)) {
    // Resolves type ambiguity to allow the use of importedEdgesFile.data
    const edges = importedEdgesFile.data
      .toString()
      .split("\n")
      .map((row: string): string[] => {
        return row.split(",");
      });
    edges.shift();
    populateEdge.populateEdgeDB(edges).then();
  }

  res.send("File uploaded!");
});

export default router;
