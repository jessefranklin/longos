import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/csa/DashboardPage';
import Products from '../components/products/Products';
import Settings from '../components/csa/Settings';
import Cart from '../components/cart/Cart';
import Order from '../components/cart/CartOrder';
import OrderConfirmation from '../components/cart/CartOrderConfirmation';
import CartOrderReview from '../components/cart/CartOrderReview';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import LoginRoute from './LoginRoute';
import OrderDetail from  '../components/csa/OrderDetail';


export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <LoginRoute path="/" component={LoginPage} exact={true} />
        <PublicRoute path="/settings" component={Settings} />
        <PublicRoute path="/products" component={Products} />
        <PublicRoute path="/cart" component={Cart} />
        <PublicRoute path="/orderreview" component={CartOrderReview} />
        <PublicRoute path="/order" component={Order} />
        <PublicRoute path="/orderConfirmation" component={OrderConfirmation} />
        <PrivateRoute path="/orderDashboard" component={DashboardPage} />
        <PrivateRoute path="/orderDetail/:id" component={OrderDetail} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
