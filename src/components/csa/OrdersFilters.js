import React from 'react';
import { connect } from 'react-redux';
import { setOrderFilter, filterByCounter } from '../../actions/filter';
import OrderCounterFilters from './OrderCounterFilters';
import OrderStatusFilters from './OrderStatusFilters';

export class OrdersFilters extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          showCounters: false,
          filterOrder: this.props.filters.order
        }
        this.handleCounter = this.handleCounter.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }
    onTextChange = (e) => {
      // this.props.setOrderFilter(e.target.value);
      this.setState({
        filterOrder: e.target.value
      });
    };
    onClearField = (e) => {
      this.props.setOrderFilter('');
      this.setState({
        filterOrder: ''
      });
    };
    onFilterSubmit = () =>{
      this.props.setOrderFilter(this.state.filterOrder);
    }
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
    componentWillUnmount(){
      document.removeEventListener('click', this.closeMenu);
    }
    handleCounter(value){
      this.props.filterByCounter(value);
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
            <div className={this.state.filterOrder.length >= 1 ? 'searchContainer active' :'searchContainer'}>
                <input
                  type="text"
                  placeholder="Search"
                  value={this.state.filterOrder}
                  onChange={this.onTextChange}
                  className="search"
                />
                <i className="fas fa-search" onClick={this.onFilterSubmit}></i>
                {this.state.filterOrder.length >= 1 ? (
                  <button className="closer icon--close" onClick={this.onClearField}></button>
                ) : ''}
            </div>
            
          </div>
          
          <OrderStatusFilters status={this.props.filters.status} pastOrders={this.props.pastOrders} pendingCount={this.props.pendingCount} readyCount={this.props.readyCount} />
            
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