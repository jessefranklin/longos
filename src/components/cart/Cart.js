import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import CartListItem from './CartListItem';
import cartTotal from '../../selectors/cartTotal';
import numeral from 'numeral';
import { totalCount } from '../../selectors/cartTotal';
import Announcements from '../Announcements';

class Cart extends React.Component {
  componentDidUpdate() {
    if (this.props.cart.length < 1) {
      this.props.history.push('/products');
    }
  }
  componentWillMount() {
    document.title = 'Checkout';
    this.setState({ announcementMessage: `Checkout: ${this.props.cart.length}`} );
  }
  render() {
    const { cart, cartTotal, total } = this.props;
    const formattedCartTotal = numeral(cartTotal).format('$0,0.00');
    const itemWord = total === 1 ? 'item' : 'items' ;

    return (
      <div ref={(contentContainer) => { this.contentContainer = contentContainer; }} tabIndex="-1" aria-labelledby="pageHeading">
        <Announcements message={this.state.announcementMessage} />
        <div className="cart--header">
          <h2>Shopping Cart ({total} {itemWord})</h2> 
          <Link to="/products" className="link--continue-shopping">Continue Shopping</Link>
        </div>

        <div className="cart--col-names">
          <h4 className="cart--col-item grey-border">Item</h4>
          <h4 className="cart--col-qty grey-border">Qty</h4>
          <h4 className="cart--col-price grey-border">Price</h4>
          <h4 className="cart--col-remove">Remove</h4>
        </div>

        <div className="cart--items">
          {cart.map(product => {
            return <CartListItem key={product.id} item={product} editable="true" cartLength={cart.length} />;
          })}
        </div>
        <div className="cart--summary">
          <span>
            Total price: {formattedCartTotal}
          </span>
          <Link to="/order" className="btn">Place Order</Link>
        </div>
      </div>
    )
  }
}
  
const mapStateToProps = (state) => ({
  cart: state.cart,
  cartTotal: cartTotal(state.cart),
  total: totalCount(state.cart)
});
  
export default connect(mapStateToProps)(Cart);