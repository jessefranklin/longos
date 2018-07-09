import React from 'react';
import ProductsListItem from './ProductsListItem';

class ProductsList extends React.Component {
  render() {
    const { products, loading } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="content--container">
        {Object.keys(products).map(function(key, index) {
          const refKey = key.replace(/\s+/g, '').toLowerCase();
          return <div key={index} id={refKey} className="element">
            <h2>{key}</h2> 
            {products[key].map(product => {
              return <ProductsListItem key={product.id} item={product} />;
            })}
          </div>;
        })}
      </div>
    );
  }
}


export default ProductsList;