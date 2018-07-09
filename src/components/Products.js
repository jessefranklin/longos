import React from 'react';
import { connect } from "react-redux";
import selectProducts from '../selectors/products';
import ProductsListFilters from './ProductsFilters';
import ProductsSidebar from './ProductsSidebar';
import sortByCategory from '../selectors/sortByCategory';
import listCategory from '../selectors/listCategory';
import ProductsList from './ProductsList';
import { fetchProducts } from "../actions/products";
import ProductsHeader from '../components/ProductsHeader';


class Products extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }
  render() {
    const {loading, products, categories } = this.props;
    return (
      <div className="products">
        <ProductsHeader />
        <aside className="products-sidebar">
          <ProductsListFilters />
          <ProductsSidebar categories={categories} />
        </aside>
        <ProductsList products={products} loading={loading} />
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

export default connect(mapStateToProps)(Products);