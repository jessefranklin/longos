import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderCounterFilters from './OrderCounterFilters';
import Select from 'react-select';
import {Button, Modal} from 'react-bootstrap';
import PropTypes from "prop-types";
import OrderDetailItem from './OrderDetailItem';
import { fetchCSAOrder, updateCSAOrder } from '../../actions/csa/csaOrder';
import { orderFilterByCounter } from '../../selectors/orders';
import { CSACart } from '../../actions/cart';
import CSAHeader from './CSAHeader';
import groupByCounter from '../../selectors/groupByCounter';

import { baseUrl, headers } from "../../const/global";
let axios = require('axios');

const orderAPI = baseUrl+'/order';
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
      isPaid: this.props.csaOrder.isPaid,
      items: [],
      show: false
    }
    this.orderPaid = this.orderPaid.bind(this);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillMount() {
    this.props.fetchCSAOrder(this.props.match.params.id);
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
        this.props.fetchCSAOrder(this.props.match.params.id);
      },
      (err) => {
        console.log(err);
      }
    )
  }
  handleCounter = (value) => {
    this.setState({ 'counter' : value });

  };
  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }
  updateState = () => {
    this.props.fetchCSAOrder(this.props.match.params.id);
  }
  addToOrder = () => {
    let cart = []
    this.props.csaOrder.order.items.map(cartItem => {
      cart.push({
        ...cartItem,
        counter: cartItem.product.counter,
        productId: cartItem.product.id,
        quantity: cartItem.quantity
      })
    })
    this.props.CSACart(cart);
    this.props.history.push('/editOrder');
  }
  orderPaid = (data) => {
    let url = orderAPI +`/${this.props.match.params.id}/setPaid?paid=${data}`;

    axios.put(url, headers).then(
      (response) => {
        this.props.fetchCSAOrder(this.props.match.params.id);
      },
      (err) => {
        console.log(err);
      }
    )
  }
  
  render() {
    const csaOrder = this.props.csaOrder.order;
    const csaOrderItems = orderFilterByCounter(csaOrder.items,this.state.counter);
    const csaOrderSortedItems =groupByCounter(orderFilterByCounter(csaOrder.items,this.state.counter))
    const updateState = this.updateState;

    return (
      <div>
        <CSAHeader />
        <div className="content--container">
          <div className="order-detail">
          <button className="link--go-back" onClick={this.context.router.history.goBack}>Back to orders</button>
          <div className="order-detail--header">
            <div className="">
              <h4>Order #</h4><h2>{csaOrder.id} <button className="order-detail--action" onClick={this.handleShow}>cancel order</button></h2>
              <Modal show={this.state.show} onHide={this.handleClose}>
                <p className="cancel--text">Are you sure you want to cancel this order?</p>
                <Modal.Footer>
                  <Button className="btn-add">Yes, Cancel</Button>  
                  <Button onClick={this.handleClose}>No</Button>
                </Modal.Footer>
              </Modal>
              <PaidButton isPaid={csaOrder.isPaid} orderPaid={this.orderPaid} />
            </div>

            <div className="">
              <h4>Customer <button className="order-detail--action">edit</button></h4>
              {csaOrder.client.name}<br />

              {csaOrder.client.email && csaOrder.client.email}<br />
              {csaOrder.client.phone && csaOrder.client.phone}<br />
              
            </div>

            <div className="">
              <h4>Pickup Date & Time <button className="order-detail--action">edit</button></h4>
              {csaOrder.pickupDate} @ {csaOrder.pickupTime} 
              

              <h4>Order Status</h4> 
             
              <StatusState status={csaOrder.status} onSelectChange={this.onSelectChange} isPaid={csaOrder.isPaid} />
            </div>
          </div>

          <OrderCounterFilters handleCounter={this.handleCounter} counterActive={this.state.counter} />

          <div className="order-items--header">
            <div className="col-item grey-border">
              <h4>Item</h4>
            </div>
            <div className="col-assign grey-border">
              <h4>Assigned To</h4>
            </div>
            <div className="col-status grey-border">
              <h4>Status</h4>
            </div>
            <div className="col-qty grey-border">
              <h4>Qty</h4>
            </div>
            <div className="col-barcode">
              <h4>Barcode</h4>
            </div>
          </div>
          <div className="order--items">
          
            {Object.keys(csaOrderSortedItems).map(function(key, index) {
              return <div key={index} className="element">
                <h2>{key}</h2> 
                <div className="counter-items--container">
                  {csaOrderSortedItems[key].map(order => {
                    return <OrderDetailItem key={order.id} order={order} oid={csaOrder.id} updateState={updateState} />;
                  })}
                </div>
              </div>;
            })}

            {!csaOrder.isPaid? 
              <button onClick={this.addToOrder} className="order-detail--action order-detail--add-to">Add to order</button>
            :'' }
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
          <button className="checkbox-red checked" onClick={() => orderPaid(false)}>Order is Paid </button>
        </div>
      ):(
        <button className="checkbox-red"  onClick={() => orderPaid(true)}>Order is not paid</button>
      )}
    </div>
  );
};


const mapStateToProps = (state) => ({
  filters: state.filters,
  csaOrder: state.csaOrder
});

const mapDispatchToProps = (dispatch) => ({
  fetchCSAOrder:(oId) => dispatch(fetchCSAOrder(oId)),
  updateCSAOrder:(oId) => dispatch(updateCSAOrder(oId)),
  CSACart:(products) => dispatch(CSACart(products))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
