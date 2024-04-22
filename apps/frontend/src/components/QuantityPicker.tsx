import React, { Component } from 'react';

interface QuantityPickerProps {
    min: number;
    max: number;
    initialValue: number;
    onQuantityChange: (newQuantity: number) => void;
}

interface QuantityPickerState {
    value: number;
    disableDec: boolean;
    disableInc: boolean;
}

export default class QuantityPicker extends Component<QuantityPickerProps, QuantityPickerState> {

    constructor(props: QuantityPickerProps) {
        super(props);

        this.state = {
            value: this.props.initialValue,
            disableDec: this.props.initialValue === this.props.min,
            disableInc: this.props.initialValue === this.props.max
        };

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.initialValue !== this.props.initialValue) {
            this.setState({
                value: this.props.initialValue,
                disableDec: this.props.initialValue === this.props.min,
                disableInc: this.props.initialValue === this.props.max
            });
        }
    }

    increment() {
        this.setState(prevState => {
            const newValue = prevState.value + 1;
            if (newValue <= this.props.max) {
                this.props.onQuantityChange(newValue);
                return {value: newValue, disableDec: false, disableInc: newValue === this.props.max};
            }
            return prevState;
        });
    }

    decrement() {
        this.setState(prevState => {
            const newValue = prevState.value - 1;
            if (newValue >= this.props.min) {
                this.props.onQuantityChange(newValue);
                return {value: newValue, disableDec: newValue === this.props.min, disableInc: false};
            }
            return prevState;
        });
    }

    handleInputChange(event) {
        const newValue = parseInt(event.target.value);
        if (newValue >= this.props.min && newValue <= this.props.max) {
            this.setState({
                value: newValue,
                disableDec: newValue === this.props.min,
                disableInc: newValue === this.props.max
            });
            this.props.onQuantityChange(newValue);
        }
    }

    render() {
        const { disableDec, disableInc } = this.state;

        return (
            <span className="inline-block border border-gray-300 rounded-md align-middle">
        <button
            className={`h-full w-3 text-xs bg-gray-200 text-gray-400 text-center cursor-pointer ${disableDec ? 'text-gray-200' : ''} rounded-l-md`}
            onClick={this.decrement}>&ndash;</button>
        <input className="w-7 p-2 border-0 text-center" type="text" value={this.state.value} onChange={this.handleInputChange}/>
        <button
            className={`h-full w-3 text-xs bg-gray-200 text-gray-400 text-center cursor-pointer ${disableInc ? 'text-gray-200' : ''} rounded-r-md`}
            onClick={this.increment}>&#xff0b;</button>
      </span>
        );
    }
}
