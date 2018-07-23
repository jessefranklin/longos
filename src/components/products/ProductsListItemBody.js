import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { startAddToCart }  from '../../actions/cart';
import Select from 'react-select';
import { QuantitySelect } from '../partials/QuantitySelect';
import uuid from 'uuid/v1';

class ProductsListItemBody extends Component {
  constructor(props, context) {
    super(props, context);

    this.onQuantityChange = this.onQuantityChange.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      selectedOption: {
        value: 0, 
        label: this.props.item.options[0].name
      },
      selectedProduct: {
        id: uuid(),
        productId: this.props.item.productNumber,
        productName: this.props.item.name,
        optionId: this.props.item.options[0].id,
        optionName: this.props.item.options[0].name,
        priceId: this.props.item.options[0].price.id,
        price: this.props.item.options[0].price.price,
        tax: "",
        quantity: 1,
        comment: ''
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

  onNoteChange = (e) => {
    const notes = e.target.value;
    const selectedProduct = {...this.state.selectedProduct}
    selectedProduct.comment = notes;
    this.setState(() => ({ selectedProduct }));
  };
  
  
  onSelectChange = (selectedOption) => {
    this.setState({ selectedOption });
    if (selectedOption) {
      const selectedProduct = {...this.state.selectedProduct}
      selectedProduct.optionId = this.props.item.options[selectedOption.value].id;
      selectedProduct.optionName = this.props.item.options[selectedOption.value].name;
      selectedProduct.priceId = this.props.item.options[selectedOption.value].price.id;
      selectedProduct.price = this.props.item.options[selectedOption.value].price.price;
      this.setState(() => ({ selectedProduct }));
    }
  }

  onQuantityChange = (selectedOption) => {
    const quantity = selectedOption;
    const selectedProduct = {...this.state.selectedProduct}
    selectedProduct.quantity = quantity;
    this.setState(() => ({ selectedProduct }));
  }

  selOptions= (item) => {
    let options = [];
    {item.options.map((item,index) => {
        options.push({ value: index, label: item.name });
    })}
    
    return options;
  }

  render() {
    const item = this.props.item;
    const tooltip = <Tooltip id="modal-tooltip">example.</Tooltip>;
    const options = this.selOptions(item);
    let opt = this.props.item.options[this.state.selectedOption.value];

    return (
      <div>
        <Modal.Body>
        <div className="item--header">
          <h4>{item.name}</h4>
          <h5>${this.state.selectedProduct.price}</h5>
        </div>

        <p>
          {item.description}
        </p>

        {this.props.item.options[this.state.selectedOption.value].piecesCount !=0 && <p> {this.props.item.options[this.state.selectedOption.value].piecesCount} pieces <OverlayTrigger overlay={tooltip}>
          <a href="#tooltip">?</a>
        </OverlayTrigger>{' '}</p>}

        {this.props.item.options[this.state.selectedOption.value].servingSize && <p>Serves {this.props.item.options[this.state.selectedOption.value].servingSize} people <OverlayTrigger overlay={tooltip}>
          <a href="#popover">?</a>
        </OverlayTrigger>{' '}</p>}

        <Select
          name="option"
          value={this.state.selectedOption}
          onChange={this.onSelectChange}
          options={options}
          searchable={false}
          clearable={false} 
        />

        <QuantitySelect onQuantityChange={this.onQuantityChange} quantity={this.state.selectedProduct.quantity}/> 

        <textarea
          placeholder="Add a note for your"
          onChange={this.onNoteChange}
        >
        </textarea>

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

export default connect(undefined, mapDispatchToProps)(ProductsListItemBody);