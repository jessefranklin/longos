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
        <div className="content--container">
            <CartProgress progress="3" />
            <h3>Order# {this.props.order.orderId} has been placed</h3>
            <h4>We'll see you on {moment(this.props.order.pickUpDate).format('MMMM,Do,YYYY')} at {moment().startOf('day').seconds(this.props.order.time).format('h:mm A')}</h4>
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