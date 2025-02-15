import express, { Router } from "express";
import { startEndNodes } from "common/src/Pathfinding/pathfinding";
import Path from "common/src/pathfinding/path";
//import Parser from common/src/parser";
import Node from "common/src/nodes-and-edges/node";
import client from "../bin/database-connection";
// import writeNode from "../writeNode";
import { filteringNodes } from "../filteringNodes";
import AStarStrategy from "common/src/pathfinding/a-star-strategy";
import BfsStrategy from "common/src/pathfinding/bfs-strategy";
import DfsStrategy from "common/src/pathfinding/dfs-strategy";
import DijkstraStrategy from "common/src/pathfinding/dijkstra-strategy";
import PathfindingStrategy from "common/src/pathfinding/pathfinding-strategy";
// import {stringify, parse} from 'flatted';

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
  const finalPath: Path = new Path(new AStarStrategy());
  finalPath.nodeList = await client.nodes.findMany();
  finalPath.edgeList = await client.edges.findMany();
  const algorithm = req.body.algorithm;

  finalPath.generateNodeMap();
  const pathfinding: startEndNodes = req.body;

  const node1: Node = finalPath.nodeMap.get(pathfinding.startNode)!;
  const node2: Node = finalPath.nodeMap.get(pathfinding.endNode)!;

  let path: Node[] = [];
  let strategy: PathfindingStrategy;
  let nodeCoords: number[][] = [];
  switch (algorithm) {
    case "Astar":
      strategy = new AStarStrategy();
      break;
    case "BFS":
      strategy = new BfsStrategy();
      break;
    case "DFS":
      strategy = new DfsStrategy();
      break;
    case "Dijkstra":
      strategy = new DijkstraStrategy();
      break;
    default:
      return res.status(400).send({ error: "Invalid algorithm" });
  }

  path = strategy.execute(node1, node2);
  nodeCoords = finalPath.findPath(node1, node2).map((node) => {
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

  res.send(body);
});

router.get("/nodemap", async (req, res) => {
  const nodeListandMap: Path = new Path();
  nodeListandMap.nodeList = await client.nodes.findMany();
  nodeListandMap.edgeList = await client.edges.findMany();

  nodeListandMap.generateNodeMap();

  // Nuking the neighbors because JSON doesn't like circular structures
  nodeListandMap.nodeList.map((node) => {
    node.neighbors = [];
  });

  const body = {
    nodeList: nodeListandMap.nodeList,
    nodeMap: nodeListandMap.nodeMap,
  };

  res.json(body);
});

export default router;
