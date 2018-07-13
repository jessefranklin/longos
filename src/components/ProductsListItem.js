import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { startAddToCart }  from '../actions/cart';
import Select from 'react-select';
import { QuantitySelect } from './partials/QuantitySelect';

class ProductsListItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onQuantityChange = this.onQuantityChange.bind(this);

    this.state = {
      show: false,
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
    this.setState({ show: false });
    this.props.startAddToCart(
      this.state.selectedProduct
    );
  };

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
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
      <div className='product--item' onClick={this.handleShow}>
        <div className="img--container">
          <img src={item.imageLink} alt={item.name} />
        </div>
        <h4>{item.name}</h4>
        <p>{item.description}</p>
        {this.state.selectedProduct.option.piecesCount !=0 && <p> {this.state.selectedProduct.option.piecesCount} pieces</p>}
        {this.state.selectedProduct.option.servingSize && <p>Serves {this.state.selectedProduct.option.servingSize} people </p>}
        <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title><img src={item.imageLink} alt={item.name} /></Modal.Title>
            </Modal.Header>
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
          </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddToCart: (item) => dispatch(startAddToCart(item))
});

export default connect(undefined, mapDispatchToProps)(ProductsListItem);