import React, {Component} from 'react';
import { connect } from 'react-redux';
let axios = require('axios');
import { Link } from 'react-router-dom';
import OrderCounterFilters from './OrderCounterFilters';
import Select from 'react-select';
import PropTypes from "prop-types";
import OrderDetailItem from './OrderDetailItem';
import { orderFilterByCounter } from '../../selectors/orders';
import CSAHeader from './CSAHeader';


const headers = {
    header: {
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin": "*"
    }
}

const orderAPI = 'http://digitalpreorder.azurewebsites.net/api/order';

const options = [
  { value: 1, label: 'Ready For Pickup' },
  { value: 2, label: 'Order Has been picked up' }
]

class OrderDetail extends Component {
  static contextTypes = {
    router: PropTypes.object
  } 

  constructor(props) {
    super(props);
    this.state = {
      id:0,
      counter: this.props.filters.counter,
      client: {
        name: '',
        email: '',
        phone: '',
        tyrNumber: ''
      },
      pickupDate: '',
      pickupTime: '',
      status: '',
      isPaid: false,
      items: []
    }
    this.orderPaid = this.orderPaid.bind(this);
  }
  componentWillMount() {
    const orderID = `?orderId=${this.props.match.params.id}`;
    
    let url = orderAPI + orderID;
    
    axios.get(url, headers).then(
        (response) => {
            this.setState(response.data);
            if(this.state.counter != ''){
              this.handleCounter(this.state.counter);
            }
        },
        (err) => {
            console.log(err);
        }
    )
  };
  onSelectChange = (value) => {
    this.setState({ 'status' : value });
    
    if(value == 2){
      this.completeOrder(value)
    }
  }
  completeOrder(value){
    let url = orderAPI +`/${this.props.match.params.id}/setstatus?status=${value}`
    axios.put(url, headers).then(
      (response) => {
        console.log('completed');
      },
      (err) => {
        console.log(err);
      }
    )
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
  updateState = (data) => {
    this.setState(data);
  }
  orderPaid = (data) => {
    let url = orderAPI +`/${this.props.match.params.id}/setPaid?paid=${data}`;

    axios.put(url, headers).then(
      (response) => {
        this.setState(response.data);
      },
      (err) => {
        console.log(err);
      }
    )
  }
  render() {

    let itemsFiltered = this.state.items;

    if (this.state.filtered) {
      itemsFiltered = this.state.visible
    }

    return (
      <div>
        <CSAHeader />
        <div className="content--container">
          <div className="order-detail">
          <button className="link--go-back" onClick={this.context.router.history.goBack}>Back to orders</button>
          <div className="order-detail--header">
            <div className="">
              <h4>Order #</h4><h2>{this.state.id}</h2>
              <PaidButton isPaid={this.state.isPaid} orderPaid={this.orderPaid} />
            </div>

            <div className="">
              <h4>Customer</h4>
              {this.state.client.name}<br />

              {this.state.client.email && this.state.client.email}<br />
              {this.state.client.phone && this.state.client.phone}
            </div>

            <div className="">
              <h4>Pickup Date & Time</h4>
              {this.state.pickupDate} @ {this.state.pickupTime}

              <h4>Status</h4> 
             

              <StatusState status={this.state.status} onSelectChange={this.onSelectChange} isPaid={this.state.isPaid} />
            </div>
          </div>

          <OrderCounterFilters handleCounter={this.handleCounter} counterActive={this.state.counter} />
          
          <div className="order-items--header">
            <div className="col-item grey-border">
              <h4>Item</h4>
            </div>
            <div className="col-qty grey-border">
              <h4>Qty</h4>
            </div>
            <div className="col-assign grey-border">
              <h4>Assigned To</h4>
            </div>
            <div className="col-status grey-border">
              <h4>Status</h4>
            </div>
            <div className="col-barcode">
              <h4>Barcode</h4>
            </div>
          </div>
          <div className="order--items">
            {itemsFiltered.map(order => {
              return <OrderDetailItem key={order.id} order={order} oid={this.state.id} updateState={this.updateState} />;
            })}
          </div>
        </div>
      </div>
    </div>
    );
  }
}

const StatusState = ({status,onSelectChange,isPaid}) => {
  return (
    <div>
        {status === 0 && <div className="state--not-ready">Not Ready</div> }
        {status === 1 && !isPaid && <div className="state--not-ready">Ready for pickup</div> }
        {status === 1 && isPaid && <Select
          name="status"
          value={status}
          onChange={(e)=>onSelectChange(e.value)}
          options={options}
          disabled={status === 0 ? true:false}
          clearable={false} 
        /> }
        {status === 2 && <div className="state--completed">Completed</div> }
    </div>
  );
};


const PaidButton = ({isPaid,orderPaid}) => {
  return (
    <div className="btn--container">
      {isPaid ? ( 
        <div>
          <button className="checked" onClick={() => orderPaid(false)}>Order is Paid </button>
        </div>
      ):(
        <button onClick={() => orderPaid(true)}>Order is not paid</button>
      )}
    </div>
  );
};


const mapStateToProps = (state) => ({
  filters: state.filters
});


export default connect(mapStateToProps)(OrderDetail);
