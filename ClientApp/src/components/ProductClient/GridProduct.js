// GridProduct.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../../redux/actions/productActions';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import RoutePath from '../../routes/RoutePath';

class GridProduct extends Component {
  componentDidMount() {
    this.props.fetchProducts(1, 6); // Fetch first page with 6 products
  }

  render() {
    const { loading, error, products } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div>
        <Link to={RoutePath.ProductPage}>
        <div className="d-flex justify-content-center">
        <h3 className="heading text-decoration-none text-center my-3 sec-btn">Mua sắm</h3>
        </div></Link>
        
        <div className="container">
          <div className="row product">
            {products.map(product => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                    imageUrl={product.images[0].imageUrl}
                    productId ={product.id}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.products.loading,
  error: state.products.error,
  products: state.products.products
});

export default connect(mapStateToProps, { fetchProducts })(GridProduct);
