//import {useRef, useState} from 'react';
//import {giftInfo} from "../common/giftInfo.ts";
//import Table from "../components/Table.tsx";
import Button from "../components/Button.tsx";
import ShopCard from "../components/shopCard.tsx";
import {useState} from "react";

function GiftDelivery() {

    const [cart, setCart] = useState({});
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
        "Popsicle":1.99,
        "Caramel": 3.99
    };
    function handleSubmit(){
        //alert(request.isAnon);
    }

    function changeCart(item: string, quantity: number){
        const newCart = cart;
        newCart[item]=quantity;
        setCart(newCart);
        //alert(item);
        //alert(quantity);
        alert(itemCosts[item]);
    }

    function createCart(){
       let rowDivs = [];

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

                <label htmlFor="message" className="font-HeadlandOne text-md text-Ash-black justify-center">Send a Message: </label>
                <textarea  id="message" name="message" rows={4} cols={40} ></textarea> <br/> <br/>

                {/*Flowers*/}
                <h1 className="text-xl font-HeadlandOne text-left text-Ash-black">
                    Flowers:
                </h1>
                <br/>
                <div className="flex flex-row gap-10 w-full overflow-scroll">
                    <ShopCard image="url" cost={3.99} name="Tulip" altName="Single Tulip"
                              changeCart={changeCart}/>
                    <ShopCard image="url" cost={5.99} name="Rose" altName="Single Rose"
                              changeCart={changeCart}/>
                    <ShopCard image="url" cost={21.99} name="Bouquet of Tulips" altName="Bouquet of Tulips"
                              changeCart={changeCart}/>
                    <ShopCard image="url" cost={29.99} name="Bouquet of Roses" altName="Bouquet of Roses"
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
                    <ShopCard image="url" cost={5.99} name="Teddy Bear" altName="Teddy Bear"
                              changeCart={changeCart}/>
                    <ShopCard image="url" cost={10.99} name="Green Dinosaur" altName="Green Dinosaur"
                              changeCart={changeCart}/>
                    <ShopCard image="url" cost={10.99} name="Pink Dinosaur" altName="Pink Dinosaur"
                              changeCart={changeCart}/>
                    <ShopCard image="url" cost={3.99} name="Heart" altName="Heart"
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
                    <ShopCard image="url" cost={3.99} name="Get Well Soon Balloon" altName="Get Well Soon Balloon"
                              changeCart={changeCart}/>
                    <ShopCard image="url" cost={3.99} name="Red Heart Balloon" altName="Red Heart Balloon"
                              changeCart={changeCart}/>
                    <ShopCard image="url" cost={3.99} name="Rainbow Balloon" altName="Rainbow Balloon"
                              changeCart={changeCart}/>
                    <ShopCard image="url" cost={3.99} name="Happy Sunshine Balloon" altName="Smiling Sunshine Balloon"
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
                    <ShopCard image="url" cost={5.99} name="Assorted Chocolate Bundle" altName="Assorted Chocolates"
                              changeCart={changeCart}/>
                    <ShopCard image="url" cost={3.99} name="Heart-Shaped Lollipop" altName="Heart-Shaped Lollipops"
                              changeCart={changeCart}/>
                    <ShopCard image="url" cost={1.99} name="Popsicle" altName="Popsicle"
                              changeCart={changeCart}/>
                    <ShopCard image="url" cost={3.99} name="Caramel" altName="Caramel"
                              changeCart={changeCart}/>
                </div>
                <br/><br/>

                <Button onClick={handleSubmit} children={"Submit"}/>
                <br/><br/>


            </form>

            <div>
                <h2>
                    Cart
                </h2>
                {createCart}
            </div>

        </>
    );
}

export default GiftDelivery;
