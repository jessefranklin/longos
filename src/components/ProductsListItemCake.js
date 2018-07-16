import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { startAddToCart }  from '../actions/cart';
import Select from 'react-select';
import { QuantitySelect } from './partials/QuantitySelect';

class ProductsListItemCake extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClose = this.handleClose.bind(this);

    this.state = {
      selectedOption: {
        value: 0, 
        label: this.props.item.options[0].name
      },
      selectedProduct: {
        productNumber: this.props.item.productNumber,
        name: this.props.item.name,
        description: this.props.item.description,
        option: this.props.item.options[0],
        quantity: 1,
        note: ''
      }
    };
  }

  onAddToCart = () => {
    this.props.handleClose();
    this.props.startAddToCart(
      this.state.selectedProduct
    );
  };

  handleClose(){
    this.props.handleClose();
  }

  render() {
    const item = this.props.item;
   
    return (
      <div>
        <Modal.Body>
        <div className="item--header">
          <h4>{item.name} XXX</h4>
          <h5>${this.state.selectedProduct.option.price.price}</h5>
        </div>

        <p>
          {item.description}
        </p>


        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onAddToCart}>+ Add To Cart</Button>  
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
            
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddToCart: (item) => dispatch(startAddToCart(item))
});

export default connect(undefined, mapDispatchToProps)(ProductsListItemCake);