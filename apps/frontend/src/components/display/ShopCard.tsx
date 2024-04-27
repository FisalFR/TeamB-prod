import NumberInput from "../input-components/NumberInput.tsx";
import {giftItem} from "common/src/service-requests/gift-item.ts";

function ShopCard(props:{image: string, name: string, cost: number, altName: string, changeCart:(item: string, quantity: number) => void, cart: giftItem[];}) {

    const cart: giftItem[] = props.cart;
    // Find the item in the cart
    const item = cart.find(item => item.name === props.name);

    // If the item is found, get its quantity. Otherwise, default to 0.
    const quantity = item ? item.quantity : 0;

    function changeQuantity(quantity: number) { // Adjust the parameter type
        if (!isNaN(quantity)) {
            props.changeCart(props.name, quantity);
        } else {
            props.changeCart(props.name, 0);
        }
    }

    return(

        <div className=" border-2 rounded-3xl border-2 bg-gradient-to-t from-white to-blue-300">
            <div className="h-60 my-auto">
                <img src={props.image} alt={props.altName} className="object-cover w-full h-full object-top rounded-t-3xl"/>
            </div>
            <div className="px-10 w-80 h-85 py-8">
                <h3 className="text-deep-blue font-bold">{props.name}</h3>
                <h3>${props.cost}</h3>

                {/*<label htmlFor="quantity" className="text-deep-blue ">Quantity: </label>*/}
                {/*<input type="number" id="quantity" name="quantity" min="0" max="10" className="w-full h-12 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none" onChange={changeQuantity}*/}
                {/*       defaultValue={0}></input> <br/>*/}
                <label htmlFor="quantity" className="text-deep-blue pb-5">Quantity: </label>
                <NumberInput min="0" max="10" onChange={changeQuantity} value={quantity }></NumberInput> <br/>
            </div>
        </div>
    );
}

export default ShopCard;
