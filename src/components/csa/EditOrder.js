import React from 'react';
import { connect } from "react-redux";
import selectProducts from '../../selectors/products';
import sortByCategory from '../../selectors/sortByCategory';
import listCategory from '../../selectors/listCategory';
import ProductsListFilters from '../products/ProductsFilters';
import ProductsSidebar from '../products/ProductsSidebar';
import ProductsList from '../products/ProductsList';
import ProductsHeader from '../products/ProductsHeader';

class EditOrder extends React.Component {
  render() {
    const {loading, products, categories } = this.props;
    return (
      <div className="products">
        <ProductsHeader editOrder={true} />
        <aside className="products-sidebar">
          <ProductsListFilters />
          <ProductsSidebar categories={categories} />
        </aside>
        
        <ProductsList products={products} loading={loading} editOrder={true} />

      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: sortByCategory(selectProducts(state.products.items,state.filters)),
  categories: listCategory(state.products.items),
  profile: state.profile,
  loading: state.products.loading
});

export default connect(mapStateToProps)(EditOrder);