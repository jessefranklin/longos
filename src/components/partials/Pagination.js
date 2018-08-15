import React from 'react';


export class Pagination extends React.Component {
    constructor(props){
        super(props);
        this.addOne = this.addOne.bind(this);
        this.minusOne = this.minusOne.bind(this);
    }
    addOne(){
        this.props.onPaginationChange(this.props.quantity+1);
    }
    minusOne() {
        if(this.props.quantity === 1) return;
        this.props.onPaginationChange(this.props.quantity-1);
    }
    render() {
        return (
            <div className="qty--container" >
                <button onClick={this.minusOne}>prev</button>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
                <button onClick={this.addOne}>next</button>
            </div>
        )
    }
}
