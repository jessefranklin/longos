import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { history } from '../../routers/AppRouter';
import { Button, Modal, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { startAddToCart, startEditItem }  from '../../actions/cart';
import en from '../../const/en-lang';
import Select from 'react-select';
import { QuantitySelect } from '../partials/QuantitySelect';
import uuid from 'uuid/v1';
import axios from 'axios';
import { baseUrl, headers } from "../../const/global";
const orderAPI = baseUrl+'/order';

class ProductsListItemBody extends Component {
  static contextTypes = {
    router: PropTypes.object
  } 
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
        counter: this.props.item.counter,
        productId: this.props.item.id,
        productName: this.props.item.name,
        productImage: this.props.item.imageLink,
        optionId: this.props.item.options[0].id,
        optionName: this.props.item.options[0].name,
        priceId: this.props.item.options[0].price.id,
        price: this.props.item.options[0].price.price,
        tax: this.props.item.options[0].price.tax,
        taxName: this.props.item.options[0].price.taxName,
        upc: this.props.item.options[0].price.upc,
        quantity: 1,
        comment: ''
      }
    };
  }

  onAddToCart = () => {
    if(this.props.editOrder){
      //Edit order CSA page add to cart
      this.onAddToCartCSA();
    } else {
      //Customer facing products page add to cart
      this.onAddToCartCustomer();
    }
  };
  
  onAddToCartCustomer = () => {
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
  }

  onAddToCartCSA = () => {
    const orderid = this.props.csaOrder.order.id;
    let url = orderAPI +`/${orderid}/updateitem`;

    axios.put(url,this.state.selectedProduct, headers).then(
      (response) => {
        this.props.handleClose();
        history.push(`/orderDashboard/orderDetail/${orderid}`);
      },
      (err) => {
        console.log(err);
      }
    )
  }

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

       

        {this.props.item.options[this.state.selectedOption.value].piecesCount !=0 && <p> {this.props.item.options[this.state.selectedOption.value].piecesCount} pieces </p>}

        {this.props.item.options[this.state.selectedOption.value].servingSize && <p>Serves {this.props.item.options[this.state.selectedOption.value].servingSize} people </p>}
        
        <p>
          {item.description}
          {item.servedColdMessage === 'True' ? '*':''}
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
          placeholder={en.product.textarea}
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
  cart: state.cart,
  csaOrder: state.csaOrder
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsListItemBody);