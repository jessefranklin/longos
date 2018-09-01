import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import DashboardPage from '../components/csa/DashboardPage';
import Settings from '../components/csa/Settings';
import PastOrders from '../components/csa/PastOrders';
import EditOrder from '../components/csa/EditOrder';

import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import LoginRoute from './LoginRoute';
import OrderDetail from  '../components/csa/OrderDetail';
import CSALogin from '../components/csa/CSALogin';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <LoginRoute exact path="/" component={LoginPage} />
        <Route path='/products' component={PublicRoute} />
        <LoginRoute path="/CSALogin" component={CSALogin} />
        <Route path='/orderDashboard' component={CSADashboard} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);



const CSADashboard = ({match}) => {
  return(
    <Switch>
      <PrivateRoute exact path={match.url} component={DashboardPage} />
      <PrivateRoute exact path={match.url+'/pastOrders'} component={PastOrders} />
      <PrivateRoute exact path={match.url+'/orderDetail/:id'} component={OrderDetail} />
      <PrivateRoute exact path={match.url+'/EditOrder'} component={EditOrder} />
      <PrivateRoute exact path={match.url+'/settings'} component={Settings} />
    </Switch>
  );
};

export default AppRouter;
