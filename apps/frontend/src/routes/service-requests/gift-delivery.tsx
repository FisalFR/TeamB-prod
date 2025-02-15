import Button from "../../components/buttons/Button.tsx";
import ShopCard from "../../components/display/ShopCard.tsx";
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {giftItem} from "common/src/service-requests/gift-item.ts";
import Tulip from "../../assets/Gift_Images/Tulip.jpeg";
import Rose from "../../assets/Gift_Images/Rose.jpeg";
import tulipBouquet from "../../assets/Gift_Images/TulipBouquet2.png";
import roseBouquet from "../../assets/Gift_Images/RoseBouquet.png";
import teddyBear from "../../assets/Gift_Images/teddyBear.jpeg";
import greenDino from "../../assets/Gift_Images/greenDino2.jpeg";
import pinkDino from "../../assets/Gift_Images/pinkDino.jpeg";
import heart from "../../assets/Gift_Images/heartStuffie.png";
import gwsBalloon from "../../assets/Gift_Images/gwsBalloon2.jpeg";
import heartBalloon from "../../assets/Gift_Images/heartBalloon.jpeg";
import rainbow from "../../assets/Gift_Images/rainbowBalloon.jpeg";
import sunshine from "../../assets/Gift_Images/sunshineBalloon.jpeg";
import chocolates from "../../assets/Gift_Images/chocolates.jpeg";
import heartlollipop from "../../assets/Gift_Images/heartlollipops.jpeg";
import sourPatchKids from "../../assets/Gift_Images/sourPatchKids.jpeg";
import caramels from "../../assets/Gift_Images/caramels.jpeg";
import {giftRequest} from "common/src/service-requests/gift-request.ts";
import axios from "axios";
import Dropdown from "../../components/input-components/Dropdown.tsx";
import RadioButton from "../../components/input-components/RadioButton.tsx";
import backward from "../../assets/icons/backward.svg";
import cartIMG from "../../assets/icons/cart.svg";
import QuantityPicker from "../../components/input-components/QuantityPicker.tsx";
import Datepicker from '../../components/input-components/DatePicker.tsx';

