import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../../actions/csa/auth';

export const Footer = ({ startLogout }) => (
  <footer className="footer">
        <button className="btn btn-qua" onClick={startLogout}>Logout</button>
        <Link to="/settings">Settings</Link>
        <Link to="/" className="customer-login">Go to Customer Login</Link>
  </footer>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});


export default connect(undefined,mapDispatchToProps)(Footer);