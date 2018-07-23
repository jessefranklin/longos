import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      <div>
        <Component {...props} />
      </div>
    )} />
  );


export default PrivateRoute;
