import React, {Component} from 'react';
import { Button, Modal, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Barcode from 'react-barcode';
import Select from 'react-select';
import { SlideToggle } from 'react-slide-toggle';

let axios = require('axios');

const options = [
    { value: 0, label: 'Not assigned', disabled: true  },
    { value: 1, label: 'Assigned' },
    { value: 2, label: 'In Progress' },
    { value: 3, label: 'Ready' }
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
        <SlideToggle 
        collapsed={true} >
          {({onToggle, setCollapsibleElement}) => (
            <div className="my-collapsible">
              <div className="order-item--row">
                <div className="" onClick={onToggle}>
                  <h4>{order.product.counter}</h4>
                  {order.product.name}
                </div>
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
                {order.upc ? (
                  <Barcode 
                    format="UPC" 
                    value={order.upc}
                    />
                ) : ''}

              </div>
              <div className="my-collapsible__content" ref={setCollapsibleElement}>
                <div className="my-collapsible__content-inner">
                  <div className="order-item--meta">
                    {order.option.name && <ItemDescription order={order} />}
                    {order.comment && <SpecialInstructions order={order} />}
                  </div>
                </div>
              </div>
            </div>
          )}
        </SlideToggle>
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
