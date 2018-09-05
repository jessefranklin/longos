import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Popover, Tooltip, OverlayTrigger, Badge } from 'react-bootstrap';
import { startAddToCart }  from '../../actions/cart';
import Select from 'react-select';
import PropTypes from "prop-types";
import ProductsListItemBody from './ProductsListItemBody';
import ProductsListItemCake from './ProductsListItemCake';
import ProductsListItemClassicCake from './ProductsListItemClassicCake';

class ProductsListItem extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
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

  csaEditOrder = (payload) => {
    console.log(this.props.csaOrder.order.id,payload);
    this.context.router.history.goBack();
  }

  renderBody = (item) => {
    if(item.category === 'Signature Cakes') {
      return (
        <ProductsListItemCake item={item} handleClose={this.handleClose} editOrder={this.props.editOrder} csaEditOrder={this.csaEditOrder}/>
      );
    } else if(item.category === 'Classic Cakes' || item.category === 'Cupcake Cakes' ) {
      return (
        <ProductsListItemClassicCake item={item} handleClose={this.handleClose} editOrder={this.props.editOrder} />
      );
    } else {
      return (
        <ProductsListItemBody item={item} handleClose={this.handleClose} editOrder={this.props.editOrder} csaEditOrder={this.csaEditOrder}/>
      );
    }
  }
  isInCart(id) {
    let obj = this.props.cart.length ? this.props.cart.filter(x => x.productId === id) : false;
    if(obj.length){
      const count = obj.map((item) => item.quantity)
                      .reduce((sum, value) => sum+value,0);

      return count;
    }
  }
  render() {
    const { item, cart } = this.props;
    const isInCart = this.isInCart(item.id);

    return (
      <div className={isInCart ? 'product--item active' : 'product--item'} onClick={this.handleShow}>
        {isInCart ? <div className="indicator">{isInCart}</div> : ''}
        <div className="img--container">
          <img src={item.imageLink} alt={item.name} />
        </div>
        <div className="meta--container">
          <h4><Badge>{item.productNumber}</Badge> {item.name} {item.category === 'Cake'?'Cake':''}</h4>
          {item.category === 'Cake'?<CakeDescription item={item}/>:<ItemDescription item={item} />}
        </div>

        <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header className="img--header" closeButton>
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
      {item.options.length > 1 ? (
        'Options Available'
      ) : (
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

      )}
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
  cart: state.cart,
  csaOrder: state.csaOrder
});



export default connect(mapStateToProps)(ProductsListItem);
