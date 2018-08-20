import React from 'react';
import { Route } from 'react-router-dom';
import ProductsHeader from '../components/products/ProductsHeader';
import HOC from '../components/HOC';

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
      <HOC />
    </div>
  )} />
);


export default PublicRoute;
