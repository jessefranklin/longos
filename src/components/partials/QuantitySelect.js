import React from 'react';


export class QuantitySelect extends React.Component {
    constructor(props){
        super(props);
        this.addOne = this.addOne.bind(this);
        this.minusOne = this.minusOne.bind(this);
    }
    addOne(){
        this.props.onQuantityChange(this.props.quantity+1);
    }
    minusOne() {
        if(this.props.quantity === 1) return;
        this.props.onQuantityChange(this.props.quantity-1);
    }
    render() {
        return (
            <div>
                <h1>Quantity: {this.props.quantity} </h1>
                <button onClick={this.addOne}>+1</button>
                <button onClick={this.minusOne}>-1</button>
            </div>
        )
    }
}
