import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { totalCount } from '../../selectors/cartTotal';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    }

    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  handleClick(e) {
    if(this.props.cart.length == 0 || this.props.cart.length == undefined) e.preventDefault();
  }
  toggleMenu(e) {
    e.preventDefault();
    
    this.setState({
      showMenu: true
    });
    document.addEventListener("click", this.closeMenu);
  }
  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render() {
    const {cart, profile, total} = this.props;
    const cartLength = cart.length > 0;
  
    return (
      <header className="header">
        <div className="content-container">
          <div className="header__content">
            <Link className="header__title" to="/">
              <h1>
                <span className="longos-logo-white"></span>
              </h1>
            </Link>

            {!this.props.order.orderId ? <CartHeader profile={profile} showMenu={this.state.showMenu} toggleMenu={this.toggleMenu} handleClick={this.handleClick.bind(this)} cartLength={cartLength} total={total} /> : null }

          </div>
        </div>
      </header>
    )
  }
}

const CartHeader = ({profile,showMenu,toggleMenu,cartLength,handleClick,total}) => {
    const itemWord = total === 1 ? 'item' : 'items' ;
    return (
      <div className="header--row">
        <div className="profile--container">
          <button className="profile--username btn" onClick={toggleMenu}>{profile.username ?  profile.username : "Guest"}</button>
          
          {
            showMenu
              ? (
                <div className="profile--actions" >
                  <ul>
                    <li><Link to="/">My Account</Link></li>
                    <li><Link to="/">Logout</Link></li>
                  </ul>
                </div>
              )
              : (
                null
              )
          }
         
        </div> 
        <div className="cart--container" >
          <Link className="btn" to="/cart" onClick={handleClick} disabled={cartLength?'':'disabled'}>
            <FontAwesome
              className='super-crazy-colors'
              name='shopping-cart'
              size='2x'
            />
          </Link>
          {cartLength >= 1 && <div className="cart__indicator">{total} </div>}
        </div>
        <div className="place-order--container">
          {total >= 1 ? <Link to="/order" className="link--place-order">Place Order</Link> : null }
        </div>
      </div>
    );
};
  
const mapStateToProps = (state) => ({
  profile: state.profile,
  cart: state.cart,
  total: totalCount(state.cart),
  order: state.order
});
  
export default connect(mapStateToProps)(Header);