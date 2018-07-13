import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import Products from '../components/Products';
import Cart from '../components/Cart';
import Settings from '../components/Settings';
import Order from '../components/CartOrder';
import CartOrderReview from '../components/CartOrderReview';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PublicRoute path="/settings" component={Settings} />
        <PublicRoute path="/dashboard" component={DashboardPage} />
        <PublicRoute path="/products" component={Products} />
        <PublicRoute path="/cart" component={Cart} />
        <PublicRoute path="/orderreview" component={CartOrderReview} />
        <PublicRoute path="/order" component={Order} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
