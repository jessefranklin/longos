import React from 'react';
import { connect } from 'react-redux';
import { filterByCounter } from '../../actions/filter';

export class OrdersFilters extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleCounter = this.handleCounter.bind(this);
    }
    handleCounter(value){
        this.props.filterByCounter(value);
    };
    render() {
      return (
        <div>
            <ul>
                <li><button onClick={() => this.handleCounter('')}>All Dept.</button></li>
                <li><button onClick={() => this.handleCounter('deli')}>Deli</button></li>
                <li><button onClick={() => this.handleCounter('kitchen')}>Kitchen</button></li>
                <li><button onClick={() => this.handleCounter('salad')}>Salad bar</button></li>
                <li><button onClick={() => this.handleCounter('sushi')}>Sushi</button></li>
                <li><button onClick={() => this.handleCounter('cakes')}>Cakes</button></li>
            </ul>
        </div>
    );
}
};

const mapDispatchToProps = (dispatch) => ({
    filterByCounter: (text) => dispatch(filterByCounter(text))
  });
  
  export default connect(undefined, mapDispatchToProps)(OrdersFilters);