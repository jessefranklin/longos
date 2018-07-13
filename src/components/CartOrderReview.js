import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import config from '../server/config.json';
import ProductsHeader from '../components/ProductsHeader';
import CartListItem from './CartListItem';
import cartTotal from '../selectors/cartTotal';
import moment from 'moment';
import numeral from 'numeral';
import CartProgress from './CartProgress';
import { Checkbox } from 'react-bootstrap';


class CartOrderReview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    }

    this.handleCheck = this.handleCheck.bind(this);
  }
  componentDidUpdate() {
    if (this.props.cart.length < 1) {
      this.props.history.push('/products');
    }
  }
  onSubmit = (e) => {
    if(!this.state.checked){e.preventDefault(); return; }
    console.log(this.state);
    // this.completeOrder(this.state);
  };
  handleCheck(e) {
    this.setState({checked: !!e.target.checked});
  }
  render() {
    const { profile, cart, cartTotal, order } = this.props;
    const formattedCartTotal = numeral(cartTotal).format('$0,0.00');
    const taxAmount = numeral(cartTotal * (config.tax.tax/100)).format('$0,0.00');
    const totalAmount = numeral(cartTotal + (cartTotal * (config.tax.tax/100))).format('$0,0.00');

    return (
      <div>
        <ProductsHeader />
        <div className="content--container">

          <CartProgress progress="yyy" />

          <h2>Place Order</h2>
          <div className="cart--item">
            {cart.map(product => {
              return <CartListItem key={product.id} item={product} editable="false" />
            })}
          </div>
          <div>
            Total price: {formattedCartTotal}
            {config.tax.name}: {taxAmount}
            Grand Total: {totalAmount}
          </div>
          <div>
            {profile.username}
            {profile.phone}
            {profile.email}
            {moment(order.pickUpDate).format('MMMM,Do,YYYY')}

            {profile.time}

          </div>
          <div>
            <h5>{config.terms.header}</h5>
            <p>{config.terms.body}
            
            {this.state.checked}
            </p>

            <div className="checkbox">
            <label className={this.state.checked?'checked':''} >I accept the terms and conditions.
            <input
              name="terms"
              type="checkbox"
              checked={this.state.checked}
              onChange={this.handleCheck} />
            </label>
            </div>

          </div>

          <Link className="btn" to="/orderconfirmation" onClick={this.onSubmit} disabled={this.state.checked?'':'disabled'} >Submit Order</Link>
          <Link to="/products" className="btn btn-secondary">Cancel</Link>

        </div>
      </div>
    )
  }
}
  
const mapStateToProps = (state) => ({
    profile: state.profile,
    cart: state.cart,
    cartTotal: cartTotal(state.cart),
    order: state.order
});

export default connect(mapStateToProps)(CartOrderReview);