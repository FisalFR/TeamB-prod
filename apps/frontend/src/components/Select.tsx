import React from "react";

function Select(props: { options: string[]; label: string; id: string; onChange:(e: React.ChangeEvent) => void}) {
    const selectOptions = props.options; //set to props.options

    function createOptions() {
        return selectOptions.map((option) =>
            <option value={option}>{option}</option>);
    }

    return (
        <>
            <label htmlFor={props.id}>{props.label}</label>
            <select name={props.id} id={props.id} onChange={props.onChange}>
                {createOptions()}
            </select>
        </>);
}

export default Select;