//this is a commit just for mo :)
function GiftDelivery() {
    const formRef = useRef<HTMLFormElement>(null);
    const cartRef = useRef<HTMLFormElement>(null);
    const [cart, setCart] = useState<giftItem[]>([]);
    const [locationOptions, setLocationOptions] = useState<string[]>([]);
    const [cleared, setCleared] = useState(false);
    const [submittedWindowVisibility, setSubmittedWindowVisibility] = useState({
        formScreen: "block",
        submittedScreen: "hidden",
        cartScreen:"hidden"
    });
    const [request, setRequest] = useState<giftRequest>({
        employeeName: "",
        receiverName:"",
        senderName: "",
        priority:"Low",
        location:"",
        message: "",
        date: new Date().toDateString(),
        cart: []
    });
    const BackwardSVG = <img src={backward} alt="backward" className={"w-5"} />;
    const CartSVG = <img src={cartIMG} alt="cart" className={"w-5"} />;



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

    function handleCartScreen() {
            setSubmittedWindowVisibility({formScreen: "hidden", submittedScreen: "hidden", cartScreen: "block"});
    }

    function handleBackbutton(){
        setSubmittedWindowVisibility({formScreen:"block", submittedScreen: "hidden", cartScreen: "hidden"});
    }

    function handleSubmit(e: {preventDefault: () => void}) {
        if (cart.length == 0){
        return alert("Please add an item to your cart.");}

        (formRef.current as HTMLFormElement).requestSubmit();
        (cartRef.current as HTMLFormElement).requestSubmit();
        e.preventDefault();
        if ((formRef.current as HTMLFormElement).checkValidity() && (cartRef.current as HTMLFormElement).checkValidity()){
            axios.post("/api/gift/insert", request, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then();
            setCleared(true);
            setSubmittedWindowVisibility({formScreen: "hidden", submittedScreen: "block", cartScreen: "hidden"});
        }
    }

    function changeCart(item: string, quantity: number, image: string) {
        console.log(quantity);
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
                    cost: roundedCost,
                    image: image
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
            <div className="flex flex-col pt-2">
                <p className={"bg-blue-200 shadow-lg rounded-lg"}>
                    <div className={"flex flex-row gap-4"}>
                        <img src={item.image} alt={item.name} className="w-20 h-20 border-2 border-blue-200 rounded-lg p-1"/>
                        <p className={"text-left pt-2 text-xs font-bold"}>{item.name}
                            <div className="flex flex-row justify-center gap-x-32 pt-6">
                                <QuantityPicker min={0} max={10} initialValue={item.quantity} onQuantityChange={(newQuantity) => {
                                    changeCart(item.name, newQuantity, item.image);
                                }}/>
                                <p className={"pt-2"}> ${item.cost.toFixed(2)}</p>
                            </div>
                        </p>
                    </div>
                </p>
            </div>);
    }

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
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

    function handleDateInput(dateString:string): void {
        console.log(`getting called ${dateString}`);
        setCleared(false);
        setRequest({...request, date: dateString});
    }

    // function scrollToTop(): void{
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    // }

    function handleNewSubmission(): void {

        setRequest({
            employeeName: "", receiverName:"",
            senderName: "",
            location:"",
            priority:"Low",
            message: "",
            date: new Date().toDateString(),
            cart: []});
        setCleared(false);
        location.reload();
        setSubmittedWindowVisibility({formScreen: "block", submittedScreen: "hidden"});
    }

    function totalItems() {
        return cart.map(item => item.quantity).reduce((acc, curr) => acc + curr, 0);
    }


    return (

        <div className="overflow-hidden bg-gradient-to-t from-bone-white to-deep-blue relative">
            <div className={submittedWindowVisibility.formScreen}>
            <div
                className=" rounded-3xl right-3 top-20 fixed z-20"> {/*Entire Cart Page*/}
                <Button onClick={handleCartScreen} color={"bg-bone-white"} px={"px-6"} py={"py-3"} text={"text-deep-blue"}>
                    <div className="flex items-center">
                        <span className="mr-2">{totalItems()}</span>
                        {CartSVG}
                    </div>
                </Button>
            </div>
            </div>
            {/*<div className=" right-5 fixed top-20 text-2xl text-center text-Ash-black text-bold ">*/}
            {/*    <Button onClick={scrollToTop} children={"Go to Cart"} px={"px-9"} py={"py-4"}/>*/}
            {/*</div>*/}

            <div className="centerContent ">

                <div className="w-5/6">
                    <div className={submittedWindowVisibility.formScreen}>
                        <div className="justify-between bg-light-white my-10 p-10 rounded-3xl relative top-20">
                            <div className="absolute bg-deep-blue rounded-t-2xl top-0 right-0 w-full p-8">
                                <h1 className="text-4xl font-OpenSans font-extrabold text-white">
                                    Gift Delivery Request Form
                                </h1>
                            </div>

                            <div className="p-6 rounded-2xl mt-20 w-1/2 text-center w-full">
                                <h2 className="font-OpenSans font-bold text-2xl text-deep-blue">How to Request a Gift
                                    Delivery</h2>
                                <p className="font-OpenSans text-md text-Ash-black mt-4">
                                    To request a gift delivery, please fill out the form on this page. Start by
                                    selecting the items you wish to send from our selection of flowers, stuffed animals,
                                    balloons, and candy. You can adjust the quantity of each item in your cart.
                                </p>
                                <p className="font-OpenSans text-md text-Ash-black mt-4">
                                    Next, provide the recipient's name and your name in the 'To' and 'From' fields
                                    respectively. Select the location for the gift delivery and choose a delivery date.
                                    You can also set the priority of the delivery and include a personal message.
                                </p>
                                <p className="font-OpenSans text-md text-Ash-black mt-4">
                                    Once you've filled out all the necessary information, click 'Purchase' to submit
                                    your gift delivery request. You will see a summary of your submission and the total
                                    cost. Thank you for choosing our gift delivery service!
                                </p>
                            </div>

                            <form ref={formRef} onSubmit={e => {
                                e.preventDefault();
                            }}>
                                <br/><br/>


                                {/*Flowers*/}
                                <h1 className="text-xl font-HeadlandOne text-left text-Ash-black">
                                    Flowers:
                                </h1>
                                <br/>
                                <div className="flex flex-row gap-10 w-full overflow-scroll">
                                    <ShopCard image={Tulip} cost={3.99} name="Tulip" altName="Single Tulip"
                                              changeCart={(item, quantity) => changeCart(item, quantity, Tulip)}
                                              cart={cart}/>
                                    <ShopCard image={Rose} cost={5.99} name="Rose" altName="Single Rose"
                                              changeCart={(item, quantity) => changeCart(item, quantity, Rose)}
                                              cart={cart}/>
                                    <ShopCard image={tulipBouquet} cost={21.99} name="Bouquet of Tulips"
                                              altName="Bouquet of Tulips"
                                              changeCart={(item, quantity) => changeCart(item, quantity, tulipBouquet)}
                                              cart={cart}/>
                                    <ShopCard image={roseBouquet} cost={29.99} name="Bouquet of Roses"
                                              altName="Bouquet of Roses"
                                              changeCart={(item, quantity) => changeCart(item, quantity, roseBouquet)}
                                              cart={cart}/>
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
                                              changeCart={(item, quantity) => changeCart(item, quantity, teddyBear)}
                                              cart={cart}/>
                                    <ShopCard image={greenDino} cost={10.99} name="Green Dinosaur"
                                              altName="Green Dinosaur"
                                              changeCart={(item, quantity) => changeCart(item, quantity, greenDino)}
                                              cart={cart}/>
                                    <ShopCard image={pinkDino} cost={10.99} name="Pink Dinosaur" altName="Pink Dinosaur"
                                              changeCart={(item, quantity) => changeCart(item, quantity, pinkDino)}
                                              cart={cart}/>
                                    <ShopCard image={heart} cost={3.99} name="Heart" altName="Heart"
                                              changeCart={(item, quantity) => changeCart(item, quantity, heart)}
                                              cart={cart}/>
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
                                              changeCart={(item, quantity) => changeCart(item, quantity, gwsBalloon)}
                                              cart={cart}/>
                                    <ShopCard image={heartBalloon} cost={3.99} name="Red Heart Balloon"
                                              altName="Red Heart Balloon"
                                              changeCart={(item, quantity) => changeCart(item, quantity, heartBalloon)}
                                              cart={cart}/>
                                    <ShopCard image={rainbow} cost={3.99} name="Rainbow Balloon"
                                              altName="Rainbow Balloon"
                                              changeCart={(item, quantity) => changeCart(item, quantity, rainbow)}
                                              cart={cart}/>
                                    <ShopCard image={sunshine} cost={3.99} name="Happy Sunshine Balloon"
                                              altName="Smiling Sunshine Balloon"
                                              changeCart={(item, quantity) => changeCart(item, quantity, sunshine)}
                                              cart={cart}/>
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
                                              changeCart={(item, quantity) => changeCart(item, quantity, chocolates)}
                                              cart={cart}/>
                                    <ShopCard image={heartlollipop} cost={3.99} name="Heart-Shaped Lollipop"
                                              altName="Heart-Shaped Lollipops"
                                              changeCart={(item, quantity) => changeCart(item, quantity, heartlollipop)}
                                              cart={cart}/>
                                    <ShopCard image={sourPatchKids} cost={5.99} name="Sour Patch Kids"
                                              altName="Sour Patch Kids"
                                              changeCart={(item, quantity) => changeCart(item, quantity, sourPatchKids)}
                                              cart={cart}/>
                                    <ShopCard image={caramels} cost={9.99} name="Caramel Tray" altName="Caramel Tray"
                                              changeCart={(item, quantity) => changeCart(item, quantity, caramels)}
                                              cart={cart}/>
                                </div>
                                <br/><br/>
                            </form>
                        </div>
                    </div>
                    <div className={submittedWindowVisibility.cartScreen}>
                        <div
                            className="centerContent"> {/*Entire Cart Page*/}
                            <div className="absolute top-5 left-[20px]">
                                <Button onClick={handleBackbutton} color={"bg-white"} px={"px-3"} py={"py-3"}>
                                    {BackwardSVG}
                                </Button>
                            </div>
                            <form ref={cartRef} onSubmit={e => {
                                e.preventDefault();}}>
                            <div className={"flex flex-row space-x-[40px] mt-8"}> {/*Box on Top*/}
                                <div
                                    className={"flex flex-col bg-white p-8 rounded-xl shadow-xl"}> {/*Form Information Div (First Column)*/}

                                    <h2 className="font-extrabold text-3xl font-OpenSans text-graphite w-full py-2 border-rounded border-b-4
                                            border-graphite mb-6">
                                        Delivery Information
                                    </h2>
                                    <div className={"flex flex-row space-x-10"}>{/*First Column of Form*/}

                                        <div className={"flex flex-col w-[220px] space-y-3"}>
                                            <div className={"text-left mt-3"}>
                                                <label htmlFor="receiverName"
                                                       className=" font-OpenSans font-bold text-md text-Ash-black">To: </label>
                                                <input type="text" id="receiverName" name="receiverName"
                                                       placeholder={"Recipient's Name"}
                                                       className="w-full border-solid border-gray-200 border-2 rounded p-2"
                                                       required={true}
                                                       onChange={handleInput}></input><br/>
                                            </div>
                                            <div className={"flex flex-col text-left"}>
                                                <div>
                                                    <label htmlFor="message"
                                                           className="font-OpenSans text-md font-bold text-left text-Ash-black ">
                                                        Pick a Date: </label>

                                                   <Datepicker date={new Date(request.date)} onChange={(date) => {if(date !== undefined) { handleDateInput(date.toDateString());}}}/>
                                                </div>
                                            </div>

                                            <div className="">
                                                <p className={"text-left font-bold"}>What is the
                                                    priority?</p>
                                                <div
                                                    className="border-solid border-gray-200 border-2 rounded w-full">
                                                    <RadioButton value={"Low"} name={"priority"}
                                                                 id={"priority1"}
                                                                 state={request.priority}
                                                                 onChange={handlePriorityInput}
                                                                 required={true}
                                                                 width={"w-full"}/>
                                                    <RadioButton value={"Medium"} name={"priority"}
                                                                 id={"priority2"}
                                                                 state={request.priority}
                                                                 onChange={handlePriorityInput}
                                                                 required={true}
                                                                 width={"w-full"}/>
                                                    <RadioButton value={"High"} name={"priority"}
                                                                 id={"priority3"}
                                                                 state={request.priority}
                                                                 onChange={handlePriorityInput}
                                                                 required={true}
                                                                 width={"w-full"}/>
                                                    <RadioButton value={"Emergency"} name={"priority"}
                                                                 id={"priority4"}
                                                                 state={request.priority}
                                                                 onChange={handlePriorityInput}
                                                                 required={true}
                                                                 width={"w-full"}/>
                                                </div>

                                            </div>
                                        </div>
                                        {/**/}
                                        <div className={"flex flex-col w-[235px] space-y-3"}>
                                            <div className="mt-3 text-left">
                                                <label htmlFor="senderName"
                                                       className="font-bold text-md text-Ash-black">From: </label>
                                                <input type="text" id="senderName" name="senderName"
                                                       className="w-full border-solid border-gray-200 border-2 rounded p-2"
                                                       placeholder={"Sender's Name"}
                                                       required={true}
                                                       onChange={handleInput}></input><br/>
                                            </div>

                                            <div className="text-left">
                                                <label htmlFor="location"
                                                       className="text-left font-OpenSans font-bold text-md text-Ash-black">Location: </label>
                                                <div
                                                    className="border-solid border-gray-200 border-2 rounded w-full p-[3px]">
                                                    <Dropdown options={locationOptions}
                                                              placeholder="Location"
                                                              name="Location Dropdown"
                                                              id="location"
                                                              setInput={handleLocationInput}
                                                              value={cleared}
                                                              required={true}
                                                              width="w-full"
                                                              color="bg-white"
                                                    />
                                                </div>
                                            </div>

                                            <div className="w-full h-full text-left">
                                                <label htmlFor="message"
                                                       className=" font-OpenSans text-md  font-bold text-Ash-black ">
                                                    Send a Message: </label>
                                                <textarea id="message" name="message" rows={4}
                                                          cols={40}
                                                          placeholder={"Send a nice message!"}
                                                          onChange={handleMessage}
                                                          required={true}
                                                          className="border-solid border-gray-200 border-2 rounded w-full h-[165px] p-2">
                                                                    </textarea>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div className="flex w-96 max-h-[700px] h-fit">
                                    <div
                                        className="bg-white rounded-3xl w-full object-cover  h-full shadow-xl px-4 pb-4">

                                        <h2 className="font-extrabold text-3xl font-OpenSans text-graphite w-full py-2 border-rounded border-b-4
                                            border-graphite pt-10 ">
                                            Cart
                                        </h2>

                                        <div
                                            className="text-xl text-Ash-black text-bold min-h-96 w-full max-h-72 overflow-y-scroll-auto py-5">
                                            {createCart()}
                                        </div>
                                        <div
                                            className="text-xl text-Ash-black text-bold border-t-2 space-y-4 border-dotted pt-4">
                                            <div className="flex flex-row space-x-[185px]">
                                                <a className={"text-gray-500 font-OpenSans"}>Total Cost: </a>
                                                <a className="pt-4 font-bold font-OpenSans">${calcCost()}</a>
                                            </div>
                                            <Button onClick={handleSubmit} children={"Purchase"} px={"px-[130px]"}
                                                    rounded={"rounded-3xl"}
                                                    color={"bg-black"}/>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            </form>
                        </div>

                    </div>

                    <div className={submittedWindowVisibility.submittedScreen}>
                        <div className=" flex-col centerContent">
                            <div className="flex-col p-6 bg-white rounded-2xl mt-20 w-1/2 ">
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
                                    <Button onClick={handleNewSubmission} children="Submit a new request"
                                            px="text-xl p-2"/>
                                    <br/>
                                </div>
                            </div>
                            <div className="text-center p-6 bg-white rounded-2xl mt-20 w-1/3">
                                <p className={"font-bold text-center"}>Cart:</p>
                                <p className={"text-center"}>{request.cart.map((item: giftItem) => {
                                    return <p>{item.quantity} x {item.name}: ${item.cost}</p>;
                                })}</p></div>
                        </div>

                        <div className="pt-6 h-full">
                            <p className={"font-HeadlandOne text-deep-blue"}>Created by Kendall and Jade, styled by Ben
                                and
                                Theresa</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
        ;
}

export default GiftDelivery;
