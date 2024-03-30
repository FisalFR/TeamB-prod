import express, { Router } from "express";
import { startEndNodes } from "../../../../packages/common/src/pathfinding";
import Path from "../../../../packages/common/src/pathFinder";
import Parser from "../../../../packages/common/src/parser";
import Node from "../../../../packages/common/src/node";

const router: Router = express.Router();

const database: Node[] = [];

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
router.post("/", async (req, res) => {
  const finalPath: Path = new Path();
  finalPath.nodeList = await Parser.parseNode("../../../data/L1Nodes.csv");
  finalPath.edgeList = await Parser.parseEdge("../../../data/L1Edges.csv");
  finalPath.generateNodeMap();
  const pathfinding: startEndNodes = req.body;

  const node1: Node = finalPath.nodeMap.get(pathfinding.startNode)!;
  const node2: Node = finalPath.nodeMap.get(pathfinding.endNode)!;

  const temp = finalPath.BFS(node1, node2).map((node) => {
    return node.nodeID;
  });

  res.status(200).json({ nodes: temp });
});

export default router;
