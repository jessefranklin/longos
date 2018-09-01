import React from 'react';
import { Route, Switch} from 'react-router-dom';
import ProductsHeader from '../components/products/ProductsHeader';
import Products from '../components/products/Products';
import Cart from '../components/cart/Cart';
import Order from '../components/cart/CartOrder';
import OrderConfirmation from '../components/cart/CartOrderConfirmation';
import CartOrderReview from '../components/cart/CartOrderReview';
import Idle from '../components/Idle';

export const PublicRoute = ({match}) => {
  return(
    <div className="customer--app">
      <ProductsHeader />
      <div className="content--container">
        <Switch>
          <Route exact path={match.url} component={Products} />
          <Route exact path={match.url+'/cart'} component={Cart} />
          <Route exact path={match.url+'/order'} component={Order} />
          <Route exact path={match.url+'/orderreview'} component={CartOrderReview} />
          <Route exact path={match.url+'/orderConfirmation'} component={OrderConfirmation} />
        </Switch>
      </div>
      <Idle />
    </div>
  );
};

export default PublicRoute;
