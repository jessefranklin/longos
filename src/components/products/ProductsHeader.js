import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { totalCount } from '../../selectors/cartTotal';

class Header extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  } 
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
  componentWillUnmount() {
    document.removeEventListener('click', this.closeMenu);
  }
  render() {
    const {cart, profile, total} = this.props;
    const cartLength = cart.length > 0;
  
    return (
      <header className="header">
        <div className="content-container">
          <div className="header__content">
            {!this.props.editOrder ? (
              <Link className="header__title" to="/">
                <h1>
                  <span className="longos-logo-white"></span>
                </h1>
              </Link>
            ) : (
              <div className="header__title">
                <h1>
                  <span className="longos-logo-white"></span>
                </h1>
              </div>
            )}
            
            
            {!this.props.editOrder ? 
              !this.props.order.orderId ? (
                <CartHeader profile={profile} showMenu={this.state.showMenu} toggleMenu={this.toggleMenu} handleClick={this.handleClick.bind(this)} cartLength={cartLength} total={total} />
              ) : ''
              : <EditOrderHeader context={this.context} /> }

          </div>
        </div>

      </header>
    )
  }
}

const EditOrderHeader = ({context}) => {
  return (
    <div className="header--row">
      
         <button className="btn-link  customer-logout" onClick={context.router.history.goBack}>Back to Order Detail</button>
     
    </div>
  );
};

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
          <Link className="btn btn-cart" to="/products/cart" onClick={handleClick} disabled={cartLength?'':'disabled'}>
            <FontAwesome
              className='super-crazy-colors'
              name='shopping-cart'
              size='2x'
            />
            {cartLength >= 1 && <div className="cart__indicator">{total} </div>}
          </Link>
        </div>
        <div className="place-order--container">
          {total >= 1 ? <Link to="/products/order" className="link--place-order">Place Order</Link> : <p className="empty--place-order">Cart Empty</p> }
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