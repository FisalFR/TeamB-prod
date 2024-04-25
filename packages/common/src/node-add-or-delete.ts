import NodeType from "./node-type.ts";

export type NodeAddOrDelete = {
    node: NodeType;
    action: string;

}
export default NodeAddOrDelete;
