import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import NotFoundPage from '../components/shared/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PublicRoute from './PublicRoute';
import LoginRoute from './LoginRoute';
import CSALogin from '../components/csa/CSALogin';
import CSADashboard from './CSADashboard';
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

export default AppRouter;
