import React from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { history } from '../routers/AppRouter';
import { fetchCSAOrders }  from '../actions/csa/orders';
import moment from 'moment';
import uuid from 'uuid/v1';
import { baseUrl, headers } from "../const/global";
import axios from 'axios';

import Notifications, { success, error, warning, info, removeAll } from 'react-notification-system-redux';

const pollUrl = baseUrl+'/order';

class PollApi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pollActive : true
    }
  }

  componentDidMount() {
    if(this.state.pollActive){
      // this.pollOrders();
      // Set interval for every 30 mins
      this.timer = setInterval(()=> this.pollOrders(), 1000 * 60 * 30);
    }
  };

  pollOrders(){
    // GET order/activesince?storeId=store1&sinceDate=2018-09-03&sinceTime=14:05:00&counter=Kitchen
    const storeId = this.props.settings? this.props.settings.store.store_id: 'store1';
    let store = `?storeId=${storeId}`;
    let sinceDate = `&sinceDate=${moment().format('YYYY-MM-DD')}`;
    let sinceTime = `&sinceTime=${moment(moment()).subtract(30, "minutes").format('hh:mm:ss')}`;
    let counter = this.props.filters.counter ? `&counter=${this.props.filters.counter}` : '';
    let url = pollUrl+`/activesince${store}${sinceDate}${sinceTime}${counter}`;

    axios.get(url, headers).then(
      (response) => {
        this.formatNotification(response.data);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  formatNotification(notifications){
    {notifications.map(notification => {
      this.context.store.dispatch(success({
        uid: uuid(),
        title: 'A new order has been placed',
        message: `Pickup: ${moment(notification.pickupDate, 'YYYY MM DD').format('MMM. D')} @ ${moment(notification.pickupTime,'hh:mm:ss').format('h:mm a')}`,
        position: 'tr',
        autoDismiss: 0,
        action: {
          label: `Assign Order ${notification.id}`,
          callback: () => {
            history.push(`/orderDashboard/orderDetail/${notification.id}`);
          }
        }
      }));
    })}
  }

  componentWillUnmount() {
    this.timer = null;
  }

  render(){
    return(<div></div>);
  }
}

PollApi.contextTypes = {
  store: PropTypes.object
};

PollApi.propTypes = {
  notifications: PropTypes.array
};

const mapDispatchToProps = (dispatch) => ({
  fetchCSAOrders: () => dispatch(fetchCSAOrders())
});

const mapStateToProps = state => ({
  settings: state.settings,
  notifications: state.notifications,
  filters: state.filters,
  orders: state.orders
});


export default connect(mapStateToProps,mapDispatchToProps)(PollApi);

