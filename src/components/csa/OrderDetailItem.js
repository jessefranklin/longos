import React, {Component} from 'react';
import { Button, Modal, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Barcode from 'react-barcode';
import Select from 'react-select';
import { serialize } from 'uri-js';


const options = [
    { value: 0, label: 'Not ready' },
    { value: 1, label: 'Mark item ready' },
    { value: 2, label: 'Ready' }
]

const employees = [
    { value: 'unassigned', label: 'Unassigned' },
    { value: 'Sandy Longo', label: 'John Longo' },
    { value: 'Alex Longo', label: 'Alex Longo' }
]


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
  }

  render() {
    const { order } = this.props;
    
    return (
      <div>
        <h4>{order.product.counter} {order.product.name}</h4>

        <Select
            name="assigned"
            value={this.state.assigned}
            onChange={(e)=>this.onSelectChange(e.value, 'assigned')}
            options={employees}
            isSearchable={true}
            clearable={false} 
        />

        {order.quantity}

        <Select
          name="status"
          value={this.state.status}
          onChange={(e)=>this.onSelectChange(e.value, 'status')}
          options={options}
          clearable={false} 
        />


        Item Option: {order.option.name}
        <Barcode value="88888" />
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
