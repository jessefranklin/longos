import React from 'react';
import {Button} from 'react-bootstrap';


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
                <Button onClick={this.minusOne} bsStyle="primary">prev</Button>
                <Button onClick={this.addOne} bsStyle="primary">next</Button>
            </div>
        )
    }
}
