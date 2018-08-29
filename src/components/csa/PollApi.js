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
    this.timer = setInterval(()=> this.pollOrders(), 1000);
    
  };
  pollOrders(){
    this.props.fetchCSAOrders();
  }

  componentWillUnmount() {
    this.timer = null;
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);  

  }
  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {

        clearTimeout(this.timeout);

        // Optionally do something with data

        if (!nextProps.isFetching) {
            this.startPoll();
        }
    }
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
    this.dispatchNotification(error, 500);
    this.dispatchNotification(warning, 750);
    this.dispatchNotification(info, 1000);
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
  notifications: state.notifications 
});


export default connect(mapStateToProps,mapDispatchToProps)(PollApi);

