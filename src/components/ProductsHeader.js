import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import longos from '../../public/images/longos.svg'; 

class Header extends React.Component {
  render() {
    const {cart, profile } = this.props;
    
    return (
      <header className="header">
        <div className="content-container">
          <div className="header__content">
            <Link className="header__title" to="/">
              <h1>
                Longos Catering 
                <span className="longos-logo"></span>
              </h1>
            </Link>
            
            {profile.username && <div>{profile.username}</div>}

            <div className="cart-container">
              <Link className="button" to="/cart">
                <FontAwesome
                  className='super-crazy-colors'
                  name='shopping-cart'
                  size='2x'
                />
              </Link>
              {cart.length >= 1 && <div className="cart__indicator">{cart.length}</div>}

            </div>
            <Link to="/order">Place Order</Link>
            
          </div>
        </div>
      </header>
    )
  }
}
  
const mapStateToProps = (state) => ({
  profile: state.profile,
  cart: state.cart
});
  
export default connect(mapStateToProps)(Header);