import {ChangeEvent} from "react";

function RadioButton(props: {value: string; name: string; id: string; state: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void; required:boolean}) {
    return (
        <div className={"w-72 text-left p-2 bg-white flex gap-2"}>
            <input type="radio" id={props.id} name={props.name} value={props.value} checked={props.value === props.state} onChange={props.onChange} required={props.required}/>
            <label htmlFor={props.id} className="w-full">{props.value}</label>
        </div>
    );
}

export default RadioButton;
