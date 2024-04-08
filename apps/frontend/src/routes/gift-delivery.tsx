
import Button from "../components/Button.tsx";
import ShopCard from "../components/shopCard.tsx";
import React, {useState} from "react";
import {giftItem} from "../common/giftItem.ts";
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


function GiftDelivery() {

    const [cart, setCart] = useState<giftItem[]>([]);
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
        "Assorted Chocolate Bundle":5.99,
        "Heart-Shaped Lollipop": 3.99,
        "Sour Patch Kids":5.99,
        "Caramel Tray": 9.99
    };



    function handleSubmit(){
        //alert(request.isAnon);
    }

    function changeCart(item: string, quantity: number){
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
    }



    function createCart() {
        return cart.map((item) =>
            <p> {item.quantity} x {item.name}: {item.cost}</p>);
    }


    return (
        <>
            <h1 className="text-3xl font-HeadlandOne">
                Gift Delivery Request Form
            </h1>
            <form onSubmit={e => {
                e.preventDefault();
            }}>
                <br/><br/>
                <div className="flex flex-row gap-10 flex-wrap font-HeadlandOne text-md text-Ash-black justify-center ">
                    <div>
                        <label htmlFor="recieverName">To: </label>
                        <input type="text" id="recieverName" name="recieverName"></input> <br/> <br/>
                    </div>

                    <div>
                        <label htmlFor="senderName">From: </label>
                        <input type="text" id="senderName" name="senderName"></input> <br/> <br/>
                    </div>
                    <div>
                        <label htmlFor="location">Location: </label>
                        <input type="text" id="location" name="location"></input> <br/> <br/>
                    </div>

                </div>
                <br/><br/>

                <label htmlFor="message" className="font-HeadlandOne text-md text-Ash-black justify-center">Send a
                    Message: </label>
                <textarea id="message" name="message" rows={4} cols={40}></textarea> <br/> <br/>

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

                <Button onClick={handleSubmit} children={"Submit"}/>
                <br/><br/>
            </form>

            <div className= "border-2 bg-white border-rounded">
                <div className= "border-2 bg-deep-blue border-rounded">
                    <h2 className="text-xl font-HeadlandOne text-center text-bone-white font-bold">
                        Cart
                    </h2>
                </div>

                <div className="text-xl font-HeadlandOne text-center text-Ash-black text-bold">
                {createCart()}
                </div>
            </div>
            <br/><br/>

        </>
    );
}

export default GiftDelivery;
