import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { dispatchOrder } from '../../actions/order';
import cartTotal from '../../selectors/cartTotal';
import moment from 'moment';
import numeral from 'numeral';
import CartListItem from './CartListItem';
import CartProgress from './CartProgress';
import { TOC } from '../TermsAndConditions';

import { Checkbox } from 'react-bootstrap';

import config from '../../server/config.json';

let store = config[0];

class CartOrderReview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTerms: false,
      agreedTerms: false,
      orderId: null,
      storeId: store.store_id,
      storeZone: store.zone,
      isPaid: false,
      customer: {
        customerId: this.props.profile.rewards,
        name: this.props.profile.username,
        phoneNumber: this.props.profile.phone,
        otherPhoneNumber: null,
        email: this.props.profile.email
      },
      pickUpDate: moment(this.props.order.pickUpDate).format('YYYY-MM-DD'),
      pickUpTime: moment(this.props.order.time).format('hh:mm:ss'),
      orderItems: this.props.cart
    }

    this.handleCheck = this.handleCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }
  componentDidMount() {
    if(this.props.settings.store){
      store = this.props.settings.store
    }
  }
  componentDidUpdate() {
    if (this.props.cart.length < 1) {
      this.props.history.push('/products');
    }
  }
  onSubmit = (e) => {
    if(!this.state.agreedTerms){e.preventDefault(); return; }
    this.props.dispatchOrder(this.state).then(() => {
      if(this.props.order.orderId){
        this.props.history.push('/orderConfirmation');
      }
    })
    e.preventDefault();
  };
  handleCheck(e) {
    this.setState({agreedTerms: !!e.target.checked});
  }
  handleClose = () =>{
    this.setState({showTerms: false}, () => {
      // document.removeEventListener('click', this.handleClose);
    });
  }
  onShowTerms =() =>{
    this.setState({showTerms: true});
    // document.addEventListener("click", this.handleClose);
  }
  render() {
    const { profile, cart, cartTotal, order } = this.props;
    const formattedCartTotal = numeral(cartTotal).format('$0,0.00');
    const taxAmount = numeral(cartTotal * (store.tax.tax/100)).format('$0,0.00');
    const totalAmount = numeral(cartTotal + (cartTotal * (store.tax.tax/100))).format('$0,0.00');
    const time = moment().startOf('day').seconds(order.time).format('h:mm A');

    return (
      <div>

        <CartProgress progress="2" />

        <div className="cart--col-names cart--col-alt">
          <h4 className="cart--col-item grey-border">Item</h4>
          <h4 className="cart--col-qty grey-border">Qty</h4>
          <h4 className="cart--col-price grey-border">Price</h4>
          <h4 className="cart--col-remove">Remove</h4>
        </div>

        <h2 className="checkout--title">Place Order</h2>
        <div className="cart--items">
          {cart.map(product => {
            return <CartListItem key={product.id} item={product} editable="false" />
          })}
        </div>
        <h2 className="checkout--title">Confirm Order Information</h2>
        <div className="checkout--info">
          <strong>{profile.username}</strong>
          <div>
            <span>
              <strong>Phone</strong><br />
              {profile.phone}
            </span>
            <span>
              <strong>Email</strong><br />
              {profile.email != 0 ? profile.email : 'N/A' }
            </span>
            <span>
              <strong>Pickup Date</strong><br />
              {moment(order.pickUpDate).format('MMMM,Do,YYYY')}
            </span>
            <span>
              <strong>Pickup Time</strong><br />
              {time}
              {profile.time}
            </span>
            <span>
              at {store.location.address} {store.location.city}
            </span>
          </div>
        </div>
        <div className="checkout--terms">
          <h5>{store.terms.header}</h5>
          <p>{store.terms.body}</p>
          <button onClick={this.onShowTerms}>Show Terms</button>
        </div>
        <div>
          <div className="checkbox checkbox-fullwidth">
          <label className={this.state.agreedTerms?'checked':''} >I accept the terms and conditions.
          <input
            name="terms"
            type="checkbox"
            checked={this.state.checked}
            onChange={this.handleCheck} />
          </label>
          </div>

        </div>
        <div className="checkout--submit">
          {/* Total price: {formattedCartTotal}
          {store.tax.name}: {taxAmount} */}
          <span>Grand Total: {totalAmount}</span>
          <Link className="btn" to="/orderconfirmation" onClick={this.onSubmit} disabled={this.state.agreedTerms?'':'disabled'} >Submit Order</Link>
          <Link to="/products" className="btn btn-secondary">Cancel</Link>
        </div>
        <TOC showTerms={this.state.showTerms} handleClose={this.handleClose} />
      </div>
    )
  }
}
  
const mapStateToProps = (state) => ({
    settings: state.settings,
    profile: state.profile,
    cart: state.cart,
    cartTotal: cartTotal(state.cart),
    order: state.order
});

const mapDispatchToProps = (dispatch) => ({
  dispatchOrder:(order) => dispatch(dispatchOrder(order))
});

export default connect(mapStateToProps,mapDispatchToProps)(CartOrderReview);