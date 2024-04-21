import React, {ChangeEvent} from "react";
import { motion } from "framer-motion";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";

export default function NumberInput( props:{min:string, max:string, width:string, height:string, buttonColor:string, default:string, onChange:(e: number) => void;}){
const [value,setValue] = React.useState(0);
//const quantity = document.getElementById("quantity") as HTMLInputElement;
    const buttonStyle = {
        backgroundSize: "cover",
        cursor: "pointer",
    };
    const PlusSvg = <img src={plus} alt="Plus" className={"w-5"} />;
    const MinusSvg = <img src={minus} alt="Minus" className={"w-5"} />;
    function increment(e: React.MouseEvent){
        e.preventDefault();
        if (value<parseInt(props.max)){
        setValue(value+1);
        props.onChange(value+1);}

    }
    function decrement(e: React.MouseEvent){
        e.preventDefault();
        if (value>parseInt(props.min)){
        setValue(value-1);
        props.onChange(value-1);}
    }
    function handleChange(e: ChangeEvent<HTMLInputElement>){
        setValue(parseInt(e.target.value));
        props.onChange(value);
    }

    return(
        <div
            className="flex flex-row  h-full rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none justify-center justify-items-center ">
            <motion.button onClick={decrement} children={""} style={buttonStyle}
                           whileHover={{scale: 1.1}}
                           whileTap={{scale: 0.9}}
                           className={`${props.buttonColor} centerContent  rounded-lg ${props.width}`}>
                {MinusSvg}</motion.button>
            <input type="number" value={value} id="quantity" name="quantity" min={props.min} max={props.max}
                   defaultValue={props.default} onChange={handleChange}
                   className={` ${props.width} ${props.height}   text-3xl text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}/>
            <motion.button onClick={increment} children={""} style={buttonStyle}
                           className={`${props.buttonColor} centerContent  rounded-lg ${props.width}`}
                           whileHover={{scale: 1.1}}
                           whileTap={{scale: 0.9}}>
                {PlusSvg}</motion.button>
        </div>


    );


}
NumberInput.defaultProps = {
    min: -Infinity,
    max: Infinity,
    default: 0,
    width: "w-40",
    height: "h-10",
    buttonColor:"bg-gray-300"
};
