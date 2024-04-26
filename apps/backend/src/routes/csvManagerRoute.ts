import express, { Request, Response, Router } from "express";
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
import employee from "common/src/employee";
import { formFilter } from "../formFunctions";
import edgeType from "common/src/EdgeType";
import employeeFunctions from "../employeeFunctions";
import nodeAddOrDelete from "common/src/nodeAddOrDelete";

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
    const escapedType = formType.type.replace(/\s/g, "\\ ");
    whereCondition.type = { search: `"${escapedType}"` };
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
  if (formType.employeeName && formType.employeeName !== "") {
    const escapedName = formType.employeeName.replace(/\s/g, "\\ ");
    whereCondition.employeeName = { search: `"${escapedName}"` };
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
    case "Security":
      await client.securityRequests.delete({
        where: {
          securityRequest: formType.formID,
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
    case "Transportation":
      await client.transportationRequests.delete({
        where: {
          transportationRequest: formType.formID,
        },
      });
      break;
    case "Internal Transport":
      await client.internalTransportationRequests.delete({
        where: {
          internalTransportationRequest: formType.formID,
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

router.post("/uploadEmployees", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.send("No files were uploaded.");
  }
  const importedEmployeesFile = req.files.importedEmployees;

  if (!Array.isArray(importedEmployeesFile)) {
    // Resolves type ambiguity to allow the use of importedEmployeeFile.data
    const employees = importedEmployeesFile.data
      .toString()
      .split(/\r?\n/)
      .map((row: string) => {
        const values: string[] = row.split(","); // Split the row into values
        const employeeTest: employee = {
          employeeEmail: values[0],
          firstName: values[1],
          lastName: values[2],
          salary: parseFloat(values[3]),
          gender: values[4],
          type: values[5],
        };
        return employeeTest;
      });
    if (
      employees[0].employeeEmail != "employeeEmail" ||
      employees[0].firstName != "firstName" ||
      employees[0].lastName != "lastName" ||
      !isNaN(employees[0].salary) ||
      employees[0].gender != "gender" ||
      employees[0].type != "type"
    ) {
      return res.send("Invalid employee files. here");
    }

    try {
      const filteredEmployees = employees.filter(
        (employee) =>
          employee.employeeEmail &&
          employee.firstName &&
          employee.lastName &&
          employee.gender &&
          employee.type !== "" &&
          !isNaN(employee.salary),
      );

      if (employees[employees.length - 1].employeeEmail == "") {
        employees.pop();
      }

      if (filteredEmployees.length != employees.length - 1) {
        return res.send("Invalid employee files.");
      }
      client.employee.deleteMany().then(() => {
        employees.shift();
        employeeFunctions.employeeInsert(employees).then((isValid) => {
          if (!isValid) {
            return res.send("Invalid employee files.");
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
  const edgeFile = await writeEdge.edgeDownload();
  res.setHeader("Content-disposition", "attachment; filename=edgeDataFile.csv");
  res.set("Content-Type", "text/csv");
  res.status(200).send(edgeFile);
});

router.get("/exportEmployees", async (req, res) => {
  const employeeFile = await employeeFunctions.employeeDownload();
  res.setHeader(
    "Content-disposition",
    "attachment; filename=employeeDataFile.csv",
  );
  res.set("Content-Type", "text/csv");
  res.status(200).send(employeeFile);
});

router.post("/filterForms", async (req, res) => {
  const formType: FormType = req.body;
  const filteredForms = await formFilter(formType.formID, formType.type);
  return res.json(filteredForms);
});

router.post("/editNodes", async (req, res) => {
  const importedNodes: NodeType[] = req.body;
  console.log(importedNodes);
  client.edges.deleteMany().then(() => {
    client.nodes.deleteMany().then(() => {
      populateNode.populateManyNodeDB(importedNodes).then(() => {
        return res.json(300);
      });
    });
  });
});

router.post("/editEdges", async (req, res) => {
  const importedEdges: EdgeType[] = req.body;
  populateEdge.populateManyEdgeDB(importedEdges).then(() => {
    return res.json(300);
  });
});

router.post("/editOneNode", async (req, res) => {
  const importedNode: NodeType = req.body;
  const updatedNode = await client.nodes.update({
    where: {
      nodeID: importedNode.nodeID,
    },
    data: {
      nodeID: importedNode.nodeID,
      xcoord: parseFloat(importedNode.xcoord),
      ycoord: parseFloat(importedNode.ycoord),
      building: importedNode.building,
      nodeType: importedNode.nodeType,
      longName: importedNode.longName,
      shortName: importedNode.shortName,
    },
  });
  return res.json(updatedNode);
});

router.post("/editManyNodes", async (req, res) => {
  const importedNodes: NodeType[] = req.body;
  const updatedNodes: NodeType[] = [];
  for (let i = 0; i < importedNodes.length; i++) {
    const updatedNode = await client.nodes.update({
      where: {
        nodeID: importedNodes[i].nodeID,
      },
      data: {
        xcoord: importedNodes[i].xcoord,
        ycoord: importedNodes[i].ycoord,
        building: importedNodes[i].building,
        floor: importedNodes[i].floor,
        nodeType: importedNodes[i].nodeType,
        longName: importedNodes[i].longName,
        shortName: importedNodes[i].shortName,
      },
    });
    updatedNodes.push(updatedNode);
  }
  return res.json(updatedNodes);
});

router.post("/addDeleteNodes", async (req, res) => {
  const importedAddDeletes: nodeAddOrDelete[] = req.body;
  //loop for handling everything in nodeAddDelete - Add and delete nodes in the same order as user
  for (let i = 0; i < importedAddDeletes.length; i++) {
    console.log("here" + i);
    if (importedAddDeletes[i].action == "add") {
      console.log(importedAddDeletes[i].node.nodeID);
      const addedNode = await client.nodes.create({
        data: {
          nodeID: importedAddDeletes[i].node.nodeID,
          xcoord: parseFloat(importedAddDeletes[i].node.xcoord.toString()),
          ycoord: parseFloat(importedAddDeletes[i].node.ycoord.toString()),
          building: importedAddDeletes[i].node.building,
          floor: importedAddDeletes[i].node.floor,
          nodeType: importedAddDeletes[i].node.nodeType,
          longName: importedAddDeletes[i].node.longName,
          shortName: importedAddDeletes[i].node.shortName,
        },
      });
      console.log(addedNode);
    }
    if (importedAddDeletes[i].action == "delete") {
      const attachedEdges = await client.edges.findMany({
        where: {
          OR: [
            {
              startNodeID: importedAddDeletes[i].node.nodeID,
            },
            {
              endNodeID: importedAddDeletes[i].node.nodeID,
            },
          ],
        },
      });
      const edgeIDs = attachedEdges.map((edge) => edge.edgeID);
      await client.edges.deleteMany({
        where: {
          edgeID: {
            in: edgeIDs, // Using 'in' operator to match multiple edgeIDs
          },
        },
      });
      const deletedNode = await client.nodes.delete({
        where: {
          nodeID: importedAddDeletes[i].node.nodeID.toString(),
        },
      });
      console.log(deletedNode);
    }
  }
  return res.json("Successful add/delete");
});

router.post("/addManyEdge", async (req, res) => {
  const importedEdge: edgeType[] = req.body;
  const updatedEdge = await client.edges.createMany({
    data: importedEdge,
  });
  return res.json(updatedEdge);
});

router.post("/deleteManyEdge", async (req, res) => {
  const importedEdge: edgeType[] = req.body;

  const edgeIDs = importedEdge.map((edge) => edge.edgeID);
  const deletedEdges = await client.edges.deleteMany({
    where: {
      edgeID: {
        in: edgeIDs, // Using 'in' operator to match multiple edgeIDs
      },
    },
  });
  return res.json(deletedEdges);
});

router.get("/countNodes", async function (req: Request, res: Response) {
  const nodeCount = await client.nodes.count();
  res.status(200).json(nodeCount);
});

router.get("/countEdges", async function (req: Request, res: Response) {
  const edgeCount = await client.edges.count();
  res.status(200).json(edgeCount);
});

router.get("/countEmployee", async function (req: Request, res: Response) {
  const employeeCount = await client.employee.count();
  res.status(200).json(employeeCount);
});

router.get("/countMaintenances", async function (req: Request, res: Response) {
  const maintenanceCount = await client.maintenances.count();
  res.status(200).json(maintenanceCount);
});

router.get("/countLanguage", async function (req: Request, res: Response) {
  const languageCount = await client.languageInterpreterRequests.count();
  res.status(200).json(languageCount);
});

router.get("/countMedicine", async function (req: Request, res: Response) {
  const medicineCount = await client.medicineRequests.count();
  res.status(200).json(medicineCount);
});

router.get("/countSanitation", async function (req: Request, res: Response) {
  const sanitationCount = await client.sanitationRequests.count();
  res.status(200).json(sanitationCount);
});

router.get("/countSecurity", async function (req: Request, res: Response) {
  const securityCount = await client.securityRequests.count();
  res.status(200).json(securityCount);
});

router.get("/countGift", async function (req: Request, res: Response) {
  const giftCount = await client.giftRequests.count();
  res.status(200).json(giftCount);
});

router.get(
  "/countTransportation",
  async function (req: Request, res: Response) {
    const transportationCount = await client.transportationRequests.count();
    res.status(200).json(transportationCount);
  },
);

router.get(
  "/countInternalTransportation",
  async function (req: Request, res: Response) {
    const internalTransportationCount =
      await client.internalTransportationRequests.count();
    res.status(200).json(internalTransportationCount);
  },
);

router.post("/countTypePriority", async function (req: Request, res: Response) {
  const { priority }: { priority: string[] } = req.body;
  const maintenanceCount = await client.forms.count({
    where: {
      type: priority[1],
      priority: priority[0],
    },
  });
  res.status(200).json(maintenanceCount);
});

router.post(
  "/countFormUnassigned",
  async function (req: Request, res: Response) {
    const { name }: { name: string } = req.body;
    const formCount = await client.forms.count({
      where: {
        employeeName: name,
        status: "Unassigned",
      },
    });
    // const totalForms = await totalFormCount(name);
    res.status(200).json(formCount);
  },
);

router.post("/countFormAssigned", async function (req: Request, res: Response) {
  const { name }: { name: string } = req.body;
  const formCount = await client.forms.count({
    where: {
      employeeName: name,
      status: "Assigned",
    },
  });
  // const totalForms = await totalFormCount(name);
  res.status(200).json(formCount);
});

router.post(
  "/countFormInProgress",
  async function (req: Request, res: Response) {
    const { name }: { name: string } = req.body;
    const formCount = await client.forms.count({
      where: {
        employeeName: name,
        status: "InProgress",
      },
    });
    // const totalForms = await totalFormCount(name);
    res.status(200).json(formCount);
  },
);

router.post("/countFormClosed", async function (req: Request, res: Response) {
  const { name }: { name: string } = req.body;
  const formCount = await client.forms.count({
    where: {
      employeeName: name,
      status: "Closed",
    },
  });
  // const totalForms = await totalFormCount(name);
  res.status(200).json(formCount);
});
async function totalFormCount(name: string) {
  const totalForms = await client.forms.count({
    where: {
      employeeName: name,
    },
  });
  return totalForms;
}
export default router;
