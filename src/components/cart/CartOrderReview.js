import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { dispatchOrder } from '../../actions/order';
import config from '../../server/config.json';
import cartTotal from '../../selectors/cartTotal';
import moment from 'moment';
import numeral from 'numeral';
import CartListItem from './CartListItem';
import CartProgress from './CartProgress';
import { Checkbox } from 'react-bootstrap';


const store = config[0];

class CartOrderReview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
      pickUpDate: moment(this.props.order.pickUpDate).format('MMMM,Do,YYYY'),
      pickUpTime: this.props.order.time,
      orderItems: this.props.cart
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
  render() {
    const { profile, cart, cartTotal, order } = this.props;
    const formattedCartTotal = numeral(cartTotal).format('$0,0.00');
    const taxAmount = numeral(cartTotal * (store.tax.tax/100)).format('$0,0.00');
    const totalAmount = numeral(cartTotal + (cartTotal * (store.tax.tax/100))).format('$0,0.00');
    const time = moment().startOf('day').seconds(order.time).format('h:mm A');

    return (
      <div>

        <CartProgress progress="2" />

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