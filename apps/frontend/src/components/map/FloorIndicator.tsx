import {AnimatePresence, motion} from "framer-motion";
import Node from "../../../../../packages/common/src/nodes-and-edges/node";
import {JSX} from "react";

export default function FloorIndicator (props:{
    onClick1: () => void,
    onClick2: () => void,
    onClick3: () => void,
    onClick4: () => void,
    onClick5: () => void,
    currentFloor: string,
    pathChange: boolean,
    path: Node[]
}) {

    const floorOrder = getFloorOrder();
    const FIlength: string[] = [];
    FIlength.push((7 + 25 * floorOrder.length).toString());
    FIlength.push((17 + 25 * floorOrder.length).toString());

    const animateIndicator = {
        initial: {
            scaleX: 0
        },
        animate: {
            scaleX: 1,
            transition: {
                duration: 0.3,
                ease: "backOut"
            }
        },
        exit: {
            scaleX: 0,
            transition: {
                duration: 0.3,
                ease: "backIn"
            }
        }
    };

    function getFloorOrder() {
        const floorOrder: string[] = [];
        let prevFloor = "";
        for(let i = 0; i < props.path.length; i++) {
            if(props.path[i].floor !== prevFloor) {
                floorOrder.push(props.path[i].floor);
                prevFloor = props.path[i].floor;
            }
        }
        return floorOrder;
    }

    function colorFloor(floor: string) {
        if(props.currentFloor === floor) {
            return "#F6BD38";
        }
        return "white";
    }

    function getPoints(i: number) {
        const points: string[] = [];
        const width = 18;
        const left = 10 + i * 25;
        points[0] = (left).toString().concat(",3");
        points[1] = (width + left).toString().concat(",3");
        points[2] = (7 + width + left).toString().concat(",10");
        points[3] = (width + left).toString().concat(",17");
        points[4] = (left).toString().concat(",17");
        points[5] = (7 + left).toString().concat(",10");
        return points.join(" ");
    }

    function getClick(floor: string) {
        switch (floor) {
            case "L2":
                return props.onClick1;
            case "L1":
                return props.onClick2;
            case "1":
                return props.onClick3;
            case "2":
                return props.onClick4;
            case "3":
                return props.onClick5;
        }
    }

    function createFloors() {
        const floorPolygons: JSX.Element[] = [];
        for(let i = 0; i < floorOrder.length; i++) {
            const x = 22 - floorOrder[i].length * 2;
            floorPolygons.push(
                <>
                    <polygon points={getPoints(i)} fill={colorFloor(floorOrder[i])}
                             key={i} onClick={getClick(floorOrder[i])} cursor="pointer"/>
                    <text x={(x + 25 * i).toString()} y="13" className="fill-deep-blue font-bold" fontSize="8px"
                          key={i} onClick={getClick(floorOrder[i])} cursor="pointer">
                        {floorOrder[i]}
                    </text>
                </>
            );
        }
        return (
            <>{floorPolygons}</>
        );
    }

    return (
        <AnimatePresence> {props.pathChange &&
            <motion.div className="fixed bottom-[15%]" style={{left: (screen.width / 2 - 37.5 * floorOrder.length - 17).toString() + "px"}}
                        initial={animateIndicator.initial} animate={animateIndicator.animate} exit={animateIndicator.exit}>
                <svg width={(Number.parseInt(FIlength[1]) * 3).toString() + "px"} height="60"
                            viewBox={"0 0 " + FIlength[1] + " 20"}
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon
                        points={"0,0 " + FIlength[0] + ",0 " + FIlength[1] + ",10 " + FIlength[0] + ",20 0,20 10,10"}
                        fill="#012D5A"/>
                    {createFloors()}
                </svg>
            </motion.div>}
        </AnimatePresence>
    );
}
