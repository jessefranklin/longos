import React, {Component} from 'react';
import { connect } from 'react-redux';
let axios = require('axios');
import { Link } from 'react-router-dom';
import OrderCounterFilters from './OrderCounterFilters';
import Select from 'react-select';
import OrderDetailItem from './OrderDetailItem';
import { orderFilterByCounter } from '../../selectors/orders';
const headers = {
    header: {
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin": "*"
    }
}

const orderAPI = 'http://digitalpreorder.azurewebsites.net/api/order';

const options = [
  { value: 0, label: 'Not ready' },
  { value: 1, label: 'Ready For Pickup' },
  { value: 2, label: 'Order Has been picked up' }
]


class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:0,
      counter: '',
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
  }
  componentWillMount() {
    const orderID = `?orderId=${this.props.match.params.id}`;
    
    let url = orderAPI + orderID;
    
    axios.get(url, headers).then(
        (response) => {
            this.setState(response.data);
        },
        (err) => {
            console.log(err);
        }
    )
  };
  onSelectChange = (value) => {
    this.setState({ 'status' : value });
  }
  handleCounter = (value) => {
    this.setState({ 'counter' : value });
    let itemsFiltered = orderFilterByCounter(this.state.items,value);
    let status = event.target.value
    this.setState({
        filtered: status !== ' ' ? true : false,
        visible: itemsFiltered
    })
  };
  render() {

    let itemsFiltered = this.state.items;
    if (this.state.filtered) {
      itemsFiltered = this.state.visible
    }

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

        <Select
          name="status"
          value={this.state.status}
          onChange={(e)=>this.onSelectChange(e.value)}
          options={options}
          clearable={false} 
        />

        {this.state.isPaid && 'order is paid for'}
        {!this.state.isPaid && 'order is not paid for'}

        <OrderCounterFilters handleCounter={this.handleCounter} counterActive={this.state.counter} />
        
        {itemsFiltered.map(order => {
          return <OrderDetailItem key={order.id} order={order} />;
        })}

      </div>
    );
  }
}

export default OrderDetail;