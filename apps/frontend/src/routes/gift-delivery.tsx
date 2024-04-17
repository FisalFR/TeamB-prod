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
import heart from "../assets/Gift_Images/heartStuffie.png";
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
import Calendar from 'react-calendar';
import '../Calendar.css';
import RadioButton from "../components/RadioButton.tsx";



//this is a commit just for mo :)
function GiftDelivery() {
    const formRef = useRef<HTMLFormElement>(null);
    const [cart, setCart] = useState<giftItem[]>([]);
    const [locationOptions, setLocationOptions] = useState<string[]>([]);
    const [cleared, setCleared] = useState(false);
    const [submittedWindowVisibility, setSubmittedWindowVisibility] = useState({
        formScreen: "block",
        submittedScreen: "hidden"
    });
    const [date, setDate] = useState<Date>(new Date());
    const [request, setRequest] = useState<giftRequest>({
        receiverName:"",
        senderName: "",
        priority:"Low",
        location:"",
        message: "",
        date: new Date().toDateString(),
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
            <p> {item.quantity} x {item.name}: ${item.cost.toFixed(2)}</p>);
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

    function handlePriorityInput(e: ChangeEvent<HTMLInputElement>): void {
        setCleared(false);
        setRequest({...request, priority: e.target.value});
    }

    function handleCalendarInput( newDate:Date){
        setCleared(false);
        setDate(newDate);
        setRequest({...request, date: newDate.toDateString()});
    }

    function scrollToTop(): void{
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function handleNewSubmission(): void {

        setRequest({ receiverName:"",
            senderName: "",
            location:"",
            priority:"Low",
            message: "",
            date: new Date().toDateString(),
            cart: []});
        setCleared(false);
        location.reload();
        // setSubmittedWindowVisibility({formScreen: "block", submittedScreen: "hidden"});
    }

    return (
        <div className="overflow-hidden ">
            <div className=" right-5 fixed top-20 text-2xl text-center text-Ash-black text-bold ">
                <Button onClick={scrollToTop} children={"Go to Cart"} px={"px-9"} py={"py-4"}/>
            </div>
            <div className="dark:bg-black centerContent ">

                <div className="w-5/6">
                    <div className={submittedWindowVisibility.formScreen}>

                        <div className="dark:bg-Ash-black justify-between bg-light-white my-10 p-10 rounded-3xl">
                            <h1 className="dark:text-white text-3xl font-HeadlandOne align-text-top">
                                Gift Delivery Request Form
                            </h1>

                            <form ref={formRef} onSubmit={e => {
                                e.preventDefault();
                            }}>
                                <br/><br/>
                                <div className="centerContent">
                                <div className=" content-start justify-between flex mb-4 px-28 bg-gray-200 py-20 rounded-3xl w-7/8">
                                    <div className=" flex-col items-start 1 w-4/12 h-full">

                                        <label htmlFor="message"
                                               className="dark:text-light-white font-OpenSans text-md font-bold text-Ash-black ">
                                            Send a Message: </label>
                                        <textarea id="message" name="message" rows={4} cols={40}
                                                  placeholder={"Send a nice message!"}
                                                  onChange={handleMessage}
                                                  className="dark:bg-black dark:text-white border-solid border-deep-blue border-2 rounded p-1 px-2 w-full h-40">
                        </textarea>
                                        <label htmlFor="message"
                                               className="font-OpenSans text-md font-bold text-Ash-black ">
                                            Pick a Date: </label>
                                        <div className=" text-xl font-Colfax text-md text-Ash-black ">
                                            <Calendar onChange={handleCalendarInput} value={date}/>
                                        </div>
                                    </div>
                                    <div className="text-left grid w-1/4 h-full gap-5 content-between">
                                        <div>
                                            <label htmlFor="receiverName"
                                               className="dark:text-light-white font-OpenSans font-bold text-md text-Ash-black">To: </label>
                                        <input type="text" id="receiverName" name="receiverName"
                                               placeholder={"Recipient's Name"}
                                               className="dark:bg-black dark:text-light-white w-full border-solid border-deep-blue border-2 rounded py-1 px-1"
                                               onChange={handleInput}></input><br/>
                                        </div>
                                        <div>
                                        <label htmlFor="senderName"
                                               className="font-OpenSans font-bold text-md text-Ash-black">From: </label>
                                        <input type="text" id="senderName" name="senderName"
                                               className="w-full border-solid border-deep-blue border-2 rounded py-1 px-1"
                                               placeholder={"Sender's Name"}
                                               onChange={handleInput}></input><br/>
                                        </div>
                                        <div>
                                        <label htmlFor="location"
                                               className="dark:text-light-white font-OpenSans font-bold text-md text-Ash-black">Location: </label>
                                        <div className="border-solid border-deep-blue border-2 rounded w-full">
                                            <Dropdown options={locationOptions} placeholder="Location"
                                                      name="Location Dropdown"
                                                      id="location" setInput={handleLocationInput} value={cleared}
                                                      required={true}
                                                      width="w-full"
                                            />
                                        </div>
                                        </div>
                                        <div className="">
                                            <p className={"text-left font-bold"}>What is the priority?</p>
                                            <div className="border-deep-blue border-solid border-2 w-full">
                                                <RadioButton value={"Low"} name={"priority"} id={"priority1"}
                                                             state={request.priority}
                                                             onChange={handlePriorityInput} required={true}
                                                             width={"w-full"}/>
                                                <RadioButton value={"Medium"} name={"priority"} id={"priority2"}
                                                             state={request.priority}
                                                             onChange={handlePriorityInput} required={true}
                                                             width={"w-full"}/>
                                                <RadioButton value={"High"} name={"priority"} id={"priority3"}
                                                             state={request.priority}
                                                             onChange={handlePriorityInput} required={true}
                                                             width={"w-full"}/>
                                                <RadioButton value={"Emergency"} name={"priority"} id={"priority4"}
                                                             state={request.priority}
                                                             onChange={handlePriorityInput} required={true}
                                                             width={"w-full"}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" w-1/3 flex ">

                                        <div
                                            className=" bg-white rounded-3xl w-full object-cover overflow-hidden h-full">
                                            <div className=" bg-deep-blue border-rounded w-full ">
                                                <h2 className="text-2xl text-bone-white font-bold w-full py-2">
                                                    Cart
                                                </h2>
                                            </div>

                                            <div
                                                className="text-xl  text-Ash-black text-bold h-3/4">

                                                <div className=" w-full h-4/5 overflow-y-scroll py-5">
                                                    {createCart()}
                                                </div>
                                            </div>
                                            <div
                                                className=" text-xl text-Ash-black text-bold">
                                                <p>Total Cost: ${calcCost()}</p>
                                                <Button onClick={handleSubmit} children={"Purchase"}/>
                                            </div>
                                        </div>

                                    </div>
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
                                    <ShopCard image={tulipBouquet} cost={21.99} name="Bouquet of Tulips"
                                              altName="Bouquet of Tulips"
                                              changeCart={changeCart}/>
                                    <ShopCard image={roseBouquet} cost={29.99} name="Bouquet of Roses"
                                              altName="Bouquet of Roses"
                                              changeCart={changeCart}/>
                                </div>
                                <br/><br/>

                            </div>
                            <br/><br/>


                            {/*Flowers*/}
                            <h1 className="dark:text-light-white text-xl font-HeadlandOne text-left text-Ash-black">
                                Flowers:
                            </h1>
                            <br/>
                            <div className="flex flex-row gap-10 w-full overflow-scroll">
                                <ShopCard image={Tulip} cost={3.99} name="Tulip" altName="Single Tulip"
                                          changeCart={changeCart}/>
                                <ShopCard image={Rose} cost={5.99} name="Rose" altName="Single Rose"
                                          changeCart={changeCart}/>
                                <ShopCard image={tulipBouquet} cost={21.99} name="Bouquet of Tulips"
                                          altName="Bouquet of Tulips"
                                          changeCart={changeCart}/>
                                <ShopCard image={roseBouquet} cost={29.99} name="Bouquet of Roses"
                                          altName="Bouquet of Roses"
                                          changeCart={changeCart}/>
                            </div>
                            <br/><br/>

                                {/*Stuffed Animals*/}
                                <br/><br/>
                                <h1 className="dark:text-light-white text-xl font-HeadlandOne text-left text-Ash-black">
                                    Stuffed Animals:
                                </h1>
                                <br/>
                                <div className="flex flex-row gap-10 w-full overflow-scroll">
                                    <ShopCard image={teddyBear} cost={5.99} name="Teddy Bear" altName="Teddy Bear"
                                              changeCart={changeCart}/>
                                    <ShopCard image={greenDino} cost={10.99} name="Green Dinosaur"
                                              altName="Green Dinosaur"
                                              changeCart={changeCart}/>
                                    <ShopCard image={pinkDino} cost={10.99} name="Pink Dinosaur" altName="Pink Dinosaur"
                                              changeCart={changeCart}/>
                                    <ShopCard image={heart} cost={3.99} name="Heart" altName="Heart"
                                              changeCart={changeCart}/>
                                </div>
                                <br/><br/>

                                {/*Balloons*/}
                                <br/><br/>
                                <h1 className="dark:text-light-white text-xl font-HeadlandOne text-left text-Ash-black">
                                    Balloons:
                                </h1>
                                <br/>
                                <div className="flex flex-row gap-10 w-full overflow-scroll">
                                    <ShopCard image={gwsBalloon} cost={3.99} name="Get Well Soon Balloon"
                                              altName="Get Well Soon Balloon"
                                              changeCart={changeCart}/>
                                    <ShopCard image={heartBalloon} cost={3.99} name="Red Heart Balloon"
                                              altName="Red Heart Balloon"
                                              changeCart={changeCart}/>
                                    <ShopCard image={rainbow} cost={3.99} name="Rainbow Balloon"
                                              altName="Rainbow Balloon"
                                              changeCart={changeCart}/>
                                    <ShopCard image={sunshine} cost={3.99} name="Happy Sunshine Balloon"
                                              altName="Smiling Sunshine Balloon"
                                              changeCart={changeCart}/>
                                </div>
                                <br/><br/>

                                {/*Candy*/}
                                <br/><br/>
                                <h1 className="dark:text-light-white text-xl font-HeadlandOne text-left text-Ash-black">
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
                                    <ShopCard image={sourPatchKids} cost={5.99} name="Sour Patch Kids"
                                              altName="Sour Patch Kids"
                                              changeCart={changeCart}/>
                                    <ShopCard image={caramels} cost={9.99} name="Caramel Tray" altName="Caramel Tray"
                                              changeCart={changeCart}/>
                                </div>
                                <br/><br/>
                            </form>
                        </div>
                    </div>
                    <div className={submittedWindowVisibility.submittedScreen}>
                    <div className="dark:bg-Ash-black flex-col centerContent">
                        <div className="dark:text-light-white flex-col p-6 bg-white rounded-2xl mt-20 w-1/2 ">
                            <div className={"text-center"}>
                                <h3 className={"p-3 text-lg text-center font-HeadlandOne mt-3"}>Previous Form
                                    Submission:</h3>
                                <p className={"font-bold"}>Receiver Name:</p>
                                <p className={""}>{request.receiverName}</p>

                                <p className={"font-bold"}>Sender Name:</p>
                                <p className={""}>{request.senderName}</p>

                                <p className={"font-bold"}>Where do you want to send this gift?</p>
                                <p className={""}>{request.location}</p>

                                <p className={"font-bold"}>When would you like this gift delivered?</p>
                                <p className={""}>{request.date}</p>

                                <p className={"font-bold"}>What is the priority of the delivery?</p>
                                <p className={""}>{request.priority}</p>

                                <p className={"font-bold "}>Additional Message:</p>
                                <p className={"text-pretty break-words text-center"}>{request.message}</p>

                                <p className={"font-bold"}>Total Cost:</p>
                                <p className={""}>${calcCost()}</p>

                                <p className="font-HeadlandOne p-3 text-xl ">Thank you for submitting!</p>
                                <Button onClick={handleNewSubmission} children="Submit a new request" px="text-xl p-2"/>
                                <br/>
                            </div>
                        </div>
                        <div className="dark:bg-Ash-black text-center p-6 bg-white rounded-2xl mt-20 w-1/3">
                        <p className={"dark:text-light-white font-bold text-center"}>Cart:</p>
                            <p className={"dark:text-light-white text-center"}>{request.cart.map((item: giftItem) => {
                                return <p>{item.quantity} x {item.name}: ${item.cost}</p>;
                            })}</p></div>

                    </div>
                    </div>

                    <div className="pt-10 h-full">
                        <p className={"dark:text-light-white font-HeadlandOne text-deep-blue"}>Created by Kendall and Jade, styled by Ben and
                            Theresa</p>
                    </div>

                </div>

            </div>
        </div>
    )
        ;
}

export default GiftDelivery;
