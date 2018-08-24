import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
    isAuthenticated, 
    component: Component,
    ...rest
  }) => (
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <div className="csa--app">
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/CSALogin" />
      )
    )} />
  );


const mapStateToProps = (state) => ({
  isAuthenticated: true
});

export default connect(mapStateToProps)(PrivateRoute);
