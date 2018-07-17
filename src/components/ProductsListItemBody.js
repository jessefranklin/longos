import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { startAddToCart }  from '../actions/cart';
import Select from 'react-select';
import { QuantitySelect } from './partials/QuantitySelect';

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
        productNumber: parseInt(this.props.item.productNumber),
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

  onNoteChange = (e) => {
    const notes = e.target.value;
    const selectedProduct = {...this.state.selectedProduct}
    selectedProduct.note = notes;
    this.setState(() => ({ selectedProduct }));
    
  };

  onSelectChange = (selectedOption) => {
    this.setState({ selectedOption });
    if (selectedOption) {
      const selectedProduct = {...this.state.selectedProduct}
      selectedProduct.option = this.props.item.options[selectedOption.value];
      this.setState(() => ({ selectedProduct }));
    }
  }

  onQuantityChange = (selectedOption) => {
    const quantity = selectedOption.value;
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
   
    return (
      <div>
        <Modal.Body>
        <div className="item--header">
          <h4>{item.name}</h4>
          <h5>${this.state.selectedProduct.option.price.price}</h5>
        </div>

        <p>
          {item.description}
        </p>

        {this.state.selectedProduct.option.piecesCount !=0 && <p> {this.state.selectedProduct.option.piecesCount} pieces <OverlayTrigger overlay={tooltip}>
          <a href="#tooltip">?</a>
        </OverlayTrigger>{' '}</p>}

        {this.state.selectedProduct.option.servingSize && <p>Serves {this.state.selectedProduct.option.servingSize} people <OverlayTrigger overlay={tooltip}>
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