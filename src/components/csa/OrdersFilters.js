import React from 'react';
import { connect } from 'react-redux';
import { setOrderFilter, filterByCounter } from '../../actions/filter';
import OrderCounterFilters from './OrderCounterFilters';
import OrderStatusFilters from './OrderStatusFilters';

export class OrdersFilters extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          showCounters: false
        }
        this.handleCounter = this.handleCounter.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }
    onTextChange = (e) => {
      this.props.setOrderFilter(e.target.value);
    };
    onClearField = (e) => {
      this.props.setOrderFilter('');
    };
    toggleMenu(e) {
      e.preventDefault();
      this.setState({
        showCounters: true
      });
      document.addEventListener("click", this.closeMenu);
    }
    closeMenu() {
      this.setState({ showCounters: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }
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
          <div className="rowFilter orders--filter-row">
            <div className="counter--container">
              <h3 className="arrow--down-red" onClick={this.toggleMenu}>{this.props.filters.counter === ''? 'All Dept.' : this.props.filters.counter} Orders</h3>
              {
                this.state.showCounters
                  ? (
                    <OrderCounterFilters handleCounter={this.handleCounter} activeHandler={true} isDashboard={true} />
                  )
                  : (
                    null
                  )
              }
            </div>
            <div className={this.props.filters.text.length >= 1 ? 'searchContainer active' :'searchContainer'}>
                <input
                  type="text"
                  value={this.props.filters.order}
                  onChange={this.onTextChange}
                  className="search"
                />
                <i className="fas fa-search"></i>
                {this.props.filters.order.length >= 1 ? (
                  <button className="closer icon--close" onClick={this.onClearField}></button>
                ) : ''}
            </div>
            
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