import express, { Router } from "express";
import fileUpload from "express-fileupload";
const router: Router = express.Router();
import client from "../bin/database-connection";
import populateNode from "../populateNode";
import populateEdge from "../populateEdge";
import writeNode from "../writeNode";
import writeEdge from "../writeEdge";
import NodeType from "common/src/NodeType";
import EdgeType from "common/src/EdgeType";
import FormType from "common/src/FormType";
import { formFilter } from "../formFunctions";

router.use(fileUpload());

router.get("/", async (req, res) => {
  const formType = await client.forms.findMany({
    orderBy: {
      formID: "desc",
    },
  });
  res.status(200).json(formType);
});

router.get("/nodes", async (req, res) => {
  const allNodes = await client.nodes.findMany();
  res.status(200).json(allNodes);
});

router.get("/edges", async (req, res) => {
  const allEdges = await client.edges.findMany();
  res.status(200).json(allEdges);
});

router.post("/filter", async (req, res) => {
  const formType: FormType = req.body;
  const whereCondition: FormType = {};

  // Build the where condition dynamically based on the provided filters
  if (formType.formID !== "") {
    whereCondition.formID = { search: formType.formID };
  }
  if (formType.type !== "") {
    whereCondition.type = { search: formType.type };
  }
  if (formType.location !== "") {
    const escapedLocation = formType.location.replace(/\s/g, "\\ ");
    whereCondition.location = { search: `"${escapedLocation}"` };
  }
  if (formType.status !== "") {
    whereCondition.status = { search: formType.status };
  }
  if (formType.assignee !== "") {
    whereCondition.assignee = { search: formType.assignee };
  }
  if (formType.priority !== "") {
    whereCondition.priority = formType.priority;
  }

  try {
    const filteredForm = await client.forms.findMany({
      where: whereCondition,
      orderBy: { formID: "desc" },
    });
    res.status(200).json(filteredForm);
  } catch (error) {
    console.error("Error filtering forms:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/update", async (req, res) => {
  const formType: FormType = req.body;
  const updateUser = await client.forms.update({
    where: {
      formID: formType.formID,
    },
    data: {
      status: formType.status,
      assignee: formType.assignee,
    },
  });
  res.status(200).json(updateUser);
});

router.post("/delete", async (req, res) => {
  const formType: FormType = req.body;
  switch (formType.type) {
    case "Maintenance":
      await client.maintenances.delete({
        where: {
          maintenanceRequest: formType.formID,
        },
      });
      break;
    case "Language":
      await client.languageInterpreterRequests.delete({
        where: {
          languageRequest: formType.formID,
        },
      });
      break;
    case "Medicine":
      await client.medicineRequests.delete({
        where: {
          medicineRequest: formType.formID,
        },
      });
      break;
    case "Sanitation":
      await client.sanitationRequests.delete({
        where: {
          sanitationRequest: formType.formID,
        },
      });
      break;
    case "Gift":
      await client.giftItem.deleteMany({
        where: {
          cart: formType.formID,
        },
      });
      await client.giftRequests.delete({
        where: {
          giftRequest: formType.formID,
        },
      });
      break;
  }
  const updateUser = await client.forms.delete({
    where: {
      formID: formType.formID,
    },
  });
  res.status(200).json(updateUser);
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
      .map((row: string) => {
        const values: string[] = row.split(","); // Split the row into values
        const nodeTest: NodeType = {
          nodeID: values[0],
          xcoord: parseFloat(values[1]),
          ycoord: parseFloat(values[2]),
          floor: values[3],
          building: values[4],
          nodeType: values[5],
          longName: values[6],
          shortName: values[7],
        };
        return nodeTest;
      });
    if (
      nodes[0].nodeID != "nodeID" ||
      !isNaN(nodes[0].xcoord) ||
      !isNaN(nodes[0].ycoord) ||
      nodes[0].floor != "floor" ||
      nodes[0].building != "building" ||
      nodes[0].nodeType != "nodeType" ||
      nodes[0].longName != "longName" ||
      nodes[0].shortName != "shortName"
    ) {
      return res.send("Invalid node files here.");
    }
    try {
      const filteredNodes = nodes.filter(
        (node) =>
          node.nodeID &&
          node.floor &&
          node.building &&
          node.nodeType &&
          node.longName &&
          node.shortName !== "" &&
          isNaN(nodes.xcoord) &&
          isNaN(nodes.ycoord),
      );
      if (nodes[nodes.length - 1].nodeID == "") {
        nodes.pop();
      }
      if (filteredNodes.length != nodes.length) {
        return res.send("Invalid node files.");
      }
      client.edges.deleteMany().then(() => {
        client.nodes.deleteMany().then(() => {
          nodes.shift();
          populateNode.populateManyNodeDB(nodes).then((isValid) => {
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
      .map((row: string) => {
        const values: string[] = row.split(","); // Split the row into values
        const edgeTest: EdgeType = {
          edgeID: values[0],
          startNodeID: values[1],
          endNodeID: values[2],
        };
        return edgeTest;
      });
    if (
      edges[0].edgeID != "edgeID" ||
      edges[0].startNodeID != "startNode" ||
      edges[0].endNodeID != "endNode"
    ) {
      return res.send("Invalid edge files. here");
    }
    try {
      const filteredEdges = edges.filter(
        (edge) => edge.edgeID && edge.startNodeID && edge.endNodeID !== "",
      );
      if (edges[edges.length - 1].edgeID == "") {
        edges.pop();
      }
      if (filteredEdges.length != edges.length) {
        return res.send("Invalid edge files.");
      }
      client.edges.deleteMany().then(() => {
        edges.shift();
        populateEdge.populateManyEdgeDB(edges).then((isValid) => {
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
  res.setHeader("Content-disposition", "attachment; filename=nodeDataFile.csv");
  res.set("Content-Type", "text/csv");
  res.status(200).send(nodeFile);
});
router.get("/exportEdges", async (req, res) => {
  const nodeFile = await writeEdge.edgeDownload();
  res.setHeader("Content-disposition", "attachment; filename=edgeDataFile.csv");
  res.set("Content-Type", "text/csv");
  res.status(200).send(nodeFile);
});

router.post("/filterForms", async (req, res) => {
  const formType: FormType = req.body;
  const filteredForms = await formFilter(formType.formID, formType.type);
  return res.json(filteredForms);
});

export default router;
