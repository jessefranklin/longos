import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { startAddToCart }  from '../../actions/cart';
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
  isInCart(id) {
    let obj = this.props.cart.length ? this.props.cart.find(x => x.productId === id) : false;
    if(obj){
      return true;
    }
  }
  render() {
    const { item, cart } = this.props;
    const isInCart = this.isInCart(item.id) ? 'product--item active' : 'product--item';
    
    return (
      <div className={isInCart} onClick={this.handleShow}>
        <div className="img--container">
          <img src={item.imageLink} alt={item.name} />
        </div>
        <h4>{item.name} {item.category === 'Cake'?'Cake':''}</h4>
        
        {/* <p>{item.description}</p>
        {this.state.selectedProduct.option.piecesCount !=0 && <p> {this.state.selectedProduct.option.piecesCount} pieces</p>}
        {this.state.selectedProduct.option.servingSize && <p>Serves {this.state.selectedProduct.option.servingSize} people </p>}
         */}

        {item.category === 'Cake'?<CakeDescription item={item}/>:<ItemDescription item={item} />}

        <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
              <div className="img--container">
                <img src={item.imageLink} alt={item.name} />
              </div>
            </Modal.Header>
            
            {this.renderBody(item)}

          </Modal>
      </div>
    );
  }
}

const ItemDescription = ({item}) => {
  return (
    <div>
      {item.options.map(options => {
        if(options.servingSize) {
          return (
            <p key={options.id}>{options.name} Serves {options.servingSize} people </p>
          );
        } else {
          return (
            <p key={options.id}>{options.name} {options.piecesCount} pieces</p>
          );
        }
      })}
    </div>
  );
};

const CakeDescription = ({item}) => {
  return (
    <div>
      
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart
});


export default connect(mapStateToProps)(ProductsListItem);
