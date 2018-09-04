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
            <div className="qty--container" >
            <button onClick={this.minusOne}>-</button>
                <h4>{this.props.quantity} </h4>
                <button onClick={this.addOne}>+</button>
            </div>
        )
    }
}
