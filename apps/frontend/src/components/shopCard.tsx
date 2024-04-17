
import NumberInput from "./NumberInput.tsx";

function ShopCard(props:{image: string, name: string, cost: number, altName: string, changeCart:(item: string, quantity: number) => void;}) {

    function changeQuantity(e: number ){
        if (!(e == 0)) {
            props.changeCart(props.name, e);
        }
        else {
            props.changeCart(props.name,0);
        }
    }

    return(

        <div className="border-2 rounded-3xl bg-gradient-to-t from-white to-blue-300 ">
            <div className="h-60">
                <img src={props.image} alt={props.altName} className="object-cover w-full h-full object-top rounded-t-3xl"/>
            </div>
            <div className="w-80 h-85 py-8 flex flex-col centerContent ">
                <h3 className="text-deep-blue font-bold">{props.name}</h3>
                <h3>${props.cost}</h3>

                <label htmlFor="quantity" className="text-deep-blue pb-5">Quantity: </label>
                <NumberInput  min="0" max="10" onChange={changeQuantity}
                             default="0"></NumberInput> <br/>
            </div>
        </div>
    );
}

export default ShopCard;
