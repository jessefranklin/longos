import React from 'react';


export class Pagination extends React.Component {
    constructor(props){
        super(props);
        this.addOne = this.addOne.bind(this);
        this.minusOne = this.minusOne.bind(this);
    }
    addOne(){
        this.props.onPaginationChange(this.props.page+1);
    }
    minusOne() {
        if(this.props.page === 0) return;
        this.props.onPaginationChange(this.props.page-1);
    }
    render() {
        return (
            <div className="page--container" >
                <button onClick={this.minusOne}>prev</button>
                <button onClick={this.addOne}>next</button>
            </div>
        )
    }
}
