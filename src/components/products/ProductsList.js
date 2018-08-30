import React from 'react';
import ProductsListItem from './ProductsListItem';

class ProductsList extends React.Component {
  render() {
    const { products, loading, editOrder } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="product--container">
      
        {Object.keys(products).map(function(key, index) {
          const refKey = key.replace(/\s+/g, '').toLowerCase();
          return <div key={index} id={refKey} className="element">
            <h2>{key}</h2> 
            <div className="wrap-eq-height">
              {products[key].map(product => {
                return <ProductsListItem key={product.id} item={product} editOrder={editOrder} />;
              })}
            </div>
          </div>;
        })}
      </div>
    );
  }
}

export default ProductsList;