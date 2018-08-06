import React from 'react';
import { connect } from 'react-redux';
import { setOrderFilter, filterByCounter } from '../../actions/filter';
import OrderCounterFilters from './OrderCounterFilters';
import OrderStatusFilters from './OrderStatusFilters';

export class OrdersFilters extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleCounter = this.handleCounter.bind(this);
    }
    onTextChange = (e) => {
      this.props.setOrderFilter(e.target.value);
    };
    onClearField = (e) => {
      this.props.setOrderFilter('');
    };
    handleCounter(value){
      this.props.filterByCounter(value);
    };
    render() {
      return (
        <div>
            <input
                type="text"
                value={this.props.filters.order}
                onChange={this.onTextChange}
                />
            <button className="close" onClick={this.onClearField}>x</button>
            
            <OrderCounterFilters handleCounter={this.handleCounter} />

            <OrderStatusFilters />
            
        </div>
      );
    }
  };
  
  const mapStateToProps = (state) => ({
    filters: state.filters
  });
  
  const mapDispatchToProps = (dispatch) => ({
    setOrderFilter: (text) => dispatch(setOrderFilter(text)),
    filterByCounter: (text) => dispatch(filterByCounter(text))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(OrdersFilters);