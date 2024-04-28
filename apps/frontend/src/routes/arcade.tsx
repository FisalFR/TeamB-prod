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
import Vase from "@/components/arcade/Vase.tsx";
import ScoreCard from "@/components/arcade/ScoreCard.tsx";
import ArcadeButton from "@/components/arcade/ArcadeButton.tsx";

import instBG from "../assets/arcade/instructions/full-backdrop.png";
import instBox from "../assets/arcade/instructions/vase-box.png";
import instTrash from "../assets/arcade/instructions/trash.png";
import instPlots from "../assets/arcade/instructions/plots.png";
import instBike from "../assets/arcade/instructions/delivery-bike.png";
import instOrders from "../assets/arcade/instructions/orders.png";
import instStars from "../assets/arcade/instructions/stars.png";

function Arcade() {

    const [gameState, setGameState] = useState("StartUp");
    const [globalTime, setGlobalTime] = useState(0);
    const gameRef = useRef(null);

    const LOCATIONS = [
        {name: "Plots", image: plotsPNG},
        {name: "Pots", image: potsPNG},
        {name: "Delivery", image: deliveryPNG}];
    const currentLoc = useRef(1);

    const [hasVase, setHasVase] = useState(false);

    const vase = useRef({
        hasVase: false,
        flowers: []
    });

    const isCardShowing = useRef(false);

    const [vaseMode, setVaseMode] = useState("noVase");
    const vaseScale = useRef(1);
    const vasePattern = useRef("wavy");

    //Player movement constants
    const START_HEIGHT = 455;
    const MAX_JUMP = 110;
    const MOVE_MULTIPLIER = 10;
    const SCREEN_WIDTH = 1000;
    const SCREEN_HEIGHT = 600;

    //Player movement states/refs
    const [playerX, setPlayerX] = useState(460);
    const [playerY, setPlayerY] = useState(START_HEIGHT);
    const moveDirection = useRef(0);
    const keyDown = useRef("");
    const lastMove = useRef(1);
    const jumping = useRef("no");
    const speed = useRef(0);

    //Order constants
    const FLOWERS = ["Tulip", "Rose"];
    const ORDER_MAX = 4;
    const ORDER_COMPLETE_TIME = 300;

    const ORDERS_PER_GAME = 5;

    const orders = useRef<{flowers: string[]; vase: string;}[]>([]);
    const orderTimes = useRef<number[]>([]);
    const currentOrderNum = useRef(0);

    const ordersShowing = useRef<number[]>([]);

    const ordersComplete = useRef(0);
    const ordersCreated = useRef(0);
    const currentOrder = useRef<{flowers: number, vase: number, time: number}>({flowers: 0, vase: 0, time: 0});
    const orderScoresAvg = useRef<{flowers: number, vase: number, time: number}>({flowers: 0, vase: 0, time: 0});

    const scoreCardInfo = useRef({scores: {flowers: 0, vase: 0, time: 0}, order: 0, gameOver: false});

    useEffect(() => {
        //Implementing the setInterval method
        const interval = setInterval(() => {

            if (gameState == "playing") {
                setGlobalTime(globalTime + 40);

                if (speed.current <= 0) {
                    speed.current = 0;
                    lastMove.current = moveDirection.current;
                }
                if ((playerX > SCREEN_WIDTH - 40) && (currentLoc.current == LOCATIONS.length-1)) {
                    lastMove.current = -1;
                    speed.current = MOVE_MULTIPLIER;
                }
                if ((playerX < 0) && (currentLoc.current == 0)) {
                    lastMove.current = 1;
                    speed.current = MOVE_MULTIPLIER;
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

                if (globalTime%1000 == 0) {
                    orderTimes.current.map((time, index) =>
                        {
                            orderTimes.current[index] -= 1;
                            if (time == 0) {
                               removeOrder(index);
                            }
                        }
                    );
                }
            }
        }, 40);

        //Clearing the interval
        return () => clearInterval(interval);
    }, [playerX, moveDirection, playerY, LOCATIONS.length, globalTime, gameState]);


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
        setVaseMode("choose");
        vaseScale.current = .25;
        vase.current.hasVase = true;
    }
    function trashVase() {
        if (hasVase) {
            setVaseMode("noVase");
            vaseScale.current = 1;
            setHasVase(false);
            vase.current.hasVase = false;
            vase.current.flowers = [];
        }
    }

    function addOrder(order: string[], orderVase: string) {
        const orderToAdd = {
            flowers: order,
            vase: orderVase
        };
        orders.current.push(orderToAdd);
        orderTimes.current.push(ORDER_COMPLETE_TIME);
        ordersCreated.current += 1;
        ordersShowing.current.push(ordersCreated.current);
    }
    function removeOrder(index: number) {
        scoreCardInfo.current.scores = {flowers: 0, vase: 0, time: 0};
        scoreCardInfo.current.order = ordersShowing.current[currentOrderNum.current];
        currentOrder.current = {flowers: 0, vase: 0, time: 0};

        orders.current.splice(index,1);
        orderTimes.current.splice(index,1);
        ordersShowing.current.splice(index,1);

        if (currentOrderNum.current > 0) {
            currentOrderNum.current -= 1;
        }

        orderScoresAvg.current.flowers = (orderScoresAvg.current.flowers*ordersComplete.current)/(ordersComplete.current+1);
        orderScoresAvg.current.vase = (orderScoresAvg.current.vase*ordersComplete.current)/(ordersComplete.current+1);
        orderScoresAvg.current.time = (orderScoresAvg.current.time*ordersComplete.current)/(ordersComplete.current+1);

        isCardShowing.current = true;


        ordersComplete.current += 1;
    }

    function deliverVase() {
        setVaseMode("delivery");

        currentOrder.current.time = (orderTimes.current[currentOrderNum.current]/ORDER_COMPLETE_TIME)*100;

        vaseScale.current = 1;
        let toScore = [];
        toScore = orders.current[currentOrderNum.current].flowers;
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

        if (orderCount.Tulip - vaseCount.Tulip > 0) {
            score -= (orderCount.Tulip - vaseCount.Tulip) * 25;
        }
        if (orderCount.Rose - vaseCount.Rose > 0) {
            score -= (orderCount.Rose - vaseCount.Rose) * 25;
        }
        for (let i = 0; i < 4; i++) {
            if (vase.current.flowers.length - 1 >= i) {
                if (vase.current.flowers[i] != toScore[i]) score -= 5;
            }
            else score -= 5;
        }
        score = Math.max(0, score);

        currentOrder.current.flowers = score;

        if (vasePattern.current != orders.current[currentOrderNum.current].vase) {
            currentOrder.current.vase = Math.max(currentOrder.current.vase - 50, 0);
        }

        orderScoresAvg.current.flowers = (orderScoresAvg.current.flowers*ordersComplete.current + score)/(ordersComplete.current+1);
        orderScoresAvg.current.vase = (orderScoresAvg.current.vase*ordersComplete.current + currentOrder.current.vase)/(ordersComplete.current+1);
        orderScoresAvg.current.time = (orderScoresAvg.current.time*ordersComplete.current + currentOrder.current.time)/(ordersComplete.current+1);

        vase.current.hasVase = false;
        vase.current.flowers = [];
        setHasVase(false);



        scoreCardInfo.current.scores = currentOrder.current;
        scoreCardInfo.current.order = ordersShowing.current[currentOrderNum.current];
        isCardShowing.current = true;

        ordersShowing.current.splice(currentOrderNum.current,1);

        orders.current.splice(currentOrderNum.current,1);
        orderTimes.current.splice(currentOrderNum.current,1);
        if (currentOrderNum.current >0) {
            currentOrderNum.current -= 1;
        }

        ordersComplete.current += 1;
        currentOrder.current = {flowers: 0, vase: 0, time: 0};
    }

    function scoreVase(score: number){
        setVaseMode("move");

        currentOrder.current.vase = score;
    }

    function choosePattern(pattern: string) {
        vasePattern.current = pattern;
        setVaseMode("paint");
    }

    function setCurrent(num: number) {
        currentOrderNum.current = num;
    }


    function cardClosed() {
        if (isCardShowing.current) {
            return {display: "block"};
        }
        return {display: "none"};
    }
    function closeCard() {
        isCardShowing.current = false;
        scoreCardInfo.current = {scores: {flowers: 0, vase: 0, time: 0}, order: 0, gameOver: false};
        if (ordersComplete.current == ORDERS_PER_GAME) {
            if (gameState == "playing") {
                scoreCardInfo.current.scores = orderScoresAvg.current;
                scoreCardInfo.current.gameOver = true;
                isCardShowing.current = true;
                setGameState("end");
            }
            else if (gameState == "end")
                resetGame();
        }
    }
    function showInstructions() {
        if (gameState == "StartUp") {
            return {display: "flex"};
        }
        return {display: "none"};
    }

    function resetGame() {
        orders.current = [];
        orderTimes.current = [];
        currentOrderNum.current = 0;
        ordersShowing.current = [];
        ordersComplete.current = 0;
        ordersCreated.current = 0;
        currentOrder.current = {flowers: 0, vase: 0, time: 0};
        orderScoresAvg.current = {flowers: 0, vase: 0, time: 0};
        vase.current.flowers = [];
        vase.current.hasVase = false;
        currentLoc.current = 1;
        scoreCardInfo.current = {scores: {flowers: 0, vase: 0, time: 0}, order: 0, gameOver: false};
        setHasVase(false);
        setVaseMode("noVase");
        setGlobalTime(0);
        setGameState("playing");
    }


    return (
        <>
            <div className="centerContent w-full h-screen fixed top-0 flex-col">
                <h1 className="text-2xl">Flower Delivery Game</h1>
                <div className="relative overflow-hidden border-4 border-bone-white focus:border-deep-blue focus:border-deep-blue focus:outline-none"
                     style={{width: SCREEN_WIDTH + "px", height: SCREEN_HEIGHT + "px", backgroundColor: "#C9E4F1"}}
                     onKeyDown={(e: React.KeyboardEvent) => {
                         movePlayer(e);
                     }}
                     onKeyUp={(e: React.KeyboardEvent) => {
                         stopMove(e);
                     }}
                     tabIndex={0}
                     ref = {gameRef}
                >
                    <img className="absolute bottom-0 left-0" src={LOCATIONS[currentLoc.current].image}></img>
                    <OrderManager orderMax={ORDER_MAX} flowers={FLOWERS} currentTime={globalTime}
                                  currentOrder={currentOrderNum.current} setCurrent={setCurrent}
                                  addOrder={addOrder} orders={orders.current} orderTimes={orderTimes.current}
                                  ordersPerGame={ORDERS_PER_GAME} created={ordersCreated.current}
                                  showing={ordersShowing.current}/>

                    <Plot x1={115} x2={300} playerX={playerX} plot={1} currentLoc={LOCATIONS[currentLoc.current].name}
                          currentTime={globalTime} vase={vase.current} addToVase={addToVase}/>
                    <Plot x1={380} x2={560} playerX={playerX} plot={2} currentLoc={LOCATIONS[currentLoc.current].name}
                          currentTime={globalTime} vase={vase.current} addToVase={addToVase}/>
                    <Plot x1={660} x2={850} playerX={playerX} plot={3} currentLoc={LOCATIONS[currentLoc.current].name}
                          currentTime={globalTime} vase={vase.current} addToVase={addToVase}/>

                    <VaseTrash x1={710} x2={810} playerX={playerX} currentLoc={LOCATIONS[currentLoc.current].name}
                               trashVase={trashVase}/>
                    <VaseBox x1={170} x2={350} playerX={playerX} currentLoc={LOCATIONS[currentLoc.current].name}
                             grabVase={grabVase} hasVase={hasVase}/>

                    <div className="z-[3]">
                    <DeliveryBike x1={530} x2={850} playerX={playerX} currentLoc={LOCATIONS[currentLoc.current].name}
                                  hasVase={hasVase} deliverVase={deliverVase} mode={vaseMode} currentTime={globalTime}/>
                    </div>

                    <div className="z-[4]">
                        <Player xpos={playerX} ypos={playerY} vase={vase.current}/>
                    </div>

                    <Vase mode={vaseMode} playerX={playerX} playerY={playerY} type={vasePattern.current}
                          scale={vaseScale.current} vase={vase.current}
                          scoreVase={scoreVase} choosePattern={choosePattern}/>

                    <div style={cardClosed()} className="z-5">
                        <ScoreCard score={scoreCardInfo.current.scores} order={"Order " + scoreCardInfo.current.order}
                                   gameOver={scoreCardInfo.current.gameOver} closeCard={closeCard}></ScoreCard>
                    </div>

                    <div className="absolute centerContent flex flex-col place-content-between top-[40px] bg-bone-white
                    left-[250px] w-[500px] h-[500px] z-50 rounded-4 shadow-gray-800 shadow-2xl rounded-2xl overflow-auto"
                         style={showInstructions()}>
                        <div className="gap-2 flex flex-col p-8 ">
                            <h2 className="text-2xl font-bold">Flower Delivery!</h2>
                            <p>Your job is to create banquets to deliver to the hospital.</p>
                            <img src={instBG}></img>
                            <p>An order includes 4 flowers and a vase pattern.</p>
                            <p>
                                Grab a vase from the <b>vase box</b> and paint
                                your chosen pattern.
                            </p>
                            <img src={instBox}></img>
                            <p>
                                Use the <b>trash</b> to throw away your current vase.
                            </p>
                            <img src={instTrash}></img>
                            <p>
                                Plant flowers in <b>plots</b>. When flowers are fully grown, you can add them to a
                                vase you are holding, or choose to toss the flower.
                            </p>
                            <img src={instPlots}></img>
                            <p>
                                Bring your vase to the <b>delivery bike</b> to send the order off.
                            </p>
                            <img src={instBike}></img>
                            <p>
                                The order you are currently working on is highlighted. You may change this
                                using the <b>Switch</b> button on another order.
                            </p>
                            <img src={instOrders}></img>
                            <p>
                                The quality of your banquet is based on three categories: <b>Flowers</b> (correct
                                quantities and flower order), <b>Vase</b> (pattern choice and painting),
                                and <b>Time</b> (speed of delivery).
                            </p>
                            <img src={instStars}></img>
                            <p>
                                You have {ORDER_COMPLETE_TIME / 60} minutes to complete an order. The day is over
                                after {ORDERS_PER_GAME} orders
                                are completed or missed.
                            </p>
                            <p className="text-lg font-bold">
                                Good luck!
                            </p>
                        </div>
                        <div className="absolute sticky bottom-0 bg-bone-white w-[500px] centerContent p-6">
                            <ArcadeButton onClick={() => {setGameState("playing"); gameRef.current.focus();}}>Start</ArcadeButton>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );

}

export default Arcade;
