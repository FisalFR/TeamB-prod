import Node from "common/src/node.ts";
import {Instruction} from "common/src/instruction.ts";
import React from "react";
import genInstructions from "backend/src/directionTools.ts";
export default function pathInstructions(props:{Path: Node[]}) {
    const [instructions, setInstructions] = React.useState<Instruction[]>([]);

    function createInstruction() {
        let Instructions = genInstructions(props.Path);


    };

}
