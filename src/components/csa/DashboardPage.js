import React from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import ReactDOM from 'react-dom';
import { fetchCSAOrders }  from '../../actions/csa/orders';
import OrderListItem from './OrderListItem';

import OrdersFilters from './OrdersFilters';
import { selectOrders, filterByCounter, filterByStatus } from '../../selectors/orders';

import axios from 'axios';
import { baseUrl, headers } from "../../const/global";
const orderAPI = baseUrl+'/order';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchCSAOrders();
    
  };

  isPickedUp=(oId)=>{
    let url = orderAPI +`/${oId}/setstatus?status=2`
    axios.put(url, headers).then(
      (response) => {
        this.props.fetchCSAOrders();
      },
      (err) => {
        console.log(err);
      }
    )
  }
  render(){
    const { orders, filters} = this.props;
    let ordersList = filterByStatus(orders,filters);
    let pendingCount = filterByStatus(orders,0).length;
    let readyCount = filterByStatus(orders,{status:1}).length;

    return(
      <div>
        <div className="content--container">
          <OrdersFilters pendingCount={pendingCount} readyCount={readyCount} />
          <div className="divTable">
            <div className="divTableBody">

              <div className="divTableRow">

                <div className="cell-id">
                    Order
                </div>
                <div className="cell-pickup">
                    Pickup
                </div>
                <div  className="cell-status">
                    Bakery
                </div>

                <div className="cell-status">
                    Deli
                </div>
                
                <div className="cell-status">
                    Kitchen
                </div>

                <div className="cell-status">
                    Salad Bar
                </div>

                <div className="cell-status">
                    Sushi
                </div>

                <div className="cell-status">
                    Cake
                </div>

                <div>
                </div>
            
              </div>
            


              {ordersList.map(order => {
                return <OrderListItem key={order.id} item={order} status={this.props.filters.status} isPickedUp={this.isPickedUp} />;
              })}

            </div>
          </div>
        </div>
      </div>
    )
  }
}

DashboardPage.contextTypes = {
  store: PropTypes.object
};

DashboardPage.propTypes = {
  notifications: PropTypes.array
};

const mapDispatchToProps = (dispatch) => ({
  fetchCSAOrders: () => dispatch(fetchCSAOrders())
});

const mapStateToProps = state => ({
  orders: filterByCounter(selectOrders(state.orders.items,state.filters),state.filters),
  notifications: state.notifications,
  filters: state.filters
});


export default connect(mapStateToProps,mapDispatchToProps)(DashboardPage);

