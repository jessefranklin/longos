import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/orderDashboard">
          <h1>
            <span className="longos-logo-white"></span>
          </h1>
        </Link>
        <Link to="/" className="customer-login">Go to Customer Login</Link>
      </div>
    </div>
  </header>
);

export default Header;