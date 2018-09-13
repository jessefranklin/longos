import React, {Component} from 'react';
import { connect } from 'react-redux';
import OrderCounterFilters from './OrderCounterFilters';
import PropTypes from "prop-types";
import OrderDetailItem from './OrderDetailItem';
import FontAwesome from 'react-fontawesome';
import { fetchCSAOrder, updateCSAOrder, updateCSAOrderState, clearCSAOrder } from '../../actions/csa/csaOrder';
import { orderFilterByCounter } from '../../selectors/orders';
import { CSACart } from '../../actions/cart';
import EditClient from './EditClient';
import EditDateTime from './EditDateTime';
import groupByCounter from '../../selectors/groupByCounter';
import moment from 'moment';
import Loading from '../shared/LoadingPage';
import { PaidButton, CancelModal, StatusState } from './OrderDetailComponents';
import { PromptUpdate } from '../shared/Prompt';
import { baseUrl, headers } from "../../const/global";
import axios from 'axios';

const orderAPI = baseUrl+'/order';

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
      receiptNumber: 0,
      items: [],
      editClient: false,
      editPickup: false,
      promptUpdate: false,
      showFilter: false,
      showActions: false,
      editState: false,
      orderUpdated: false,
      showPaidModal: false,
      promptTime: 3000,
      promptType: 'success',
      promptMessage: 'this order has been updated.',
      show: false
    }
    this.orderPaid = this.orderPaid.bind(this);
    this.receiptChange = this.receiptChange.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.promptUpdate = this.promptUpdate.bind(this);
    this.toggleCounterFilter = this.toggleCounterFilter.bind(this);
    this.showActions = this.showActions.bind(this);
    this.gotoDashboard = this.gotoDashboard.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.showPaidModal = this.showPaidModal.bind(this);
  }

  componentWillMount() {
    const param = this.props.match.params.id;
    this.id = param.split('&')[1] ? param.split('&')[0] : param;
    this.props.fetchCSAOrder(this.id).then((res)=>{
      console.log(res);
    });
  };

  componentWillReceiveProps(props) {
    this.setState(this.props.csaOrder.order);
  }

  componentWillUnmount(){
    this.props.clearCSAOrder();
    document.removeEventListener('click', this.closeCounterFilterMenu);
    document.removeEventListener('click', this.closeActions);
    document.removeEventListener('click', this.closePaidModal);
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
    this.setState({ 
      editState: false, 
      editPickup: false,
      editClient: false
    });
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

  showPaidModal = () => {
    this.setState({ showPaidModal: true });
    // document.addEventListener("click", this.closePaidModal);
  }

  closePaidModal = () => {
    this.setState({ showPaidModal: false }, () => {
      document.removeEventListener('click', this.closePaidModal);
    });
  }

  updateState = () => {
    this.props.fetchCSAOrder(this.id);
  }

  onSelectChange = (value) => {
    this.setState({ 'status' : value });
    if(value == 2){
      this.completeOrder(value)
    }
  }

  promptUpdate(type, message){
    this.setState({ orderUpdated: true });
    this.setState({ promptType: type });
    this.setState({ promptMessage: message });
    setTimeout(()=> {
      this.setState({ orderUpdated: false });
    },this.state.promptTime)
  }

  updateClientPickup = (name,payload) => {
    this.setState({ [name]: false });
    this.updateOrder(payload);
  }

  updateOrder = (payload) => {
    let url = orderAPI +`/updateorder`;
    axios.put(url, payload, headers).then(
      (response) => {
        this.props.fetchCSAOrder(this.id);
        this.promptUpdate('success','This order has been updated');
      },
      (err) => {
        console.log(err);
      }
    )

  }
  updateOrderItem = (payload) => {
    console.log(payload);
    let url = `${orderAPI}/${this.id}/updateitem`;
    let message = `${payload.order.product.name} has been deleted`;
    const payloadQ = {
      id:payload.order.id,
      productId:payload.order.product.id,
      productName:payload.order.product.name,
      optionId:payload.order.option.id,
      optionName:payload.order.option.name,
      priceId:'',
      price:payload.order.price,
      tax:payload.order.tax,
      taxName:payload.order.taxName,
      quantity:0,
      comment:payload.order.comment
    };
    axios.put(url, payloadQ, headers).then(
      (response) => {
        this.props.fetchCSAOrder(this.id);
        this.promptUpdate('warning',message);
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
    let url = orderAPI +`/${this.id}/setstatus?status=${value}`;
    this.props.updateCSAOrderState(url).then(()=>{
      this.props.fetchCSAOrder(this.id);
      this.promptUpdate('success','This order has been completed');
    });
  }

  updateItem = (payload) => {
    let url = orderAPI +`/${this.id}/updateitem`;
    this.props.updateCSAOrder(url, payload).then(()=>{
      this.props.fetchCSAOrder(this.id);
      this.promptUpdate('success','This order has been updated');
    });
  }

  cancelOrder = (value) => {
    let url = orderAPI +`/${this.id}/setstatus?status=3`;
    this.setState({ show: false });
    this.props.updateCSAOrderState(url).then(()=>{
      this.props.fetchCSAOrder(this.id);
      this.promptUpdate('danger','This order has been cancelled and removed.');
      setTimeout(()=> {
        this.props.history.push('/orderDashboard');
      }, 3000);
    });
  }

  orderPaid = (data) => {
    let url = orderAPI +`/${this.id}/setPaid?paid=${data}&transactionNumber=${this.state.receiptNumber}`;
    this.setState({ showPaidModal: false });
    this.props.updateCSAOrderState(url).then(()=>{
      this.props.fetchCSAOrder(this.id);
      this.promptUpdate('success','This order has been marked as paid.');
    });
  }

  receiptChange = (text) =>{
    let recNo = text.target.value;
    this.setState({ receiptNumber: recNo });
  }

  gotoDashboard = () => {
    this.props.history.push('/orderDashboard');
  }

  render() {
    const csaOrder = this.props.csaOrder.order;
    const settings = this.props.settings;
    const csaOrderItems = orderFilterByCounter(csaOrder.items,this.state.counter);
    const csaOrderSortedItems =groupByCounter(orderFilterByCounter(csaOrder.items,this.state.counter))
    const updateState = this.updateState;
    const updateOrderItem = this.updateOrderItem;
    let editState = this.state.editState;
    const pastOrder = this.props.match.params.id.split('&')[1];
    console.log(pastOrder);

    return (
      <div>
        <div className="content--container">
          <div className="order-detail">
            <div className="order-detail--actions-row">

              <button className="link--go-back" onClick={this.gotoDashboard}>Back to orders</button>
                <div className="order-detail--actions-container">
                  {pastOrder=='pastOrders' ? '' : <button className="order-detail--action" onClick={this.showActions}>
                    Order Options
                  </button>}
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
                <PromptUpdate type={this.state.promptType} message={this.state.promptMessage}/>
              ) : ''}
            </div> 

          <div className="order-detail--header">
            <div className="">
              <h4>Order #</h4>
              <h2>
                {csaOrder.id}

              </h2>
              <CancelModal show={this.state.show} handleClose={this.handleClose} cancel={this.cancelOrder}  />

              <PaidButton isPaid={csaOrder.isPaid} orderPaid={this.orderPaid} showPaidModal={this.state.showPaidModal} handleShow={this.showPaidModal} handleClose={this.closePaidModal} receiptChange={this.receiptChange}/>

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
                  <EditClient csaOrder={csaOrder} updateClient={this.updateClient} handleClose={this.handleSave} updateClientPickup={this.updateClientPickup} />

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

            <div className="pickup--info">
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
                  <EditDateTime csaOrder={csaOrder} updateClientPickup={this.updateClientPickup} handleClose={this.handleSave}  />
                </div>
              ) : (
                <div>
                  {csaOrder.pickupDate} @ {moment(csaOrder.pickupTime, "HH:mm:ss").format('h:mm a')}

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
            {/* <div className="col-assign grey-border">
              <h4>Assigned To</h4>
            </div> */}
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

            <div className="order-detail--actions-row bg-none pad-none">
              {!csaOrder.isPaid?
                <button onClick={this.addToOrder} className="order-detail--action order-detail--add-to"><strong>+ &nbsp;</strong> Add to order</button>
              :'' }

              <div className="filter-by--container">
                <button className="order-detail--action btn-filter-by order-detail--list" onClick={this.toggleCounterFilter}>
                  {this.state.counter === '' ? 'All Dept.' : this.state.counter}
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
                    return <OrderDetailItem key={order.id} order={order} oid={csaOrder.id} updateState={updateState} editState={editState} isPaid={csaOrder.isPaid} assignees={settings} updateOrderItem={updateOrderItem}/>;
                  })}
                </div>
              </div>;
            })}


          </div>
        </div>
      </div>
      <Loading loading={this.props.csaOrder.loading} />
    </div>
    );
  }
}


const mapStateToProps = (state) => ({
  filters: state.filters,
  settings: state.settings,
  csaOrder: state.csaOrder
});

const mapDispatchToProps = (dispatch) => ({
  fetchCSAOrder:(oId) => dispatch(fetchCSAOrder(oId)),
  updateCSAOrderState:(url) => dispatch(updateCSAOrderState(url)),
  clearCSAOrder:() => dispatch(clearCSAOrder()),
  updateCSAOrder:(oId) => dispatch(updateCSAOrder(oId)),
  CSACart:(products) => dispatch(CSACart(products))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
