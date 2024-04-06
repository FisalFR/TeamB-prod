import express, { Router } from "express";
import { startEndNodes } from "../../../../packages/common/src/pathfinding";
import Path from "../../../../packages/common/src/pathFinder";
//import Parser from "../../../../packages/common/src/parser";
import Node from "../../../../packages/common/src/node";
import client from "../bin/database-connection";
import writeNode from "../writeNode";
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


  const path = finalPath.BFS(node1, node2);
  const nodeCoords = finalPath.BFS(node1, node2).map((node) => {
    //return node.nodeID;
    return [node.xcoord, node.ycoord];
  });
  // Section to return a map of Floors and their respective continuous path fragments
  const floorMap = new Map<string, Node[][]>;
  let lastNode: Node;
  for (let Node of path){
      if (!floorMap.has(Node.floor)){
            floorMap[Node.floor] = [];
            floorMap[Node.floor].push(Node[0]);
      } else if (floorMap.has(Node.floor) && Node.neighbors.includes(lastNode)){
          for (let i =0; i < floorMap[Node.floor].length; i++){
              if (floorMap[Node.floor][i].length === 0){
                  floorMap[Node.floor][i-1].push(Node);
              }
          }
      } else if (floorMap.has(Node.floor) && !Node.neighbors.includes(lastNode)){
          for (let i =0; i < floorMap[Node.floor].length; i++){
              if (floorMap[Node.floor][i].length === 0){
                  floorMap[Node.floor][i].push(Node);
              }
          }
      }
      lastNode = Node;
  }



  res.body = {
    nodeCoords: nodeCoords,
    nodes: path,
    nodeMap: finalPath.nodeMap,
    floorMap: floorMap
  };
  res.status(200).json(res.body);
});

export default router;
