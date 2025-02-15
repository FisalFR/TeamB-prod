import React from "react";

function Select(props: { options: string[]; display?: string[]; label: string; id: string; defaultOption?: string; onChange:(e: React.ChangeEvent) => void,
    reset?: boolean}) {
    const selectOptions = props.options; //set to props.options

    function createOptions() {
        return selectOptions.map((option, i) =>

            <option value={option}>
                {props.display ? props.display[i] : option}
            </option>);
    }

    function setSelectValue() {
        if (props.reset) {
            return (props.defaultOption);
        }
    }

    return (
        <div>
            <label htmlFor={props.id}>{props.label}</label>
            <select name={props.id} id={props.id} onChange={props.onChange} value={setSelectValue()}>
                {props.defaultOption && <option value={props.defaultOption} selected disabled hidden>
                    {props.defaultOption}</option>}
                {createOptions()}
            </select>
        </div>);
}

Select.defaultProps = {
    reset: false
};
export default Select;
