import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { totalCount } from '../selectors/cartTotal';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick(e) {
    if(this.props.cart.length == 0 || this.props.cart.length == undefined) e.preventDefault();
  }
  render() {
    const {cart, profile, total} = this.props;
    const cartLength = cart.length > 0;
    const itemWord = total === 1 ? 'item' : 'items' ;

    return (
      <header className="header">
        <div className="content-container">
          <div className="header__content">
            <Link className="header__title" to="/">
              <h1>
                <span className="longos-logo"></span>
              </h1>
            </Link>
            
            {profile.username && <div>
              {profile.username}
                <Link to="/">Logout</Link>
            </div>}


            <div className="cart-container">

              <Link className="btn" to="/cart" onClick={this.handleClick.bind(this)} disabled={cartLength?'':'disabled'}>
                <FontAwesome
                  className='super-crazy-colors'
                  name='shopping-cart'
                  size='2x'
                />
              </Link>

              {cart.length >= 1 && <div className="cart__indicator">{total} {itemWord}</div>}

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