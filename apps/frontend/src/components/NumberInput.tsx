import React, {ChangeEvent} from "react";
import { motion } from "framer-motion";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";

export default function NumberInput( props:{min:string, max:string, width:string, height:string, default:string, onChange:(e: number) => void;}){
    const [value,setValue] = React.useState(0);
//const quantity = document.getElementById("quantity") as HTMLInputElement;
    const buttonStyle = {
        width: 40,
        backgroundSize: "cover",
        color: "black",
        textAlign: "right",
        fontsize: 25,
        lineHeight: "50px", // Should match the height for vertical alignment
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
            className="flex flex-row  h-full rounded-lg focus:border-blue-500 focus:outline-none justify-center justify-items-center space-x-4 pt-4">
            <motion.button onClick={decrement} children={""} style={buttonStyle}
                           whileHover={{scale: 1.1}}
                           whileTap={{scale: 0.9}}
                           className={"centerContent bg-deep-blue rounded-lg"}>
                {MinusSvg}</motion.button>
            <input type="number" value={value} id="quantity" name="quantity" min={props.min} max={props.max}
                   defaultValue={props.default} onChange={handleChange}
                   className={` ${props.width} ${props.height}   text-2xl text-center rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}/>
            <motion.button onClick={increment} children={""} style={buttonStyle}
                           className="centerContent bg-deep-blue rounded-lg"
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
    width: "w-10",
    height: "h-10"
};
