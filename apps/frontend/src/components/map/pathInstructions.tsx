import Node from "common/src/node.ts";
import React from "react";
import genInstructions from "backend/src/directionTools.ts";

function PathInstructions(props: { Path: Node[] }) {

    return (
        <div>
            {genInstructions(props.Path).map(instruction => (
                <div>
                    {instruction.type} {instruction.content}
                </div>
            ))}
        </div>
    );
}

export default PathInstructions;
