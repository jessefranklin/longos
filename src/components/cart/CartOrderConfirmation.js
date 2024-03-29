import React from 'react';
import { connect } from "react-redux";
import cartTotal from '../../selectors/cartTotal';
import moment from 'moment';
import CartProgress from './CartProgress';

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
          <p>Order #<strong>{this.props.order.orderId}</strong> has been placed</p>
          <p>We'll see you on <strong>{moment(this.props.order.pickUpDate).format('MMMM Do, YYYY')}</strong> at <strong>{moment().startOf('day').seconds(this.props.order.time).format('h:mm A')}</strong></p>
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


export default connect(mapStateToProps)(CartOrderConfirmation);