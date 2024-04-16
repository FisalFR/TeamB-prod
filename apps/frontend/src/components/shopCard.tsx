import {ChangeEvent} from "react";

function ShopCard(props:{image: string, name: string, cost: number, altName: string, changeCart:(item: string, quantity: number) => void;}) {

    function changeQuantity(e: ChangeEvent<HTMLInputElement> ){
        if (!(e.target.value == "")) {
            props.changeCart(props.name, parseInt(e.target.value));
        }
        else {
            props.changeCart(props.name,0);
        }
    }

    return(

        <div className="dark:to-deep-blue border-2 rounded-3xl border-2 bg-gradient-to-t from-white to-blue-300">
            <div className="h-60 my-auto">
                <img src={props.image} alt={props.altName} className="object-cover w-full h-full object-top rounded-t-3xl"/>
            </div>
            <div className="px-10 w-80 h-85 py-8">
                <h3 className="text-deep-blue font-bold">{props.name}</h3>
                <h3>${props.cost}</h3>

                <label htmlFor="quantity" className="text-deep-blue ">Quantity: </label>
                <input type="number" id="quantity" name="quantity" min="0" max="10" className="dark:bg-Ash-black dark:text-light-white w-full h-12 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none" onChange={changeQuantity}
                       defaultValue={0}></input> <br/>
            </div>
        </div>
    );
}

export default ShopCard;
