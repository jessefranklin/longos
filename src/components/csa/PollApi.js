import React from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";

import { fetchCSAOrders }  from '../../actions/csa/orders';
import uuid from 'uuid/v1';
import Notifications, { success, error, warning, info, removeAll } from 'react-notification-system-redux';

class PollApi extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    // this.timer = setInterval(()=> this.pollOrders(), 100000);
    this.pollOrders();
  };

  pollOrders(){
    this.props.fetchCSAOrders();
  }
  componentWillUnmount() {
    this.timer = null;
  }
  
  componentWillReceiveProps(prevProps,nextProps) {
    console.log(prevProps);
    console.log(nextProps);
    console.log(this.props.orders !== prevProps.orders)
    console.log(this.props.orders)
    // if (this.props.data !== nextProps.data) {

    //     clearTimeout(this.timeout);

    //     // Optionally do something with data

    //     if (!nextProps.isFetching) {
    //         this.startPoll();
    //     }
    // }
  }
  render(){
    return(<div>
      </div>);

  }
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
    this.context.store.dispatch(fn(notificationOpts));
  }

  sampleNotification() {
    this.dispatchNotification(success, 250);
 
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
  notifications: state.notifications,
  orders: state.orders
});


export default connect(mapStateToProps,mapDispatchToProps)(PollApi);

