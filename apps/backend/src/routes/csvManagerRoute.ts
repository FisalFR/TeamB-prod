import express, { Router } from "express";
import fileUpload from "express-fileupload";
const router: Router = express.Router();
import client from "../bin/database-connection";
import populateNode from "../populateNode";
import populateEdge from "../populateEdge";
import writeNode from "../writeNode.ts";
import writeEdge from "../writeEdge";

router.use(fileUpload());

router.get("/nodes", async (req, res) => {
  const allNodes = await client.l1Nodes.findMany();
  res.status(200).json(allNodes);
});

router.get("/edges", async (req, res) => {
  const allEdges = await client.l1Edges.findMany();
  res.status(200).json(allEdges);
});

router.post("/uploadNodes", function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  client.l1Edges.deleteMany().then(); // deletes all records of Edges table
  client.l1Nodes.deleteMany().then(); // deletes all records of Nodes table
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
      .split("\r\n")
      .map((row: string): string[] => {
        return row.split(",");
      });
    nodes.shift();
    populateNode.populateNodeDB(nodes).then(res.send("File uploaded!"));
  }
});

router.post("/uploadEdges", function (req, res) {
  console.log(req);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const importedEdgesFile = req.files.importedEdges;
  client.l1Edges.deleteMany().then(); // deletes all records of Edges table
  if (!Array.isArray(importedEdgesFile)) {
    // Resolves type ambiguity to allow the use of importedEdgesFile.data
    const edges = importedEdgesFile.data
      .toString()
      .split("\r\n")
      .map((row: string): string[] => {
        return row.split(",");
      });
    edges.shift();
    populateEdge.populateEdgeDB(edges).then(res.send("File uploaded!"));
  }
});

router.get("/exportNodes", async (req, res) => {
  const nodeFile = await writeNode.nodeDownload();
  console.log(nodeFile);
  res.setHeader("Content-disposition", "attachment; filename=nodeDataFile.csv");
  res.set("Content-Type", "text/csv");
  res.status(200).send(nodeFile);
});
router.get("/exportEdges", async (req, res) => {
  const nodeFile = await writeEdge.edgeDownload();
  console.log(nodeFile);
  res.setHeader("Content-disposition", "attachment; filename=edgeDataFile.csv");
  res.set("Content-Type", "text/csv");
  res.status(200).send(nodeFile);
});

export default router;
