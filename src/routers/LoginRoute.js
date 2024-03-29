import React from 'react';
import { Route } from 'react-router-dom';

export const LoginRoute = ({
  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => (
    <div>
      <div>
        <Component {...props} />
      </div>
    </div>
  )} />
);


export default LoginRoute;
