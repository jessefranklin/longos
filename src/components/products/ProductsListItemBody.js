import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { startAddToCart, startEditItem }  from '../../actions/cart';
import en from '../../server/en-lang';
import Select from 'react-select';
import { QuantitySelect } from '../partials/QuantitySelect';
import uuid from 'uuid/v1';

class ProductsListItemBody extends Component {
  constructor(props, context) {
    super(props, context);

    this.onQuantityChange = this.onQuantityChange.bind(this);
    this.handleClose = this.handleClose.bind(this);

    let pieceorserving = this.props.item.options[0].piecesCount !=0 ? this.props.item.options[0].piecesCount+' pieces' : 'Serves '+ this.props.item.options[0].servingSize+'';
    let itemName = this.props.item.options[0].name +' - '+ pieceorserving;

    this.state = {
      selectedOption: {
        value: 0, 
        label: itemName 
      },
      selectedProduct: {
        id: uuid(),
        type: 'item',
        productId: this.props.item.id,
        productName: this.props.item.name,
        productImage: this.props.item.imageLink,
        optionId: this.props.item.options[0].id,
        optionName: this.props.item.options[0].name,
        priceId: this.props.item.options[0].price.id,
        price: this.props.item.options[0].price.price,
        tax: 0,
        quantity: 1,
        comment: ''
      }
    };
  }

  onAddToCart = () => {
    let obj = this.props.cart.length ? this.props.cart.find(x => x.productId === this.state.selectedProduct.productId) : '';
    if(obj && obj.optionId == this.state.selectedProduct.optionId && obj.comment == this.state.selectedProduct.comment){
      
      const selectedProduct = {...this.state.selectedProduct}
      selectedProduct.quantity = obj.quantity + this.state.selectedProduct.quantity;

      this.props.startEditItem(
        obj.id,
        selectedProduct
      );
    } else {
      this.props.startAddToCart(
        this.state.selectedProduct
      );
    }
    this.props.handleClose();
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
        let pieceorserving = item.piecesCount !=0 ? item.piecesCount+' pieces' : 'Serves '+ item.servingSize+' people';
        let itemName = item.name +' - '+ pieceorserving;
        options.push({ value: index, label: itemName });
    })}
    
    return options;
  }

  render() {
    const item = this.props.item;
    const tooltip = <Tooltip id="modal-tooltip">example.</Tooltip>;
    const sizeOptions = this.selOptions(item);
    let opt = this.props.item.options[this.state.selectedOption.value];

    return (
      <div>
        <Modal.Body>
        <div className="item--header">
          <h2>{item.name}</h2>
          <h5>${this.state.selectedProduct.price}</h5>
        </div>

       

        {this.props.item.options[this.state.selectedOption.value].piecesCount !=0 && <p> {this.props.item.options[this.state.selectedOption.value].piecesCount} pieces <OverlayTrigger overlay={tooltip}>
          <a href="#tooltip">?</a>
        </OverlayTrigger>{' '}</p>}

        {this.props.item.options[this.state.selectedOption.value].servingSize && <p>Serves {this.props.item.options[this.state.selectedOption.value].servingSize} people <OverlayTrigger overlay={tooltip}>
          <a href="#popover">?</a>
        </OverlayTrigger>{' '}</p>}
        
        <p>
          {item.description}
        </p>
        
        <div className="item--options">
          <QuantitySelect onQuantityChange={this.onQuantityChange} quantity={this.state.selectedProduct.quantity}/> 

          <Select
            name="option"
            value={this.state.selectedOption}
            onChange={this.onSelectChange}
            options={sizeOptions}
            disabled={item.options.length === 1?true:false}
            searchable={false}
            clearable={false} 
          />
        </div>

        <textarea
          placeholder="Add a note for your"
          onChange={this.onNoteChange}
          rows="4"
        >
        </textarea>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onAddToCart} className="btn-add">+ Add To Cart</Button>  
          <Button onClick={this.handleClose}>Close</Button>
          {item.servedColdMessage === 'True' ? (
            <div className="item--disclaimer">
                {en.product.served}
            </div>
            ) :''}
         
        </Modal.Footer>
            
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddToCart: (item) => dispatch(startAddToCart(item)),
  startEditItem: (id,update) => dispatch(startEditItem(id,update))
});

const mapStateToProps = (state) => ({
  cart: state.cart
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsListItemBody);