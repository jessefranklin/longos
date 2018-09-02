import React from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { Router, Route, Switch } from 'react-router-dom';

import DashboardPage from '../components/csa/DashboardPage';
import OrderDetail from  '../components/csa/OrderDetail';
import Settings from '../components/csa/Settings';
import PastOrders from '../components/csa/PastOrders';
import EditOrder from '../components/csa/EditOrder';
import PrivateRoute from './PrivateRoute';

import CSAHeader from '../components/csa/CSAHeader';
import CSAFooter from '../components/csa/CSAFooter';

import Notifications, { success, error, warning, info, removeAll } from 'react-notification-system-redux';
import PollApi from '../server/PollApi';
import uuid from 'uuid/v1';


class CSADashboard extends React.Component {
  constructor(props) {
    super(props);
    this.sampleNotification = this.sampleNotification.bind(this);

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

  render(){
    const {notifications, match } = this.props;
    return(
      <div className="csa--app">
        <CSAHeader />

        <Switch>
          <PrivateRoute exact path={match.url} component={DashboardPage} />
          <PrivateRoute exact path={match.url+'/pastOrders'} component={PastOrders} />
          <PrivateRoute exact path={match.url+'/orderDetail/:id'} component={OrderDetail} />
          <PrivateRoute exact path={match.url+'/EditOrder'} component={EditOrder} />
          <PrivateRoute exact path={match.url+'/settings'} component={Settings} />
        </Switch>

        <CSAFooter />
        <button className="temp-sample" onClick={this.sampleNotification}>Add sample Notification</button>

        <Notifications notifications={notifications} />        
        <PollApi />
      </div>
    );
  }
};


CSADashboard.contextTypes = {
  store: PropTypes.object
};

CSADashboard.propTypes = {
  notifications: PropTypes.array
};

const mapStateToProps = state => ({
  notifications: state.notifications,
  filters: state.filters
});


export default connect(mapStateToProps)(CSADashboard);

