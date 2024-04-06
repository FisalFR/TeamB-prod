import {ChangeEvent} from "react";

function ShopCard(props:{image: string, name: string, cost: number, altName: string, changeCart:(item: string, quantity: number) => void;}) {
    function changeQuantity(e: ChangeEvent<HTMLInputElement> ){
        props.changeCart(props.name, parseInt(e.target.value));
    }
    return(
        <div className=" border-2 bg-white border-rounded px-10 w-80 h-80">
            {/*<h3>{props.name}</h3>*/}
            <br/>
            <div className="border-deep-blue border-2 bg-gray-300 border-rounded w-60 h-40 my-auto ">
                <img src={props.image} alt={props.altName}/>
            </div>
            <br/>
            <h3 className="text-deep-blue font-bold">{props.name}</h3>
            <h3>${props.cost}</h3>
            <br/>

            <label htmlFor="quantity" className="text-deep-blue ">Quantity: </label>
            <input type="number" id="quantity" name="quantity" min="0" max="10" onChange={changeQuantity}
                   defaultValue={0}></input> <br/>
            <br/>
        </div>
    );
}

export default ShopCard;
