import React, {Component} from 'react';
import { connect } from 'react-redux'
import { startRemoveItem, startEditItem }  from '../actions/cart';
import numeral from 'numeral';
import { QuantitySelect } from './partials/QuantitySelect';

class CartListItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.onChange = this.onChange.bind(this);
  }
  onRemove = () => {
    this.props.startRemoveItem({ id: this.props.item.id });
  };
  onChange = (selectedOption) => {
    const item = {...this.props.item}
    item.quantity = selectedOption.value;
    this.props.startEditItem(item.id, item);
  };
  onQuantityChange = (selectedOption) => {
    const item = {...this.props.item}
    item.quantity = selectedOption;
    this.props.startEditItem(item.id, item);
  }
  render() {
    const item = this.props.item;
    const formattedItemTotal = numeral(item.quantity * item.price).format('$0,0.00');
    const quantityEditable = this.props.editable === "true" ? <QuantitySelect onQuantityChange={this.onQuantityChange} quantity={item.quantity} /> : item.quantity; 
    return (
      <div className="cart--item">
        <h4>{item.productName}</h4>
        <div>
          {item.comment}  
          
          {quantityEditable}

          {item.name}
        </div>
        {formattedItemTotal}
        <button onClick={this.onRemove}>X remove</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startEditItem: (id, item) => dispatch(startEditItem(id, item)),
  startRemoveItem: (item) => dispatch(startRemoveItem(item))
});

export default connect(undefined, mapDispatchToProps)(CartListItem);