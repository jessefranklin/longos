import React, {Component} from 'react';
import { Button, Modal, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Barcode from 'react-barcode';
import Select from 'react-select';
import { SlideToggle } from 'react-slide-toggle';
import { baseUrl, headers } from "../../const/global";

let axios = require('axios');

const options = [
    { value: 2, label: 'In Progress' },
    { value: 3, label: 'Ready' }
]

const employees = [
    { value: 'unassigned', label: 'Unassigned', disabled: true  },
    { value: 'Sandy Longo', label: 'John Longo' },
    { value: 'Alex Longo', label: 'Alex Longo' }
]

class OrderDetailItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      status: this.props.order.status,
      assigned: 'unassigned',
      reassign: false
    };
  }
  onSelectChange = (value, name) => {
    this.setState({ [name] : value });
    let orderUpdate = `setstatus?status=${value}`;
    this.updateOrder(orderUpdate);

  }
  onAssignedChange = (value, name) => {
    this.setState({ [name] : value });
    // this.setState({ 'reassign' : false });
    let orderUpdate = `assign?assignee=${value}`;
    console.log(orderUpdate);
    this.updateOrder(orderUpdate);
  }
  onReassign=()=>{
    // this.setState({ 'reassign' : true });
  }
  statusAssigned = () => {
    let orderUpdate = `setstatus?status=2`;
    this.updateOrder(orderUpdate);
  }

  updateOrder (orderUpdate) {
    const orderAPI = `${baseUrl}/order/${this.props.oid}/item/${this.props.order.id}/`;
    
    let url = orderAPI + orderUpdate;
    axios.put(url, headers).then(
        (response) => {
          console.log(response.data);
          this.props.updateState(response.data);
        },
        (err) => {
            console.log(err);
        }
    )
  }

  render() {
    const { order } = this.props;

    return (
        <div>

            <div className="order-detail-item--container">
              <div className="order-item--row">
                <div className="order-item--item grey-border">
                  <h4>{order.product.counter}</h4>
                  {order.product.name}
                  <div className="img--container">
                    <img src={order.product.imageLink} alt={order.product.name} />
                  </div>
                  
                </div>
                <div className="order-item--assign grey-border">
                {order.assignee && !this.state.reassign ? (
                  <OrderAssignee assignee={order.assignee} reassign={this.onReassign} />
                ):(
                  <Select
                  name="assigned"
                  value={order.assignee}
                  onChange={(e)=>this.onAssignedChange(e.value, 'assigned')}
                  options={employees}
                  isSearchable={true}
                  clearable={false} 
                  />)
                }
                
                </div>
                <div className="order-item--status grey-border">
                {order.status <= 1 ? (
                  <OrderStatus status={order.status} statusAssigned={this.statusAssigned} />
                ) : (
                  <Select
                  name="status"
                  value={order.status}
                  onChange={(e)=>this.onSelectChange(e.value, 'status')}
                  options={options}
                  disabled={order.status === 0 ? true:false}
                  clearable={false} 
                  />
                )}
                
                </div>
                <div className="order-item--qty grey-border">
                  {order.quantity}
                </div>
                <div className="order-item--barcode">
                  {order.upc ? (
                    <Barcode 
                      format="UPC" 
                      value={order.upc}
                      />
                  ) : ''}
                </div>

              </div>
              <div className="order-item--meta">
                {order.option.name && <ItemDescription order={order} />}
                {order.comment && <SpecialInstructions order={order} />}
              </div>
            </div>
      </div>
    );
  }
}

const ItemDescription = ({order}) => {
  return (
    <div>
      <h6>Item Option:</h6> {order.option.name}
    </div>
  );
};

const OrderAssignee = ({assignee,reassign}) => {
  return (
    <div>
      {assignee}
      <button className="order-detail--action" onClick={reassign}>Re-assign</button>
    </div>
  );
};

const OrderStatus = ({status,statusAssigned}) => {
  return (
    <div className="checkbox--container">
      {status === 1 ? (
        <button className="checkbox-red" onClick={statusAssigned} disabled={status===0?'disabled':''}>Inprogress</button>
      ) : (
        <button className="checkbox-red" onClick={statusAssigned} disabled='disabled'>Not Ready</button>
      )}
    </div>
  );
};

const SpecialInstructions = ({order}) => {
  return (
    <div>
      <h6>Special Instructions:</h6> {order.comment}
    </div>
  );
};

const CakeDescription = ({item}) => {
  return (
    <div>
      
    </div>
  );
};

export default OrderDetailItem;
