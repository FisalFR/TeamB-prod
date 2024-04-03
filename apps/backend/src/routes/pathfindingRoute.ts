import express, { Router } from "express";
import { startEndNodes } from "../../../../packages/common/src/pathfinding";
import Path from "../../../../packages/common/src/pathFinder";
//import Parser from "../../../../packages/common/src/parser";
import Node from "../../../../packages/common/src/node";
import client from "../bin/database-connection";
import writeNode from "../writeNode";

const router: Router = express.Router();

router.get("/", async (req, res) => {
  const all = await client.l1Nodes.findMany();
  res.status(200).json(all);
});
router.post("/", async (req, res) => {
  const finalPath: Path = new Path();
  finalPath.nodeList = await client.l1Nodes.findMany();
  finalPath.edgeList = await client.l1Edges.findMany();

  finalPath.generateNodeMap();
  const pathfinding: startEndNodes = req.body;

  const node1: Node = finalPath.nodeMap.get(pathfinding.startNode)!;
  const node2: Node = finalPath.nodeMap.get(pathfinding.endNode)!;

  const temp = finalPath.BFS(node1, node2).map((node) => {
    //return node.nodeID;
    return [node.xcoord, node.ycoord];
  });

  res.body = {
    nodes: temp,
    nodeMap: finalPath.nodeMap,
  };
  res.status(200).json(res.body);
});

router.get("/export", async (req, res) => {
  const nodeFile = await writeNode.nodeDownload();
  console.log(nodeFile);
  res.setHeader("Content-disposition", "attachment; filename=nodeDataFile.csv");
  res.set("Content-Type", "text/csv");
  res.status(200).send(nodeFile);
});

export default router;
