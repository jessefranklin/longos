import React, {Component} from 'react';
import { Button, Modal, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Barcode from 'react-barcode';
import Select from 'react-select';
let axios = require('axios');

const options = [
    { value: 0, label: 'Not ready', disabled: true  },
    { value: 1, label: 'Mark item ready' },
    { value: 2, label: 'Ready' }
]

const employees = [
    { value: 'unassigned', label: 'Unassigned', disabled: true  },
    { value: 'Sandy Longo', label: 'John Longo' },
    { value: 'Alex Longo', label: 'Alex Longo' }
]

const headers = {
  header: {
      "Content-Type":"application/json",
      "Access-Control-Allow-Origin": "*"
  }
}

class OrderDetailItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      status: this.props.order.status,
      assigned: 'unassigned'
    };
  }
  onSelectChange = (value, name) => {
    this.setState({ [name] : value });
    let orderUpdate = `setstatus?status=${value}`;
    this.updateOrder(orderUpdate);

  }
  onAssignedChange = (value, name) => {
    this.setState({ [name] : value });
    let orderUpdate = `assign?assignee=${value}`;
    this.updateOrder(orderUpdate);
  }

  updateOrder (orderUpdate) {
    const orderAPI = `http://digitalpreorder.azurewebsites.net/api/order/${this.props.oid}/item/${this.props.order.id}/`;
    
    let url = orderAPI + orderUpdate;
    
    axios.put(url, headers).then(
        (response) => {
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
        <div className="order-item--row">
          <h4>{order.product.counter} {order.product.name}</h4>
          
          <Select
              name="assigned"
              value={order.assignee}
              onChange={(e)=>this.onAssignedChange(e.value, 'assigned')}
              options={employees}
              isSearchable={true}
              clearable={false} 
          />

          {order.quantity}

          <Select
            name="status"
            value={order.status}
            onChange={(e)=>this.onSelectChange(e.value, 'status')}
            options={options}
            disabled={order.status === 0 ? true:false}
            clearable={false} 
          />

          
          <Barcode value="88888" />
        </div>
        <div className="order-item--meta">
          <h6>Item Option:</h6> {order.option.name}

          {order.comment && `<h6>Special Instructions:</h6>${order.comment}`}
        </div>
      </div>
    );
  }
}

const ItemDescription = ({item}) => {
  return (
    <div>
      
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
