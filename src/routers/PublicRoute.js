import React from 'react';
import { Route } from 'react-router-dom';
import ProductsHeader from '../components/products/ProductsHeader';

export const PublicRoute = ({
  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => (
    <div className="customer--app">
      <ProductsHeader />
      <div className="content--container">
        <Component {...props} />
      </div>
    </div>
  )} />
);


export default PublicRoute;
