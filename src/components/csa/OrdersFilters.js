import React from 'react';
import { connect } from 'react-redux';
import { setOrderFilter } from '../../actions/filter';
import OrdersCountersFilters from './OrdersCountersFilters';

export class OrdersFilters extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    onTextChange = (e) => {
      this.props.setOrderFilter(e.target.value);
    };
    onClearField = (e) => {
      this.props.setOrderFilter('');
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
            <OrdersCountersFilters />
            
        </div>
      );
    }
  };
  
  const mapStateToProps = (state) => ({
    filters: state.filters
  });
  
  const mapDispatchToProps = (dispatch) => ({
    setOrderFilter: (text) => dispatch(setOrderFilter(text))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(OrdersFilters);