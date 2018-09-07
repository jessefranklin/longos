import React from 'react';
import { connect } from "react-redux";
import { cartTotal } from '../../selectors/cartTotal';
import moment from 'moment';
import CartProgress from './CartProgress';
import CustomerFeedback from './CustomerFeedback';


class CartOrderConfirmation extends React.Component {
  componentDidMount() {
    history.pushState(null, null, location.href);
    window.onpopstate = function(event) {
        history.go(1);
    };
  }
  render() {
    return (
      <div>

        <CartProgress progress="3" />
        <div className="checkout--confirmation">
          <div className="checkout--confirmed"><i className="fas fa-check"></i></div>
          <p className="confirm-text">Thanks for your order.</p>
          <p>Order #<strong>{this.props.order.orderId}</strong> has been placed</p>
          <p>We'll see you on <strong>{moment(this.props.order.pickUpDate).format('MMMM Do, YYYY')}</strong> at <strong>{moment().startOf('day').seconds(this.props.order.time).format('h:mm A')}</strong></p>
          <p className="confirm-note">Note: If you decide to edit or cancel your order please call the store at: <strong>{this.props.settings.store.phoneNo}</strong></p>
        </div>
        <CustomerFeedback />
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
    profile: state.profile,
    cart: state.cart,
    cartTotal: cartTotal(state.cart),
    order: state.order,
    settings: state.settings
});


export default connect(mapStateToProps)(CartOrderConfirmation);
