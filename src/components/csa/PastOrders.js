import React from 'react';
import { connect } from "react-redux";
import { fetchCSAPastOrders }  from '../../actions/csa/pastOrders';
import OrderListItem from './OrderListItem';
import OrdersFilters from './OrdersFilters';
import config from '../../server/config.json';
import { Pagination } from '../partials/Pagination';
import { selectOrders, filterByStatus, filterByCounter } from '../../selectors/orders';
import Loading from '../shared/LoadingPage';

import { baseUrl, headers } from "../../const/global";

class PastOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        perpage: 10,
        page: 0,
        counter: this.props.filters.counter,
        dateRangeStart: '',
        dateRangeEnd:'',
        query:''
    }

  }
  componentDidMount() {
    let url = this.returnUrlwithParam();
    this.props.fetchCSAPastOrders(url);
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.filters.counter !== this.props.filters.counter) {
      this.setState({ 'page' : 0 });
      let url = this.returnUrlwithParam();
      this.props.fetchCSAPastOrders(url);
    }
    if (prevState.page !== this.state.page) {
      let url = this.returnUrlwithParam();
      this.props.fetchCSAPastOrders(url);
    }

  }
  returnUrlwithParam(){
    const orderAPI = `${baseUrl}/order/pickedup`;
    const orderIDs = `?storeid=${config[0].store_id}`;
    let counter = this.props.filters.counter !== '' ? `&counter=${this.props.filters.counter}` : '';
    const params = `&perpage=${this.state.perpage}&page=${this.state.page}${counter}`
    return orderAPI + orderIDs + params;
  }
  onPaginationChange = (val) =>{
      this.setState({ 'page' : val });
  }
  viewOrder=(oId)=> {
    this.props.history.push(`/orderDashboard/orderDetail/${oId}`);
  }
  render(){
    const { orders, filters, pastorders} = this.props;
    let pendingCount = filterByStatus(orders,0).length;
    let readyCount = filterByStatus(orders,{status:1}).length;

    return(
      <div>
        <div className="content--container">
          <OrdersFilters pastOrders={true} pendingCount={pendingCount} readyCount={readyCount} />

          <div className="divTable">
            <div className="divTableBody">

              <div className="divTableRow">

                <div className="cell-id">
                    Order #
                </div>

                <div className="cell-pickup">
                    Pickup
                </div>

                <div className="cell-status">
                    Bakery
                </div>

                <div className="cell-status">
                    Deli
                </div>

                <div className="cell-status">
                    Kitchen
                </div>

                <div className="cell-status">
                    Salad
                </div>

                <div className="cell-status">
                    Sushi
                </div>

                <div className="cell-status">
                    Cake
                </div>

              </div>

              {pastorders.orders.map(order => {
                return <OrderListItem key={order.id} item={order} pastOrders={true} viewOrder={this.viewOrder} />;
              })}

            </div>
          </div>

          <Pagination onPaginationChange={this.onPaginationChange} page={this.state.page} />
        </div>
        <Loading loading={this.props.pastorders.loading} />
      </div>
    )
  }
}



const mapStateToProps = (state) => ({
    orders: filterByCounter(selectOrders(state.orders.items,state.filters),state.filters),
    filters: state.filters,
    pastorders: state.pastorders
});

const mapDispatchToProps = (dispatch) => ({
    fetchCSAPastOrders:(params) => dispatch(fetchCSAPastOrders(params))
});


export default connect(mapStateToProps, mapDispatchToProps)(PastOrders);
