import Button from "../components/Button.tsx";
import ShopCard from "../components/shopCard.tsx";
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {giftItem} from "../../../../packages/common/src/giftItem.ts";
import Tulip from "../assets/Gift_Images/Tulip.jpeg";
import Rose from "../assets/Gift_Images/Rose.jpeg";
import tulipBouquet from "../assets/Gift_Images/TulipBouquet2.png";
import roseBouquet from "../assets/Gift_Images/RoseBouquet.png";
import teddyBear from "../assets/Gift_Images/teddyBear.jpeg";
import greenDino from "../assets/Gift_Images/greenDino2.jpeg";
import pinkDino from "../assets/Gift_Images/pinkDino.jpeg";
import heart from "../assets/Gift_Images/heartStuffie.jpeg";
import gwsBalloon from "../assets/Gift_Images/gwsBalloon2.jpeg";
import heartBalloon from "../assets/Gift_Images/heartBalloon.jpeg";
import rainbow from "../assets/Gift_Images/rainbowBalloon.jpeg";
import sunshine from "../assets/Gift_Images/sunshineBalloon.jpeg";
import chocolates from "../assets/Gift_Images/chocolates.jpeg";
import heartlollipop from "../assets/Gift_Images/heartlollipops.jpeg";
import sourPatchKids from "../assets/Gift_Images/sourPatchKids.jpeg";
import caramels from "../assets/Gift_Images/caramels.jpeg";
import {giftRequest} from "common/src/giftRequest.ts";
import axios from "axios";
import Dropdown from "../components/dropdown.tsx";

