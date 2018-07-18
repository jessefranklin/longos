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
import { dispatchOrder } from '../actions/order';


const store = config[0];

class CartOrderReview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      agreedTerms: false,
      OrderId: null,
      StoreId: store.store_id,
      StoreZone: store.zone,
      IsPaid: false,
      Customer: {
        CustomerId: this.props.profile.rewards,
        Name: this.props.profile.username,
        PhoneNumber: this.props.profile.phone,
        OtherPhoneNumber: null,
        Email: this.props.profile.email
      },
      PickupDate: null,
      PickupTime: null,
      OrderItems: this.props.cart
    }

    this.handleCheck = this.handleCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidUpdate() {
    if (this.props.cart.length < 1) {
      this.props.history.push('/products');
    }
  }
  onSubmit = (e) => {
    if(!this.state.agreedTerms){e.preventDefault(); return; }
    this.props.dispatchOrder(this.state);
    e.preventDefault();
  };
  handleCheck(e) {
    this.setState({agreedTerms: !!e.target.checked});
  }
  render() {
    const { profile, cart, cartTotal, order } = this.props;
    const formattedCartTotal = numeral(cartTotal).format('$0,0.00');
    const taxAmount = numeral(cartTotal * (store.tax.tax/100)).format('$0,0.00');
    const totalAmount = numeral(cartTotal + (cartTotal * (store.tax.tax/100))).format('$0,0.00');
    const time = moment().startOf('day').seconds(order.time).format('h:mm A');

    return (
      <div>
        <ProductsHeader />
        <div className="content--container">

          <CartProgress progress="1" />

          <h2>Place Order</h2>
          <div className="cart--item">
            {cart.map(product => {
              return <CartListItem key={product.id} item={product} editable="false" />
            })}
          </div>
          <div>
            Total price: {formattedCartTotal}
            {store.tax.name}: {taxAmount}
            Grand Total: {totalAmount}
          </div>
          <div>
            {profile.username}
            {profile.phone}
            {profile.email}
            {moment(order.pickUpDate).format('MMMM,Do,YYYY')}
            <br />
            {time}
            <br />

            {profile.time}

            at {store.location.address} {store.location.city}

          </div>
          <div>
            <h5>{store.terms.header}</h5>
            <p>{store.terms.body}
            
            </p>

            <div className="checkbox">
            <label className={this.state.agreedTerms?'checked':''} >I accept the terms and conditions.
            <input
              name="terms"
              type="checkbox"
              checked={this.state.checked}
              onChange={this.handleCheck} />
            </label>
            </div>

          </div>

          <Link className="btn" to="/orderconfirmation" onClick={this.onSubmit} disabled={this.state.agreedTerms?'':'disabled'} >Submit Order</Link>
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

const mapDispatchToProps = (dispatch) => ({
  dispatchOrder:(order) => dispatch(dispatchOrder(order))
});

export default connect(mapStateToProps,mapDispatchToProps)(CartOrderReview);