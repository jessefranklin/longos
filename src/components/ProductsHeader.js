import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { totalCount } from '../selectors/cartTotal';

class Header extends React.Component {
  render() {
    const {cart, profile, total} = this.props;
    const cartLength = cart.length > 0;
    return (
      <header className="header">
        <div className="content-container">
          <div className="header__content">
            <Link className="header__title" to="/">
              <h1>
                <span className="longos-logo"></span>
              </h1>
            </Link>
            
            {profile.username && <div>{profile.username}</div>}

            <div className="cart-container">
              <Link className="button" to="/cart" disabled={cartLength ? '' : 'disabled'}>
                <FontAwesome
                  className='super-crazy-colors'
                  name='shopping-cart'
                  size='2x'
                />
              </Link>
              {cart.length >= 1 && <div className="cart__indicator">{total}</div>}

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
  cart: state.cart,
  total: totalCount(state.cart)
});
  
export default connect(mapStateToProps)(Header);