import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderCounterFilters from './OrderCounterFilters';
import Select from 'react-select';
import {Button, Modal, Panel } from 'react-bootstrap';
import PropTypes from "prop-types";
import OrderDetailItem from './OrderDetailItem';
import { fetchCSAOrder, updateCSAOrder, clearCSAOrder } from '../../actions/csa/csaOrder';
import { orderFilterByCounter } from '../../selectors/orders';
import { CSACart } from '../../actions/cart';
import CSAHeader from './CSAHeader';
import groupByCounter from '../../selectors/groupByCounter';
import TimePicker from 'react-bootstrap-time-picker';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import FontAwesome from 'react-fontawesome';

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
        name: this.props.csaOrder.order.client.name,
        email: this.props.csaOrder.order.client.email,
        phoneNo: this.props.csaOrder.order.client.phoneNo,
        tyrNumber: this.props.csaOrder.order.client.tyrNumber
      },
      pickupDate: this.props.csaOrder.order.pickupDate,
      pickupTime: this.props.csaOrder.order.pickupTime,
      status: '',
      isPaid: this.props.csaOrder.order.isPaid,
      items: [],
      editClient: false,
      editPickup: false,
      promptUpdate: false,
      showFilter: false,
      showActions: false,
      editState: false,
      orderUpdated: false,
      show: false
    }
    this.orderPaid = this.orderPaid.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateClient = this.updateClient.bind(this);
    this.promptUpdate = this.promptUpdate.bind(this);
    this.toggleCounterFilter = this.toggleCounterFilter.bind(this);
    this.showActions = this.showActions.bind(this);
  }

  componentWillMount() {
    this.props.fetchCSAOrder(this.props.match.params.id);
  };

  componentWillReceiveProps(props) {
    this.setState(this.props.csaOrder.order);
  }
  
  componentWillUnmount(){
    this.props.clearCSAOrder();
    document.removeEventListener('click', this.closeCounterFilterMenu);
    document.removeEventListener('click', this.closeActions);
    this.setState({ editState: false });
  };

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

  editState = () => {
    this.setState({ editState: true });
  }

  editStateClose = () => {
    this.setState({ editState: false });
  }

  toggleCounterFilter(){
    this.setState({ showFilter: true });
    document.addEventListener("click", this.closeCounterFilterMenu);
  }

  closeCounterFilterMenu = () => {
    this.setState({ showFilter: false }, () => {
      document.removeEventListener('click', this.closeCounterFilterMenu);
    });
  }

  showActions(){
    this.setState({ showActions: true });
    document.addEventListener("click", this.closeActions);
  }

  closeActions = () => {
    this.setState({ showActions: false }, () => {
      document.removeEventListener('click', this.closeActions);
    });
  }


  updateState = () => {
    this.props.fetchCSAOrder(this.props.match.params.id);
  }

  onSelectChange = (value) => {
    this.setState({ 'status' : value });
    if(value == 2){
      this.completeOrder(value)
    }
  }

  updateClient = (e) => {
    const client = {...this.state.client}
    client[e.target.name] = e.target.value;
    this.setState(() => ({ client }));
  };

  updatePickupTime = (val) => {
    const time = moment().startOf('day').seconds(val).format('hh:mm:ss');
    this.setState(() => ({ 'pickupTime': time }));
  };

  updatePickupDate = (val) => {
    const date = val.target.value;
    this.setState(() => ({ 'pickupDate': date }));
  };
  promptUpdate(){
    this.setState({ orderUpdated: true });
    setTimeout(()=> {
      this.setState({ orderUpdated: false });
    },30000)
  }
  updateClientPickup = (name) => {
    // PUT http://digitalpreorder-staging.azurewebsites.net/api/order/updateorder
    let url = orderAPI +`/updateorder`;
   
    const payload = {
      id: this.props.csaOrder.order.id,
      storeId: this.props.csaOrder.order.store.id,
      client: {
        ...this.state.client
      },
      pickUpDate: this.state.pickupDate,
      pickUpTime: this.state.pickupTime
    }
    axios.put(url, payload, headers).then(
      (response) => {
        this.setState({ [name]: false });
        this.props.fetchCSAOrder(this.props.match.params.id);  
        this.promptUpdate();
      },
      (err) => {
        console.log(err);
      }
    )
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
    let editState = this.state.editState;

    return (
      <div>
        <CSAHeader />
        <div className="content--container">
          <div className="order-detail">
            <div className="order-detail--actions-row">
            
              <button className="link--go-back" onClick={this.context.router.history.goBack}>Back to orders</button>
                <div className="order-detail--actions-container">
                  <button className="order-detail--action" onClick={this.showActions}>
                    <FontAwesome
                        className='fa fa-bars'
                        name='fa-bars'
                        size="2x"
                        aria-hidden='true'
                      />
                  </button>
                  {this.state.showActions? (
                    <div className="order-detail--actions-list">
                      <ul>
                        {this.state.editState?(
                          <li><button onClick={this.editStateClose}>Exit Edit State</button></li>
                        ):(
                          <li><button onClick={this.editState}>Edit Order</button></li>
                        )}
                        <li><button onClick={this.handleShow}>Cancel Order</button></li>
                      </ul>
                    </div>
                  ): ''}
                </div>

                
            </div>
            <div className="order-detail--actions-row">
              {this.state.orderUpdated? (
                <Panel bsStyle="success">
                  <Panel.Heading>
                    <Panel.Title componentClass="h3">Order Updated</Panel.Title>
                  </Panel.Heading>
                </Panel>
              ) : ''}
            </div>

          <div className="order-detail--header">
            <div className="">
              <h4>Order #</h4>
              <h2>
                {csaOrder.id} 
                
              </h2>
              <CancelModal show={this.state.show} handleClose={this.handleClose} cancel={this.cancelOrder} />

              <PaidButton isPaid={csaOrder.isPaid} orderPaid={this.orderPaid} />

            </div>

            <div className="">
              <h4>Customer
                {this.state.editState && !this.state.editClient ? (
                  <button className="order-detail--action" onClick={() => this.handleEdit('editClient')}>
                  edit <FontAwesome
                    className='fa fa-pen'
                    name='fa-trash'
                    aria-hidden='true'
                  /></button>
                  ): ''}
                </h4>


              {this.state.editClient ? (
                <div>
                  <EditClient client={this.state.client} updateClient={this.updateClient} />
                  <button className="order-detail--action" onClick={() => this.handleSave('editClient')}>Cancel</button>
                  <button className="order-detail--action" onClick={() => this.updateClientPickup('editClient')}>Save</button>
                </div>
              ) : (
                <div>
                  {csaOrder.client.name}<br />
                  {csaOrder.client.email && csaOrder.client.email}<br />
                  {csaOrder.client.phoneNo && csaOrder.client.phoneNo}<br />
                  {csaOrder.client.tyrNumber && csaOrder.client.tyrNumber}
                </div>
              )}

            </div>

            <div className="">
              <h4>Pickup Date & Time 
                {this.state.editState && !this.state.editPickup ? (
                    <button className="order-detail--action" onClick={() => this.handleEdit('editPickup')}>
                    edit <FontAwesome
                      className='fa fa-pen'
                      name='fa-trash'
                      aria-hidden='true'
                    /></button>
                ): ''}    
              </h4>

              {this.state.editPickup ? (
                <div>
                  <EditPickup pickup={this.state} updatePickupDate={this.updatePickupDate} updatePickupTime={this.updatePickupTime} />
                  <button className="order-detail--action" onClick={() => this.handleSave('editPickup')}>Cancel</button>
                  <button className="order-detail--action" onClick={() => this.updateClientPickup('editPickup')}>Save</button>
                </div>
              ) : (
                <div>
                  {csaOrder.pickupDate} @ {csaOrder.pickupTime} 
                </div>
              )}
              

              <h4>Order Status</h4> 
             
              <StatusState status={csaOrder.status} onSelectChange={this.onSelectChange} isPaid={csaOrder.isPaid} />
            </div>
          </div>
          
          

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
            {this.state.editState ? (
              <div className="col-remove">
              </div>
            ) : ''}
          </div>
          <div className="order--items">
          
            <div className="order-detail--actions-row">
              {!csaOrder.isPaid?
                <button onClick={this.addToOrder} className="order-detail--action order-detail--add-to">Add to order</button>
              :'' }

              <div className="filter-by--container">
                <button className="order-detail--action btn-filter-by" onClick={this.toggleCounterFilter}>
                  Filtered by {this.state.counter === '' ? 'All Dept.' : this.state.counter} 
                      <FontAwesome
                            className='fa fa-filter'
                            name='fa-filter'
                            aria-hidden='true'
                          />
                </button>
                {this.state.showFilter?(
                  <OrderCounterFilters handleCounter={this.handleCounter} counterActive={this.state.counter} />
                ) : (
                  ''
                )}

              </div>
            </div>

            {Object.keys(csaOrderSortedItems).map(function(key, index) {
              return <div key={index} className="element">
                <h2>{key}</h2>
                <div className="counter-items--container">
                  {csaOrderSortedItems[key].map(order => {
                    return <OrderDetailItem key={order.id} order={order} oid={csaOrder.id} updateState={updateState} editState={editState} />;
                  })}
                </div>
              </div>;
            })}

            
          </div>
        </div>
      </div>
    </div>
    );
  }
}

