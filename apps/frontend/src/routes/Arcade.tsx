import Player from "../components/arcade/Player.tsx";
import React, {useEffect, useRef, useState} from "react";
import OrderManager from "@/components/arcade/OrderManager.tsx";

import plotsPNG from "../assets/arcade/plots-backdrop.png";
import potsPNG from "../assets/arcade/pots-backdrop.png";
import deliveryPNG from "../assets/arcade/delivery-backdrop.png";
//import Button from "@/components/Button.tsx";
import Plot from "@/components/arcade/Plot.tsx";
import VaseTrash from "@/components/arcade/VaseTrash.tsx";
import VaseBox from "@/components/arcade/VaseBox.tsx";
import DeliveryBike from "@/components/arcade/DeliveryBike.tsx";

function Arcade() {

    //const [gameState, setGameState] = useState("StartUp");
    const [globalTime, setGlobalTime] = useState(0);

    const LOCATIONS = [
        {name: "Plots", image: plotsPNG},
        {name: "Pots", image: potsPNG},
        {name: "Delivery", image: deliveryPNG}];
    const currentLoc = useRef(0);

    const [hasVase, setHasVase] = useState(false);

    const vase = useRef({
        hasVase: false,
        flowers: []
    });

    //Player movement constants
    const START_HEIGHT = 430;
    const MAX_JUMP = 110;
    const MOVE_MULTIPLIER = 10;
    const SCREEN_WIDTH = 1280;
    const SCREEN_HEIGHT = 600;

    //Player movement states/refs
    const [playerX, setPlayerX] = useState(100);
    const [playerY, setPlayerY] = useState(START_HEIGHT);
    const moveDirection = useRef(0);
    const keyDown = useRef("");
    const lastMove = useRef(1);
    const jumping = useRef("no");
    const speed = useRef(0);

    //Order constants
    const FLOWERS = ["Tulip", "Rose"];
    const ORDER_MAX = 4;

    const orders = useRef([]);

    useEffect(() => {
        //Implementing the setInterval method
        const interval = setInterval(() => {

            setGlobalTime(globalTime + 40);

            //speed up and slow down and changing directions
            if (speed.current <= 0) {
                speed.current = 0;
                lastMove.current = moveDirection.current;
            }

            if (playerX > SCREEN_WIDTH) {
                setPlayerX(0);
                currentLoc.current += 1;
            }
            else if (playerX < 0 - 40){
                setPlayerX(SCREEN_WIDTH);
                currentLoc.current -= 1;
            }
            else if ((speed.current > 0) && (moveDirection.current != lastMove.current)) {
                speed.current -= 0.1 + speed.current/MOVE_MULTIPLIER;
                setPlayerX(playerX + lastMove.current*speed.current);
            }
            else if ((speed.current < MOVE_MULTIPLIER) && (moveDirection.current !=0)) {
                speed.current += 0.1 + speed.current/MOVE_MULTIPLIER;
                setPlayerX(playerX + moveDirection.current*speed.current);
            }
            else {
                setPlayerX(playerX + moveDirection.current*speed.current);
            }

            //Change playerY if jumping
            if (jumping.current == "down") {
                if (playerY < START_HEIGHT) {
                    const distDown = ((playerY/(START_HEIGHT-MAX_JUMP))-1)*40+MOVE_MULTIPLIER;
                    if (playerY + distDown < START_HEIGHT) {
                        setPlayerY(playerY + distDown);
                    }
                    else {
                        setPlayerY(START_HEIGHT);
                    }
                }
                else {
                    jumping.current = "no";
                    setPlayerY(START_HEIGHT);
                }
            }
            if (jumping.current == "up") {
                if (playerY > START_HEIGHT - MAX_JUMP) {
                    setPlayerY(playerY - ((playerY/(START_HEIGHT-MAX_JUMP))-1)*40-MOVE_MULTIPLIER);
                }
                else {
                    jumping.current = "down";
                    setPlayerY(START_HEIGHT-MAX_JUMP);
                }
            }
        }, 40);

        //Clearing the interval
        return () => clearInterval(interval);
    }, [playerX, moveDirection, playerY, LOCATIONS.length, globalTime]);

    /*function startGame() {
        alert(gameState);
        setGameState("Play");
    }*/


    function movePlayer(e: React.KeyboardEvent) {
        if ((e.key == "ArrowLeft") || (e.key == "a")) {
            moveDirection.current = -1;
            keyDown.current = e.key;
            //lastMove.current = -1;
        }
        if ((e.key == "ArrowRight") || (e.key == "d")) {
            moveDirection.current = 1;
            keyDown.current = e.key;
            //lastMove.current = 1;
        }
        if ((e.key == "ArrowUp") || (e.key == "w")) {
            if (jumping.current == "no") {
                jumping.current = "up";
            }

        }
    }
    function stopMove(e: React.KeyboardEvent) {
        if (e.key == keyDown.current){
            lastMove.current = moveDirection.current;
            keyDown.current = "";
            moveDirection.current = 0;
        }
    }

    function addToVase(flower: string) {
        vase.current.flowers.push(flower);
    }

    function grabVase() {
        setHasVase(true);
        vase.current.hasVase = true;
    }
    function trashVase() {
        if (hasVase) {
            setHasVase(false);
            vase.current.hasVase = false;
            vase.current.flowers = [];
        }
    }

    function addOrder(order: string[]) {
        orders.current.push(order);
    }

    function deliverVase() {
        const toScore = orders.current[0];
        let score = 100;

        const orderCount = {
            "Tulip" : 0,
            "Rose" : 0
        };
        toScore.map((flower) => {
            orderCount[flower] += 1;
        });
        const vaseCount = {
            "Tulip" : 0,
            "Rose" : 0
        };
        vase.current.flowers.map((flower) => {
            vaseCount[flower] += 1;
        });

        score -= Math.max(Math.abs(orderCount.Tulip - vaseCount.Tulip), Math.abs(orderCount.Rose - vaseCount.Rose)) * 25;

        for (let i = 0; i < 4; i++) {
            if (vase.current.flowers.length - 1 >= i) {
                if (vase.current.flowers[i] != toScore[i]) score -= 5;
            }
            else score -= 5;
        }
        score = Math.max(0, score);

        alert(score);

        vase.current.hasVase = false;
        setHasVase(false);

        orders.current.splice(0,1);
    }


    return (
        <>
            <div className="centerContent w-full h-screen fixed top-0 flex-col">
                <h1 className="text-2xl">Flower Delivery Game</h1>
                <div className="relative border-4 border-black overflow-hidden"
                     style = {{width: SCREEN_WIDTH + "px", height: SCREEN_HEIGHT + "px"}}
                     onKeyDown={(e: React.KeyboardEvent) => {movePlayer(e);}}
                     onKeyUp={(e: React.KeyboardEvent) => {stopMove(e);}}
                     tabIndex={0}
                     >
                    <img className="absolute bottom-0 left-0" src={LOCATIONS[currentLoc.current].image}></img>
                    <OrderManager orderMax={ORDER_MAX} flowers={FLOWERS} currentTime={globalTime}
                                  addOrder={addOrder} orders = {orders.current}/>

                    <Plot x1={150} x2={380} playerX={playerX} plot={1} currentLoc={LOCATIONS[currentLoc.current].name}
                          currentTime={globalTime} vase={vase.current} addToVase={addToVase}/>
                    <Plot x1={490} x2={720} playerX={playerX} plot={2} currentLoc={LOCATIONS[currentLoc.current].name}
                          currentTime={globalTime} vase={vase.current} addToVase={addToVase}/>
                    <Plot x1={850} x2={1090} playerX={playerX} plot={3} currentLoc={LOCATIONS[currentLoc.current].name}
                          currentTime={globalTime} vase={vase.current} addToVase={addToVase}/>

                    <VaseTrash x1={900} x2={1040} playerX={playerX} currentLoc={LOCATIONS[currentLoc.current].name}
                               trashVase={trashVase}/>
                    <VaseBox x1={210} x2={450} playerX={playerX} currentLoc={LOCATIONS[currentLoc.current].name}
                             grabVase={grabVase} hasVase={hasVase}/>
                    <DeliveryBike x1={650} x2={900} playerX={playerX} currentLoc={LOCATIONS[currentLoc.current].name}
                                  hasVase={hasVase} deliverVase={deliverVase}/>


                    <Player xpos={playerX} ypos={playerY} vase={vase.current}/>
                </div>

            </div>

        </>
    );

}

export default Arcade;
