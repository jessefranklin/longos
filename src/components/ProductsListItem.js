import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { startAddToCart }  from '../actions/cart';
import Select from 'react-select';
import ProductsListItemBody from './ProductsListItemBody';
import ProductsListItemCake from './ProductsListItemCake';

class ProductsListItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  renderBody = (item) => {
    if(item.category === 'Cake') {
      return (
        <ProductsListItemCake item={item} handleClose={this.handleClose} />
      );
    } else {
      return (
        <ProductsListItemBody item={item} handleClose={this.handleClose} />
      );
    }
  }

  render() {
    const item = this.props.item;
   
    return (
      <div className='product--item' onClick={this.handleShow}>
        <div className="img--container">
          <img src={item.imageLink} alt={item.name} />
        </div>
        <h4>{item.name}</h4>
        {/* <p>{item.description}</p>
        {this.state.selectedProduct.option.piecesCount !=0 && <p> {this.state.selectedProduct.option.piecesCount} pieces</p>}
        {this.state.selectedProduct.option.servingSize && <p>Serves {this.state.selectedProduct.option.servingSize} people </p>}
         */}
        <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title><img src={item.imageLink} alt={item.name} /></Modal.Title>
            </Modal.Header>
            
            {this.renderBody(item)}

           

          </Modal>
      </div>
    );
  }
}

export default ProductsListItem;