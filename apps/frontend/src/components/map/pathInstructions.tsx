import Node from "common/src/node.ts";
import React from "react";
import genInstructions from "../../directionTools.ts";
import useNodes from "../../hooks/useNodes.ts";
import useEdges from "../../hooks/useEdges.ts";

 function PathInstructions(props: { Path: Node[]}) {

    return (
        <div>
            { genInstructions(props.Path, useNodes().nodeMap,useEdges().edgeMap).map(instruction => (
                <div>
                    {instruction.type} {instruction.content}
                </div>
            ))}
        </div>
    );
}

export default PathInstructions;
