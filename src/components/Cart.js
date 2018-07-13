import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import CartListItem from './CartListItem';
import ProductsHeader from '../components/ProductsHeader';
import cartTotal from '../selectors/cartTotal';
import numeral from 'numeral';
import { totalCount } from '../selectors/cartTotal';

class Cart extends React.Component {
  componentDidUpdate() {
    if (this.props.cart.length < 1) {
      this.props.history.push('/products');
    }
  }
  render() {
    const { cart, cartTotal, total } = this.props;
    const formattedCartTotal = numeral(cartTotal).format('$0,0.00');
    const itemWord = total === 1 ? 'item' : 'items' ;

    return (
      <div>
        <ProductsHeader />
        <div className="content--container">
          <h2>Shopping Cart ({total} {itemWord})</h2>
          <div className="cart--item">
            {cart.map(product => {
              return <CartListItem key={product.id} item={product} editable="true" cartLength={cart.length} />;
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
  cartTotal: cartTotal(state.cart),
  total: totalCount(state.cart)
});
  
export default connect(mapStateToProps)(Cart);