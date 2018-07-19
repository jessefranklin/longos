import React from 'react';
import Select from 'react-select';
import _ from 'lodash';

let q = [];
const quantityList = _.range(1, 11).map((value, index) => {
    q.push({label: index+1, value: index+1})
})

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
