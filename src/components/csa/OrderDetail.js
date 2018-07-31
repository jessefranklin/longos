import React, {Component} from 'react';
import { connect } from 'react-redux';
let axios = require('axios');
import { Link } from 'react-router-dom';
import OrdersCountersFilters from './OrdersCountersFilters';
import OrderDetailItem from './OrderDetailItem';

const headers = {
    header: {
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin": "*"
    }
}

const orderAPI = 'http://digitalpreorder.azurewebsites.net/api/order';

class OrderDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      id:0,
      client: {
        name: '',
        email: '',
        phone: '',
        tyrNumber: ''
      },
      pickupDate: '',
      pickupTime: '',
      status: 0,
      items: []
    }
    const orderID = `?orderId=${this.props.match.params.id}`;
    
    let url = orderAPI + orderID;
    
    axios.get(url, headers).then(
        (response) => {
            console.log(response.data);
            this.setState(response.data);
        },
        (err) => {
            console.log(err);
        }
    )
  }
  componentWillMount() {
  };
  render() {
    return (
      <div>
        <Link to="../orderDashboard">Back to orders</Link>
        Order # {this.state.id}
        Customer {this.state.client.name}
        {this.state.client.email && this.state.client.email}
        {this.state.client.phone && this.state.client.phone}

        Pickup Date & Time
        {this.state.pickupDate} @ {this.state.pickupTime}
        Status {this.state.status}
        {this.state.isPaid && 'order is paid for'}
        {!this.state.isPaid && 'order is not paid for'}
        <OrdersCountersFilters />
        
        {this.state.items.map(order => {
          return <OrderDetailItem key={order.id} order={order} />;
        })}


      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateOrder: (order) => dispatch(updateOrder(order))
});

export default connect(undefined, mapDispatchToProps)(OrderDetail);