import {ChangeEvent} from "react";

function RadioButton(props: {width: string; value: string; name: string; color:string, id: string; state: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void; required:boolean}) {
    return (
        <div className={`${props.width} text-left p-2 ${props.color} flex gap-2` }>
            <input type="radio" id={props.id} name={props.name} value={props.value} checked={props.value === props.state} onChange={props.onChange} required={props.required}/>
            <label htmlFor={props.id} className="w-full">{props.value}</label>
        </div>
    );
}

RadioButton.defaultProps = {
    width: "w-72",
    color: "bg-white"
};

export default RadioButton;
