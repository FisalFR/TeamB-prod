import express, { Router } from "express";
import fileUpload from "express-fileupload";
const router: Router = express.Router();
import client from "../bin/database-connection";
import populateNode from "../populateNode";
import populateEdge from "../populateEdge";
import writeNode from "../writeNode.ts";
import writeEdge from "../writeEdge";
//import edge from "common/src/edge";

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
    return res.send("No files were uploaded.");
  }
  const importedNodesFile = req.files.importedNodes;
  if (!Array.isArray(importedNodesFile)) {
    // Resolves type ambiguity to allow the use of importedNodesFile.data
    const nodes = importedNodesFile.data
      .toString()
      .split("\r\n")
      .map((row: string): string[] => {
        return row.split(",");
      });
    nodes.shift();
    try {
      client.l1Edges.deleteMany().then(() => {
        client.l1Nodes.deleteMany().then(() => {
          populateNode.populateNodeDB(nodes).then((isValid) => {
            if (!isValid) {
              return res.send("Invalid node files.");
            } else {
              return res.send("Files were uploaded.");
            }
          });
        });
      });
    } catch (error) {
      return res.send("No files were uploaded.");
    }
  }
});

router.post("/uploadEdges", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.send("No files were uploaded.");
  }
  const importedEdgesFile = req.files.importedEdges;

  if (!Array.isArray(importedEdgesFile)) {
    // Resolves type ambiguity to allow the use of importedEdgesFile.data
    const edges = importedEdgesFile.data
      .toString()
      .split("\r\n")
      .map((row: string): string[] => {
        return row.split(",");
      });
    edges.shift();
    try {
      client.l1Edges.deleteMany().then(() => {
        populateEdge.populateEdgeDB(edges).then((isValid) => {
          if (!isValid) {
            return res.send("Invalid edge files.");
          } else {
            return res.send("Files were uploaded.");
          }
        });
      });
    } catch (error) {
      return res.send("No files were uploaded.");
    }
  }
});

router.get("/exportNodes", async (req, res) => {
  const nodeFile = await writeNode.nodeDownload();
  //console.log(nodeFile);
  res.setHeader("Content-disposition", "attachment; filename=nodeDataFile.csv");
  res.set("Content-Type", "text/csv");
  res.status(200).send(nodeFile);
});
router.get("/exportEdges", async (req, res) => {
  const nodeFile = await writeEdge.edgeDownload();
  //console.log(nodeFile);
  res.setHeader("Content-disposition", "attachment; filename=edgeDataFile.csv");
  res.set("Content-Type", "text/csv");
  res.status(200).send(nodeFile);
});

export default router;
