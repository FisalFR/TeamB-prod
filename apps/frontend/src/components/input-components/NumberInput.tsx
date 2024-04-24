import { motion } from "framer-motion";
import {ChangeEvent} from "react";
import plus from '../../assets/plus.svg';
import minus from '../../assets/minus.svg';

export default function NumberInput( props:{min:string, max:string, width:string, height:string, value:number, onChange:(e: number) => void;}){

    const buttonStyle = {
        // ...existing styles...
    };
    const PlusSvg = <img src={plus} alt="Plus" className={"w-5"} />;
    const MinusSvg = <img src={minus} alt="Minus" className={"w-5"} />;

    function increment(e: React.MouseEvent){
        e.preventDefault();
        if (props.value < parseInt(props.max)){
            props.onChange(props.value + 1);
        }
    }

    function decrement(e: React.MouseEvent){
        e.preventDefault();
        if (props.value > parseInt(props.min)){
            props.onChange(props.value - 1);
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        props.onChange(parseInt(e.target.value));
    }

    return(
        <div
            className="flex flex-row  h-full rounded-lg focus:border-blue-500 focus:outline-none justify-center justify-items-center space-x-4 pt-4">
            <motion.button onClick={decrement} children={""} style={buttonStyle}
                           whileHover={{scale: 1.1}}
                           whileTap={{scale: 0.9}}
                           className={"centerContent bg-deep-blue rounded-lg px-1"}>
                {MinusSvg}</motion.button>
            <input type="number" value={props.value} id="quantity" name="quantity" min={props.min} max={props.max}
                   onChange={handleChange}
                   className={` ${props.width} ${props.height}   text-2xl text-center rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}/>
            <motion.button onClick={increment} children={""} style={buttonStyle}
                           className="centerContent bg-deep-blue rounded-lg px-1"
                           whileHover={{scale: 1.1}}
                           whileTap={{scale: 0.9}}>
                {PlusSvg}</motion.button>
        </div>
    );
}
