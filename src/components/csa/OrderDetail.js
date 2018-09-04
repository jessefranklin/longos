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
      editClient: false,
      editPickup: false,
      show: false
    }
    this.orderPaid = this.orderPaid.bind(this);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateClient = this.updateClient.bind(this);
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
  updateClient = (val, name) => {
    const client = {...this.state.client}
    client[name] = val;
    this.setState(() => ({ client }));
  };

  updateClientPickup = (payload) => {
    // PUT http://digitalpreorder-staging.azurewebsites.net/api/order/updateorder
    let url = orderAPI +`/updateorder`
    axios.put(url, payload, headers).then(
      (response) => {
        // Add notification
      },
      (err) => {
        console.log(err);
      }
    )
  }
  updateItem = (payload) => {
    // http://digitalpreorder-staging.azurewebsites.net/api/order/O17375337/updateitem
    let url = orderAPI +`/${this.props.match.params.id}/updateitem`
    axios.put(url, payload, headers).then(
      (response) => {
        // Add notification
      },
      (err) => {
        console.log(err);
      }
    )
  }
  cancelOrder(value){
    let url = orderAPI +`/${this.props.match.params.id}/setstatus?status=3`
    axios.put(url, headers).then(
      (response) => {
        // Add notification

      },
      (err) => {
        console.log(err);
      }
    )
  }
  handleCounter = (value) => {
    this.setState({ 'counter' : value });

  };
  handleEdit = (name) =>{
    this.setState({ [name]: true })
  }
  handleSave = (name) => {
    this.setState({ [name]: false })
  }
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
    this.props.history.push('/orderDashboard/editOrder');
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
                <div className="modal--cancel">
                  <h4>Are you sure you want to cancel this order?</h4>
                  <div className="modal--buttons">
                    <Button>Yes, Cancel</Button>
                    <Button onClick={this.handleClose} className="btn-cancel">No</Button>
                  </div>
                </div>
              </Modal>
              <PaidButton isPaid={csaOrder.isPaid} orderPaid={this.orderPaid} />

            </div>

            <div className="">
              <h4>Customer
                {this.state.editClient ? (
                    <div>
                      <button className="order-detail--action" onClick={() => this.handleSave('editClient')}>Cancel</button>
                      <button className="order-detail--action" onClick={() => this.handleSave('editClient')}>Save</button>
                    </div>
                  ):(
                  <button className="order-detail--action" onClick={() => this.handleEdit('editClient')}>edit</button>
                  )}
                </h4>


              {this.state.editClient ? (
                <EditClientFields client={this.props.csaOrder.order} updateClient={this.updateClient} />
              ) : (
                <div>
                  {csaOrder.client.name}<br />
                  {csaOrder.client.email && csaOrder.client.email}<br />
                  {csaOrder.client.phone && csaOrder.client.phone}<br />
                  {csaOrder.client.tyrNumber && csaOrder.client.tyrNumber}
                </div>
              )}

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
            <div className="">
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

const CancelModal = ({show,handleClose,cancel}) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <p className="cancel--text">Are you sure you want to cancel this order?</p>
        <Modal.Footer>
          <Button className="btn-add" onClick={handleClose}>Yes, Cancel</Button>
          <Button onClick={handleClose}>No</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};


const EditClientFields = ({client,updateClient}) => {
  return (
    <div>
      <input
        type="text"
        name="name"
        className='form-control'
        placeholder="First and Last Name"
        value={client.client.name}
        onChange={updateClient}
      />
      <input
        type="email"
        name="email"
        className='form-control'
        placeholder="email"
        value={client.client.email}
        onChange={updateClient}
      />
      <input
        type="phone"
        name="phone"
        className='form-control'
        placeholder="phone"
        value={client.client.phone}
        onChange={updateClient}
      />
      <input
        type="number"
        name="rewards"
        className='form-control'
        value={client.client.tyrNumber ? client.client.tyrNumber : '' }
        placeholder="rewards number"
        onChange={updateClient}
      />
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
