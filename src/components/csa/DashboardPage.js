import React from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import ReactDOM from 'react-dom';
import { fetchCSAOrders }  from '../../actions/csa/orders';
import OrderListItem from './OrderListItem';
import CSAHeader from './CSAHeader';
import CSAFooter from './CSAFooter';
import OrdersFilters from './OrdersFilters';
import { selectOrders, filterByCounter, filterByStatus } from '../../selectors/orders';

import { baseUrl, headers } from "../../const/global";
const orderAPI = baseUrl+'/order';

let axios = require('axios');

import uuid from 'uuid/v1';
import Notifications, { success, error, warning, info, removeAll } from 'react-notification-system-redux';




class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.sampleNotification = this.sampleNotification.bind(this);
  }
  componentDidMount() {
    this.props.fetchCSAOrders();
    
  };

  dispatchNotification(fn, timeout) {
    let notificationOpts = {
      uid: uuid(),
      title: 'A new order has been placed',
      message: 'A new order has been placed',
      position: 'tr',
      autoDismiss: 0,
      action: {
        label: 'View Order',
        callback: () => alert('clicked!')
      }
    };
    setTimeout(() => {
      this.context.store.dispatch(fn(notificationOpts));
    }, timeout);
  }

  sampleNotification() {
    this.dispatchNotification(success, 250);
    this.dispatchNotification(error, 500);
    this.dispatchNotification(warning, 750);
    this.dispatchNotification(info, 1000);
  }
  isPickedUp=(oId)=>{
    let url = orderAPI +`/${oId}/setstatus?status=2`
    axios.put(url, headers).then(
      (response) => {
        console.log(response.data);
        this.props.fetchCSAOrders();
      },
      (err) => {
        console.log(err);
      }
    )
  }
  render(){
    const {notifications} = this.props;

    return(
      <div>
        <CSAHeader />
        <div className="content--container">
          <OrdersFilters />
          <div className="divTable">
            <div className="divTableBody">

              <div className="divTableRow">

                <div className="cell-id">
                    Order
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
                  {this.props.filters.status === 1 ? 'Picked Up' :''}
                </div>
            
              </div>
            


              {this.props.orders.map(order => {
                return <OrderListItem key={order.id} item={order} status={this.props.filters.status} isPickedUp={this.isPickedUp} />;
              })}

            </div>
          </div>
        </div>

        <button className="temp-sample" onClick={this.sampleNotification}>Add sample Notification</button>

        <CSAFooter />

        <Notifications notifications={notifications} />

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
  orders: filterByStatus(filterByCounter(selectOrders(state.orders.items,state.filters),state.filters),state.filters),
  notifications: state.notifications,
  filters: state.filters
});


export default connect(mapStateToProps,mapDispatchToProps)(DashboardPage);

