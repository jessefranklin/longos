import React, {Component} from 'react';
import { connect } from 'react-redux'
import { startRemoveItem, startEditItem }  from '../../actions/cart';
import numeral from 'numeral';
import FontAwesome from 'react-fontawesome';
import { QuantitySelect } from '../partials/QuantitySelect';

class CartListItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.onChange = this.onChange.bind(this);
    this.onRemove = this.onRemove.bind(this);
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
    const formattedItemTotalwithTax = numeral(item.quantity * item.tax).format('$0,0.00');

    const quantityEditable = this.props.editable === "true" ? <QuantitySelect onQuantityChange={this.onQuantityChange} quantity={item.quantity} /> : item.quantity;
    return (
      <div className="cart--row">
        {item.type === 'cake' ? <CakeItem item={item} quantityEditable={quantityEditable} formattedItemTotal={formattedItemTotal} onRemove={this.onRemove} formattedItemTotalwithTax={formattedItemTotalwithTax} />
        :<CartItem item={item} quantityEditable={quantityEditable} formattedItemTotal={formattedItemTotal} onRemove={this.onRemove} formattedItemTotalwithTax={formattedItemTotalwithTax} /> }
      </div>
    );
  }
}

const CartItem = ({item,quantityEditable,formattedItemTotal,onRemove,formattedItemTotalwithTax}) => {
  return (
    <div className="cart--item">
      <div className="cart--item-row1">
        <div className="cart--item-img grey-border">
          <img src={item.productImage} alt={item.name} />
          <h4>{item.productName}</h4>
          <p>{item.optionName}</p>
        </div>
        <div className="cart--item-qty grey-border">
          {quantityEditable}

          {item.name}
        </div>
        <h4 className="grey-border">{formattedItemTotal}<br />
          {/*item.tax != 0 ?
            <span className="sml-red">Tax {formattedItemTotalwithTax}</span>
          :''*/}

        </h4>
        <button onClick={onRemove} className="btn-qu">
            <FontAwesome
            className='fa fa-trash'
            name='fa-trash'
            size='2x'
            aria-hidden='true'
          />
        </button>
      </div>
      <div className="cart--item-row2">
        <div className="cart--item-comment">
          {item.comment.length ? item.comment:''}
        </div>
      </div>
    </div>
  );
};

const CakeItem = ({item,quantityEditable,formattedItemTotal,onRemove}) => {
  return (
    <div className="cart--item">
        <h4>{item.productName}</h4>
        <div>
          {item.comment}
          {item.options.size}
          {item.options.cakelayers}
          {item.options.icing}
          {item.options.trim}
          {item.options.color}
          {item.options.filling}
          {item.options.side}
          {item.options.decorationType}
          {item.options.decorationTypeNote}
          {item.options.writigOnCakeType}
          {item.options.extras}

          {quantityEditable}

          {item.name}
        </div>
        {formattedItemTotal}
        <button onClick={onRemove}>X remove</button>
    </div>
  );
};



const mapDispatchToProps = (dispatch) => ({
  startEditItem: (id, item) => dispatch(startEditItem(id, item)),
  startRemoveItem: (item) => dispatch(startRemoveItem(item))
});

export default connect(undefined, mapDispatchToProps)(CartListItem);
