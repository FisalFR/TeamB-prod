class Edge {
  startNodeID: string;
  endNodeID: string;

  constructor(startNodeID: string, endNodeID: string) {
    this.startNodeID = startNodeID;
    this.endNodeID = endNodeID;
  }
}

export default Edge;
