import React, { Component } from 'react';
import { connect } from 'react-redux';
import Barcode from 'react-barcode';
import Select from 'react-select';
import { baseUrl, headers } from '../../const/global';
import { updateCSAOrderState, fetchCSAOrder } from '../../actions/csa/csaOrder';
import { Assignees } from './Assignees';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import { PromptUpdate } from '../shared/Prompt';

const orderAPI = baseUrl+'/order';

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
    updateOrderItem;
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
                <h4>{order.product.name}</h4>
                {((order.product.category === 'Signature Cakes')||(order.product.category === 'Classic Cakes')||(order.product.category === 'Cupcake Cakes')) ? ''
                :<div>{order.option.name && <ItemDescription order={order} />}{order.comment && <SpecialInstructions order={order} />}</div>}
                
              </div>

              {/* <div className="order-item--assign grey-border">
                <Assignees assignee={order.assignee} reassignState={this.state.reassign} reassign={this.onReassign} onAssignedChange={this.onAssignedChange} assignees={assignees} />
              </div> */}

              <div className="order-item--status grey-border">
                
                  <Select
                  name="status"
                  value={order.status}
                  onChange={(e)=>this.onSelectChange(e.value, 'status')}
                  options={options}
                  clearable={false} 
                  />
                         
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
                    <button onClick={() => this.props.updateOrderItem({order})} className="btn-qu">
                      <span className="icon--trash"></span>
                  </button>
                : null}
                </div>
              ): ''}

            </div>
              {((order.product.category === 'Signature Cakes')||(order.product.category === 'Classic Cakes')||(order.product.category === 'Cupcake Cakes')) ? <div className="order-item--meta"><CakeDescription order={order} /></div>:''}
          </div>
      </div>
    );
  }
}

const ItemDescription = ({order}) => {
  return (
    <div>
      <p><strong>Item Option:</strong> {order.option.name}</p>
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
      <p><strong>Special Instructions:</strong><br/> {order.comment}</p>
    </div>
  );
};

const CakeDescription = ({order}) => {
  return (
    <div>
      <div className="order--cake-options">
        {order.option.name && <p><strong>Item Option:</strong><br/>{order.option.name}</p>}
        {order.options.size && <p><strong>Size:</strong><br/>{order.options.size}</p>}
        {order.options.cakelayers && <p><strong>Cake Layers:</strong><br/>{order.options.cakelayers}</p>}
        {order.options.icing && <p><strong>Icing:</strong><br/>{order.options.icing}</p>}
        {order.options.trim && <p><strong>Trim:</strong><br/>{order.options.trim}</p>}
        {order.options.color && <p><strong>Color:</strong><br/>{order.options.color}</p>}
        {order.options.filling && <p><strong>Filling:</strong><br/>{order.options.filling}</p>}
        {order.options.side && <p><strong>Side:</strong><br/>{order.options.side}</p>}
        {order.options.decorationType && <p><strong>Decoration Type:</strong><br/>{order.options.decorationType}</p>}
        {order.options.decorqationTypeNote && <p><strong>Decoration Type Note:</strong><br/>{order.options.decorqationTypeNote}</p>}
      </div>
      {order.options.writigOnCakeTypeNote && <p className="fullwidth"><strong>Writing on Cake:</strong><br/> {order.options.writigOnCakeTypeNote}</p>}
      {order.options.extras && <p className="fullwidth"><strong>Special Instructions:</strong><br/> {order.options.extras}</p>}
    </div>
  );
};


const mapDispatchToProps = (dispatch) => ({
  updateCSAOrderState:(url) => dispatch(updateCSAOrderState(url))
});

export default connect(undefined, mapDispatchToProps)(OrderDetailItem);
