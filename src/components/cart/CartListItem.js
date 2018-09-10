import React, {Component} from 'react';
import { connect } from 'react-redux'
import { startRemoveItem, startEditItem }  from '../../actions/cart';
import numeral from 'numeral';
import FontAwesome from 'react-fontawesome';
import { QuantitySelect } from '../partials/QuantitySelect';
import { orderDate } from '../../selectors/orderDate';

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
    let cartRow;

    if(item.type ==='cake'){
      cartRow = <CakeItem item={item} quantityEditable={quantityEditable} formattedItemTotal={formattedItemTotal} onRemove={this.onRemove} formattedItemTotalwithTax={formattedItemTotalwithTax} />
    } else if (item.type === 'classiccake'){
      cartRow = <ClassicCakeItem item={item} quantityEditable={quantityEditable} formattedItemTotal={formattedItemTotal} onRemove={this.onRemove} formattedItemTotalwithTax={formattedItemTotalwithTax} />
    } else {
      cartRow = <CartItem item={item} quantityEditable={quantityEditable} formattedItemTotal={formattedItemTotal} onRemove={this.onRemove} formattedItemTotalwithTax={formattedItemTotalwithTax} />
    }

    return (
      <div className="cart--row">
        {cartRow}
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
          {item.options.writigOnCakeTypeNote && <p>Writing on Cake: {item.options.writigOnCakeTypeNote}</p>}
           {item.options.extras && <p>Special Instructions:{item.options.extras}</p>}
          {item.options.size && <p>Size: {item.options.size}</p>}
          {item.options.cakelayers && <p>Cake Layers: {item.options.cakelayers}</p>}
          {item.options.icing && <p>Icing: {item.options.icing}</p>}
          {item.options.trim && <p>Trim: {item.options.trim}</p>}
          {item.options.color && <p>Color: {item.options.color}</p>}
          {item.options.filling && <p>Filling: {item.options.filling}</p>}
          {item.options.side && <p>Side: {item.options.side}</p>}
          {item.options.decorationType && <p>Decoration Type: {item.options.decorationType}</p>}
          {item.options.decorqationTypeNote && <p>Decoration Type Note: {item.options.decorqationTypeNote}</p>}
        </div>
      </div>
    </div>
  );
};

const ClassicCakeItem = ({item,quantityEditable,formattedItemTotal,onRemove}) => {
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
          <p>Writing on Cake: {item.options.writigOnCakeTypeNote && item.options.writigOnCakeTypeNote}</p>
          {item.options.extras && <p>Special Instructiopns: {item.options.extras}</p>}
          {item.options.size && <p>Size: {item.options.size}</p>}
          {/* {item.options.cakelayers.length ? <p>Cake Layers: {item.options.cakelayers}</p>:''} */}
          {/* {item.options.icing.length ? <p>Icing: {item.options.icing}</p>:''} */}
          {item.options.trim && <p>Trim: {item.options.trim}</p>}
          {item.options.color && <p>Color: {item.options.color}</p>}
          {/* {item.options.filling.length ? <p>Filling: {item.options.filling}</p>:''} */}
          {item.options.side && <p>Side: {item.options.side}</p>}
          {item.options.decorationType && <p>Decoration Type: {item.options.decorationType}</p>}
          {item.options.decorqationTypeNote && <p>Decoration Type Note: {item.options.decorqationTypeNote}</p>}
        </div>
      </div>
    </div>
  );
};



const mapDispatchToProps = (dispatch) => ({
  startEditItem: (id, item) => dispatch(startEditItem(id, item)),
  startRemoveItem: (item) => dispatch(startRemoveItem(item))
});

export default connect(undefined, mapDispatchToProps)(CartListItem);
