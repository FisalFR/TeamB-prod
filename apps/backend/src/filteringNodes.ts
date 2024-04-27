import client from "./bin/database-connection";
import NodeType from "common/src/nodes-and-edges/node-type";
export function filteringNodes(loc: string) {
  const filteredLocation: object | NodeType = client.nodes.findMany({
    where: {
      NOT: {
        nodeType: { search: loc },
      },
    },
    orderBy: {
      longName: "asc",
    },
  });
  return filteredLocation;
}