const EditPickup = ({pickup,updatePickupDate,updatePickupTime}) => {
  return (
    <div>
      <div className="date-picker">
        <i className="fa fa-calendar" aria-hidden="true"></i>
        {/* <SingleDatePicker
          date={this.state.pickUpDate} 
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        /> */}
        <input
          type="date"
          name="pickupDate"
          placeholder="Select Date"
          value={pickup.pickupDate}
          onChange={(e) => updatePickupDate(e)}
        />
      </div>
      <div className="time-picker">
        <i className="fa fa-clock" aria-hidden="true"></i>
        <TimePicker onChange={updatePickupTime} start="8:00" end="22:00" value={pickup.pickupTime} />
      </div>
    </div>
  );
};

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
        <div className="modal--cancel">
          <h4>Are you sure you want to cancel this order?</h4>
          <div className="modal--buttons">
            <Button>Yes, Cancel</Button>
            <Button onClick={handleClose} className="btn-cancel">No</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const EditClient = ({client,updateClient}) => {
  return (
    <div>
      <input
        type="text"
        name="name"
        className='form-control'
        placeholder="First and Last Name"
        value={client.name}
        onChange={updateClient}
      />
      <input
        type="email"
        name="email"
        className='form-control'
        placeholder="email"
        value={client.email}
        onChange={() => updateClient()}
      />
      <input
        type="phone"
        name="phoneNo"
        className='form-control'
        placeholder="phone"
        value={client.phoneNo}
        onChange={updateClient}
      />
      <input
        type="number"
        name="tyrNumber"
        className='form-control'
        value={client.tyrNumber ? client.tyrNumber : '' }
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
  clearCSAOrder:() => dispatch(clearCSAOrder()),
  updateCSAOrder:(oId) => dispatch(updateCSAOrder(oId)),
  CSACart:(products) => dispatch(CSACart(products))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
