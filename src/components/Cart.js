import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import CartListItem from './CartListItem';
import ProductsHeader from '../components/ProductsHeader';
import cartTotal from '../selectors/cartTotal';
import numeral from 'numeral';

class Cart extends React.Component {
  render() {
    const { cart, cartTotal } = this.props;
    const formattedCartTotal = numeral(cartTotal).format('$0,0.00');
    const itemWord = cart.length === 1 ? 'item' : 'items' ;

    return (
      <div>
        <ProductsHeader />
        <div className="content--container">
          <h2>Shopping Cart ({cart.length} {itemWord})</h2>
          <div className="cart--item">
            {cart.map(product => {
              return <CartListItem key={product.id} item={product} editable="true" />;
            })}
          </div>
          <div>
          Total price: {formattedCartTotal}
          </div>
          <Link to="/order" className="btn">Place Order</Link>
          <Link to="/products" className="btn btn-secondary">Back To Order Form</Link>
        </div>
      </div>
    )
  }
}
  
const mapStateToProps = (state) => ({
  cart: state.cart,
  cartTotal: cartTotal(state.cart)
});
  
export default connect(mapStateToProps)(Cart);