function GiftDelivery() {
    const formRef = useRef<HTMLFormElement>(null);
    const [cart, setCart] = useState<giftItem[]>([]);
    const [locationOptions, setLocationOptions] = useState<string[]>([]);
    const [cleared, setCleared] = useState(false);
    const [submittedWindowVisibility, setSubmittedWindowVisibility] = useState({
        formScreen: "block",
        submittedScreen: "hidden"
    });
    const [request, setRequest] = useState<giftRequest>({
        receiverName:"",
        senderName: "",
        location:"",
        message: "",
        cart: []
    });


    useEffect(() => {
        axios.get("/api/gift/location").then((response) => {
            const locationOptionsStrings: string[] = [];
            for (let i = 0; i < response.data.length; i++) {
                locationOptionsStrings.push(response.data[i].longName);
            }
            setLocationOptions(locationOptionsStrings);
        });
    }, []);

    const itemCosts={
        "Tulip": 3.99,
        "Rose": 5.99,
        "Bouquet of Tulips": 21.99,
        "Bouquet of Roses": 29.99,
        "Teddy Bear": 5.99,
        "Green Dinosaur": 10.99,
        "Pink Dinosaur": 10.99,
        "Heart": 3.99,
        "Get Well Soon Balloon": 3.99,
        "Red Heart Balloon": 3.99,
        "Rainbow Balloon": 3.99,
        "Happy Sunshine Balloon":3.99,
        "Assorted Chocolate Bundle":5.99,
        "Heart-Shaped Lollipop": 3.99,
        "Sour Patch Kids":5.99,
        "Caramel Tray": 9.99
    };

    function calcCost(){
        let total = 0;
        request.cart.map((item: giftItem) => {
            total+=item.cost;
        });
        return total.toFixed(2);
    }

    function handleSubmit(e: {preventDefault: () => void}) {
        if (cart.length == 0){
        return alert("Please add an item to your cart.");}
        console.log(cart);
        console.log(request);
        (formRef.current as HTMLFormElement).requestSubmit();
        e.preventDefault();
        if ((formRef.current as HTMLFormElement).checkValidity()) {
            axios.post("/api/gift/insert", request, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then();
            setCleared(true);
            setSubmittedWindowVisibility({formScreen: "hidden", submittedScreen: "block"});
        }
    }

    function changeCart(item: string, quantity: number) {
        const newCart = [];
        let foundItem = false;
        const roundedCost = (Math.round(quantity * itemCosts[item] * 100))/100;
        let spliceInd = null;
        for (let i = 0; i < cart.length; i++) {
            newCart[i] = cart[i];
            if (newCart[i].name == item) {
                if (quantity == 0) {
                    spliceInd = i;
                }
                newCart[i].quantity = quantity;
                newCart[i].cost = roundedCost;
                foundItem = true;
            }
        }
        if (spliceInd != null) {
            newCart.splice(spliceInd, 1);
        }
        if (!foundItem) {
            newCart.push(
                {
                    name: item,
                    quantity: quantity,
                    cost: roundedCost
                }
            );
        }
        setCart(newCart);
        setRequest({...request, cart: newCart});
    }

    function createCart() {
        if (cart.length == 0)
            return <p>There are no items in your cart</p>;
        return cart.map((item) =>
            <p> {item.quantity} x {item.name}: {item.cost.toFixed(2)}$</p>);
    }

    function handleInput(e: ChangeEvent<HTMLInputElement>){
        setCleared(false);
        setRequest({...request, [e.target.name]: e.target.value});
    }

    function handleMessage(e: ChangeEvent<HTMLTextAreaElement>){
        setCleared(false);
        setRequest({...request, [e.target.name]: e.target.value});
    }

    function handleLocationInput(str: string){
        setCleared(false);
        setRequest({...request, location: str});
    }

    function handleNewSubmission(): void {
        setSubmittedWindowVisibility({formScreen: "block", submittedScreen: "hidden"});
        setRequest({ receiverName:"",
            senderName: "",
            location:"",
            message: "",
            cart: []});
        setCleared(false);
    }

    return (
    <div className="relative w-screen h-screen overflow-auto bg-[url('https://cdn.discordapp.com/attachments/1220847340659802325/1227468676538826872/A7CDE8.png?ex=66288449&is=66160f49&hm=c5db1a25039a517cd7d04b5275176162b87990fe645874c594a2baa79e362a99&')]">
        <div className="centerContent">
            <div className={submittedWindowVisibility.formScreen}>
                <div className="bg-light-white my-10 p-10 px-20 rounded-3xl">
                    <h1 className="text-3xl font-HeadlandOne">
                        Gift Delivery Request Form
                    </h1>
                    <form ref={formRef} onSubmit={e => {
                        e.preventDefault();
                    }}>
                        <br/><br/>
                        <div className="flex flex-row justify-center w-full gap-20">
                            <div className=" centerContent flex-col justify-start items-start">
                                <label htmlFor="receiverName"
                                       className="font-OpenSans font-bold text-md text-Ash-black">To: </label>
                                <input type="text" id="receiverName" name="receiverName" placeholder={"Recipient's Name"}
                                       className="w-full border-solid border-deep-blue border-2 rounded py-1 px-1" onChange={handleInput}></input><br/>


                                <label htmlFor="senderName"
                                       className="font-OpenSans font-bold text-md text-Ash-black">From: </label>
                                <input type="text" id="senderName" name="senderName" className="w-full border-solid border-deep-blue border-2 rounded py-1 px-1"
                                       placeholder={"Sender's Name"}
                                       onChange={handleInput}></input><br/>

                                <label htmlFor="location"
                                       className="font-OpenSans font-bold text-md text-Ash-black">Location: </label>
                                <div className="border-solid border-deep-blue border-2 rounded">
                                    <Dropdown options={locationOptions} placeholder="Location" name="Location Dropdown"
                                              id="location" setInput={handleLocationInput} value={cleared} required={true}/>

                                </div>

                            </div>

                            <div className="flex flex-col items-start">

                                <label htmlFor="message" className="font-OpenSans text-md font-bold text-Ash-black ">
                                    Send a Message: </label>
                                <textarea id="message" name="message" rows={4} cols={40} placeholder={"Send a nice message!"}
                                          onChange={handleMessage} className="border-solid border-deep-blue border-2 rounded h-full p-1 px-2">
                        </textarea>
                            </div>

                        </div>
                        <br/><br/>


                        {/*Flowers*/}
                        <h1 className="text-xl font-HeadlandOne text-left text-Ash-black">
                            Flowers:
                        </h1>
                        <br/>
                        <div className="flex flex-row gap-10 w-full overflow-scroll">
                            <ShopCard image={Tulip} cost={3.99} name="Tulip" altName="Single Tulip"
                                      changeCart={changeCart}/>
                            <ShopCard image={Rose} cost={5.99} name="Rose" altName="Single Rose"
                                      changeCart={changeCart}/>
                            <ShopCard image={tulipBouquet} cost={21.99} name="Bouquet of Tulips" altName="Bouquet of Tulips"
                                      changeCart={changeCart}/>
                            <ShopCard image={roseBouquet} cost={29.99} name="Bouquet of Roses" altName="Bouquet of Roses"
                                      changeCart={changeCart}/>
                        </div>
                        <br/><br/>

                        {/*Stuffed Animals*/}
                        <br/><br/>
                        <h1 className="text-xl font-HeadlandOne text-left text-Ash-black">
                            Stuffed Animals:
                        </h1>
                        <br/>
                        <div className="flex flex-row gap-10 w-full overflow-scroll">
                            <ShopCard image={teddyBear} cost={5.99} name="Teddy Bear" altName="Teddy Bear"
                                      changeCart={changeCart}/>
                            <ShopCard image={greenDino} cost={10.99} name="Green Dinosaur" altName="Green Dinosaur"
                                      changeCart={changeCart}/>
                            <ShopCard image={pinkDino} cost={10.99} name="Pink Dinosaur" altName="Pink Dinosaur"
                                      changeCart={changeCart}/>
                            <ShopCard image={heart} cost={3.99} name="Heart" altName="Heart"
                                      changeCart={changeCart}/>
                        </div>
                        <br/><br/>

                        {/*Balloons*/}
                        <br/><br/>
                        <h1 className="text-xl font-HeadlandOne text-left text-Ash-black">
                            Balloons:
                        </h1>
                        <br/>
                        <div className="flex flex-row gap-10 w-full overflow-scroll">
                            <ShopCard image={gwsBalloon} cost={3.99} name="Get Well Soon Balloon"
                                      altName="Get Well Soon Balloon"
                                      changeCart={changeCart}/>
                            <ShopCard image={heartBalloon} cost={3.99} name="Red Heart Balloon" altName="Red Heart Balloon"
                                      changeCart={changeCart}/>
                            <ShopCard image={rainbow} cost={3.99} name="Rainbow Balloon" altName="Rainbow Balloon"
                                      changeCart={changeCart}/>
                            <ShopCard image={sunshine} cost={3.99} name="Happy Sunshine Balloon"
                                      altName="Smiling Sunshine Balloon"
                                      changeCart={changeCart}/>
                        </div>
                        <br/><br/>

                        {/*Candy*/}
                        <br/><br/>
                        <h1 className="text-xl font-HeadlandOne text-left text-Ash-black">
                            Candy:
                        </h1>
                        <br/>
                        <div className="flex flex-row gap-10 w-full overflow-x-scroll h-fit">
                            <ShopCard image={chocolates} cost={5.99} name="Assorted Chocolate Bundle"
                                      altName="Assorted Chocolates"
                                      changeCart={changeCart}/>
                            <ShopCard image={heartlollipop} cost={3.99} name="Heart-Shaped Lollipop"
                                      altName="Heart-Shaped Lollipops"
                                      changeCart={changeCart}/>
                            <ShopCard image={sourPatchKids} cost={5.99} name="Sour Patch Kids" altName="Sour Patch Kids"
                                      changeCart={changeCart}/>
                            <ShopCard image={caramels} cost={9.99} name="Caramel Tray" altName="Caramel Tray"
                                      changeCart={changeCart}/>
                        </div>
                        <br/><br/>


                        <br/><br/>
                    </form>

                    <div className="border-2 bg-white border-rounded">
                        <div className="border-2 bg-deep-blue border-rounded ">
                            <h2 className="text-xl font-HeadlandOne text-center text-bone-white font-bold">
                                Cart
                            </h2>
                        </div>

                        <div className="text-xl font-HeadlandOne text-center text-Ash-black text-bold">
                            <br/>
                            {createCart()}
                            <br/>
                            <p>Total Cost: {calcCost()}$</p>
                            <br/>
                        </div>
                    </div>
                    <br/><br/>
                    <Button onClick={handleSubmit} children={"Purchase"}/>
                </div>
            </div>
            <div className={submittedWindowVisibility.submittedScreen}>
                <div className="p-6 bg-white rounded-2xl mt-20 max-w-2xl">
                    <div className={"text-center"}>
                        <h3 className={"p-3 text-lg text-center font-HeadlandOne mt-3"}>Previous Form Submission:</h3>
                        <p className={"font-bold"}>Receiver Name:</p>
                        <p className={""}>{request.receiverName}</p>

                        <p className={"font-bold"}>Sender Name:</p>
                        <p className={""}>{request.senderName}</p>

                        <p className={"font-bold"}>Where do you want to send this gift?</p>
                        <p className={""}>{request.location}</p>

                        <p className={"font-bold "}>Additional Message:</p>
                        <p className={"text-pretty break-words  max-w-2xl"}>{request.message}</p>

                        <p className={"font-bold"}>Total Cost:</p>
                        <p className={""}>{calcCost()}$</p>

                        <p className="font-HeadlandOne p-3 text-xl center">Thank you for submitting!</p>
                        <Button onClick={handleNewSubmission} children="Submit a new request"/>
                        <br/>
                    </div>
                </div>
                    <div className="text-center center p-6 bg-white rounded-2xl mt-20">
                        <p className={"font-bold text-center"}>Cart:</p>
                        <p className={"text-center center"}>{request.cart.map((item: giftItem) => {
                            return <p>{item.quantity} x {item.name}: {item.cost}$</p>;
                        })}</p></div>

            </div>
        </div>
    </div>
    )
        ;
}

export default GiftDelivery;
