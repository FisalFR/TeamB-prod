class Edge {
  startNodeID: string;
  endNodeID: string;

  constructor(startNodeID: string, endNodeID: string) {
    this.startNodeID = startNodeID;
    this.endNodeID = endNodeID;
  }
}

export type EdgeType = {
    edgeID: string
    startNode: string;
    endNode: string;
}
export default Edge;
