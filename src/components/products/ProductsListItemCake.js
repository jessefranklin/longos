import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { startAddToCart }  from '../../actions/cart';
import cakeOptions from '../../server/cake.json';
import Select from 'react-select';
import { QuantitySelect } from '../partials/QuantitySelect';
import { OptionsSelect } from '../partials/OptionsSelect';
import { TextField } from '../partials/TextField';
import uuid from 'uuid/v1';
import _ from 'lodash';

class ProductsListItemCake extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClose = this.handleClose.bind(this);
    this.onChange = this.onChange.bind(this);

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
      },
      cakeOptions: {
        size: '',
        cakelayers: '',
        icing: '',
        trim: '',
        color: '',
        filling: '',
        side: '',
        decorationType: '',
        decorqationTypeNote: '',
        writingOnCakeType: '',
        writingOnCakeNote: '', 
        Extras: ''
      }
    };
  }

  onAddToCart = () => {
    const cakeOrder = {...this.state.selectedProduct}
    cakeOrder.options = this.state.cakeOptions;
    console.log(cakeOrder);
    this.props.handleClose();
    this.props.startAddToCart(
      cakeOrder
    );
  };

  handleClose(){
    this.props.handleClose();
  }

  onChange = (val, name) => {
    const cakeOptions = {...this.state.cakeOptions}
    cakeOptions[name] = val;
    this.setState(() => ({ cakeOptions }));
  };

  render() {
    const item = this.props.item;
   
    return (
      <div>
        <Modal.Body>
        <div className="item--header">
          <h4>{item.name}</h4>
          <h5>Starting at ${this.state.selectedProduct.price?this.state.selectedProduct.price: cakeOptions.fields[0].options[0].value}</h5>
        </div>

        <p>
          {item.description}
        </p>

        {cakeOptions.fields.map(options => {
          return <OptionsSelect 
            key={options.label} 
            options={options}
            value={this.state.cakeOptions[options.name]}
            onChange={this.onChange}
            />
        })}

        {cakeOptions.details.map((textfield,index) => {
          return <div key={index}>
            <h4>{textfield.label}</h4> 
               <TextField 
                key={'p'+ index} 
                properties={textfield}
                value={this.state[textfield.name]}
                onChange={this.onChange}
              />

          </div>;
        })}

        {cakeOptions.disclaimers.map(disclaimers => {
          return disclaimers.header;
        })}

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