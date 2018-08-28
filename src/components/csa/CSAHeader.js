import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../../actions/csa/auth';

export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/orderDashboard">
          <h1>
            <span className="longos-logo-white"></span>
          </h1>
        </Link>
        <div className="">
          <button className="btn-link  customer-logout" onClick={startLogout}>Logout</button>
          <Link to="/" className="customer-login">Customer Login</Link>
        </div>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});


export default connect(undefined,mapDispatchToProps)(Header);