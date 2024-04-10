import express, { Router } from "express";
import { startEndNodes } from "common/src/pathfinding";
import Path from "../../../../packages/common/src/pathFinder";
//import Parser from "../../../../packages/common/src/parser";
import Node from "../../../../packages/common/src/node";
import client from "../bin/database-connection";
// import writeNode from "../writeNode";
import { filteringNodes } from "../filteringNodes";

const router: Router = express.Router();

router.get("/", async (req, res) => {
  const all = await client.nodes.findMany();
  res.status(200).json(all);
});

router.get("/halls", async (req, res) => {
  const filtered = await filteringNodes("HALL");
  res.status(200).json(filtered);
});

router.post("/", async (req, res) => {
  const finalPath: Path = new Path();
  finalPath.nodeList = await client.nodes.findMany();
  finalPath.edgeList = await client.edges.findMany();

  finalPath.generateNodeMap();
  const pathfinding: startEndNodes = req.body;

  const node1: Node = finalPath.nodeMap.get(pathfinding.startNode)!;
  const node2: Node = finalPath.nodeMap.get(pathfinding.endNode)!;

  const path = finalPath.AStar(node1, node2); // Making the path
  // Making the path into a list of coordinates
  const nodeCoords = finalPath.AStar(node1, node2).map((node) => {
    //return node.nodeID;
    return [node.xcoord, node.ycoord];
  });

  // Section to return a map of Floors and their respective continuous path fragments
  const floorMap = new Map<string, Node[][]>();
  for (const Node of path) {
    if (!floorMap.has(Node.floor)) {
      floorMap.set(Node.floor, [[Node]]);
    } else {
      const floorPaths = floorMap.get(Node.floor);
      const lastPath = floorPaths[floorPaths.length - 1];
      const lastNodeInPath = lastPath[lastPath.length - 1];

      if (Node.neighbors.includes(lastNodeInPath)) {
        lastPath.push(Node);
      } else {
        floorPaths.push([Node]);
      }
    }
  }
  console.log(floorMap);

  // Nuking the neighbors because JSON doesn't like circular structures
  path.map((node) => {
    node.neighbors = [];
  });
  const convertMap = {};
  floorMap.forEach((value: Node[][], key: string) => {
    convertMap[key] = value;
  });

  const body = {
    nodeCoords: nodeCoords,
    nodes: path,
    nodeMap: finalPath.nodeMap,
    floorMap: convertMap,
  };

  console.log(body.floorMap);
  res.send(body);
});

export default router;
