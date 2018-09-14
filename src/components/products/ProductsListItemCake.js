import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { startAddToCart }  from '../../actions/cart';
import cakeOptions from '../../server/cake.json';
import Select from 'react-select';
import { QuantitySelect } from '../partials/QuantitySelect';
import { OptionsSelect } from '../partials/OptionsSelect';
import { CreateableSelect } from '../partials/CreateableSelect';
import { TextField } from '../partials/TextField';
import en from '../../const/en-lang';
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
        type: 'cake',
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

  selOptions= (item) => {
    let options = [];
    {item.options.map((item,index) => {
        options.push({ value: index, label: item.name });
    })}

    return options;
  }

  render() {
    const item = this.props.item;
    const options = this.selOptions(item);
    let opt = item.options[this.state.selectedOption.value];

    return (
      <div>
        <Modal.Body>
        <div className="item--header">
        <div><h2>{this.state.selectedProduct.productName} {this.state.selectedProduct.type === 'cake'?'Cake':''}</h2><p className="desc-cake">{opt.name}</p></div>
        <h5><span className="price-text">Starting at</span><br /> ${opt.price.price}</h5>
        </div>

        <p>
          {item.description}
        </p>

        <div className="item--cake-options">
          <Select
            name="option"
            value={this.state.selectedOption}
            onChange={this.onSelectChange}
            options={options}
            searchable={false}
            clearable={false}
          />

        {cakeOptions.fields.map(options => {
          return <CreateableSelect
            key={options.label}
            options={options}
            value={this.state.cakeOptions[options.name]}
            onChange={this.onChange}  
            clearable={true} 
            />
        })}

        </div>

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

        {en.product.nutfree}
        {en.cakes.characterDisclaimer}

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onAddToCart} className="btn-primary btn-left btn-green">+ Add To Cart</Button>
          <Button onClick={this.handleClose} className="btn-primary btn-right">Cancel</Button>
        </Modal.Footer>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddToCart: (item) => dispatch(startAddToCart(item))
});

export default connect(undefined, mapDispatchToProps)(ProductsListItemCake);
