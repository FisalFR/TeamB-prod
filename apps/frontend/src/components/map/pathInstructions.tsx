import Node from "common/src/node.ts";
import {Instruction} from "common/src/instruction.ts";
import React from "react";
import genInstructions from "backend/src/directionTools.ts";

function PathInstructions(props: { Path: Node[] }) {
    const Instructions: Instruction[] = genInstructions(props.Path);

    return (
        <div>
            {Instructions.map(instruction => (
                <div>
                    {instruction.type} {instruction.content}
                </div>
            ))}
        </div>
    );
}

export default PathInstructions;
