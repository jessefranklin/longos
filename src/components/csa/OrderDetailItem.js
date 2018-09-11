import React, { Component } from 'react';
import { connect } from 'react-redux';
import Barcode from 'react-barcode';
import Select from 'react-select';
import { baseUrl } from '../../const/global';
import { updateCSAOrderState } from '../../actions/csa/csaOrder';
import { Assignees } from './Assignees';
import FontAwesome from 'react-fontawesome';

const options = [
    { value: 1, label: 'Not Ready' },  
    { value: 2, label: 'In Progress' },
    { value: 3, label: 'Ready' }
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
  onAssignedChange = (obj) => {
    let name = obj?obj.value:'unassigned';
    this.setState({ 'assigned' :name });
    this.setState({ 'reassign' : false });
    let orderUpdate = `assign?assignee=${name}`;
    this.updateOrder(orderUpdate);
  }
  onReassign=()=>{
    this.setState({ 'reassign' : true });
  }
  onRemove = () => {
    
  }
  statusAssigned = () => {
    let orderUpdate = `setstatus?status=2`;
    this.updateOrder(orderUpdate);
  }

  updateOrder (orderUpdate) {
    const orderAPI = `${baseUrl}/order/${this.props.oid}/item/${this.props.order.id}/`;
    
    let url = orderAPI + orderUpdate;
    this.props.updateCSAOrderState(url).then(()=>{
      this.props.updateState();
    });
  }

  render() {
    const { order, assignees } = this.props;

    return (
        <div>
          <div className="order-detail-item--container">
            <div className="order-item--row">
              <div className="order-item--item grey-border">
                <img src={order.product.imageLink} alt={order.product.name} />               
                <h4>{order.product.counter}</h4>
                {order.product.name}
              </div>

              <div className="order-item--assign grey-border">
                <Assignees assignee={order.assignee} reassignState={this.state.reassign} reassign={this.onReassign} onAssignedChange={this.onAssignedChange} assignees={assignees} />
              </div>

              <div className="order-item--status grey-border">
                {order.status == 0 ? (
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
              {this.props.editState ? (
                <div className="order-item--remove-item">
                {!this.props.isPaid?
                    <button onClick={this.onRemove} className="btn-qu">
                      <FontAwesome
                      className='fa fa-trash'
                      name='fa-trash'
                      size='2x'
                      aria-hidden='true'
                    />
                  </button>
                : null}
                </div>
              ): ''}

            </div>
            <div className="order-item--meta">
              {order.option.name && <ItemDescription order={order} />}
              {order.comment && <SpecialInstructions order={order} />}
              {((order.product.category === 'Signature Cakes')||(order.product.category === 'Classic Cakes')) && <CakeDescription order={order} />}
            </div>
          </div>
      </div>
    );
  }
}

const ItemDescription = ({order}) => {
  return (
    <div>
      <p>Item Option: {order.option.name}</p>
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
        <button className="bland" onClick={statusAssigned} disabled='disabled'>Not Ready</button>
      )}
    </div>
  );
};

const SpecialInstructions = ({order}) => {
  return (
    <div>
      <p>Special Instructions: {order.comment}</p>
    </div>
  );
};

const CakeDescription = ({order}) => {
  return (
    <div>
      {order.options.writigOnCakeTypeNote && <p>Writing on Cake: {order.options.writigOnCakeTypeNote}</p>}
      {order.options.extras && <p>Special Instructions: {order.options.extras}</p>}
      {order.options.size && <p>Size: {order.options.size}</p>}
      {order.options.cakelayers && <p>Cake Layers: {order.options.cakelayers}</p>}
      {order.options.icing && <p>Icing: {order.options.icing}</p>}
      {order.options.trim && <p>Trim: {order.options.trim}</p>}
      {order.options.color && <p>Color: {order.options.color}</p>}
      {order.options.filling && <p>Filling: {order.options.filling}</p>}
      {order.options.side && <p>Side: {order.options.side}</p>}
      {order.options.decorationType && <p>Decoration Type: {order.options.decorationType}</p>}
      {order.options.decorqationTypeNote && <p>Decoration Type Note: {order.options.decorqationTypeNote}</p>}
    </div>
  );
};


const mapDispatchToProps = (dispatch) => ({
  updateCSAOrderState:(url) => dispatch(updateCSAOrderState(url))
});

export default connect(undefined, mapDispatchToProps)(OrderDetailItem);
