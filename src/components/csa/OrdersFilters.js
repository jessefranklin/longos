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
      if(this.props.pastOrders){
        this.props.filterByCounter(value);
      } else {
        this.props.filterByCounter(value);
      }
    };
    render() {
      return (
        <div>
          <div className="rowFilter">
            <h3>Orders</h3>
            <div className="searchContainer">
              <input
                  type="text"
                  value={this.props.filters.order}
                  onChange={this.onTextChange}
                  className="search"
                  />
              <button className="close" onClick={this.onClearField}>x</button>
            </div>
            <OrderCounterFilters handleCounter={this.handleCounter} activeHandler={true} />
          </div>
          
          <OrderStatusFilters pastOrders={this.props.pastOrders} />
            
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