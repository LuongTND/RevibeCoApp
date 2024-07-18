import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem } from 'reactstrap'; 
import ProductCard from '../components/ProductClient/ProductCard'
import ReactPaginate from 'react-paginate';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selectedCategory: localStorage.getItem('selectedCategory') || '', // Lấy selectedCategory từ localStorage
            products: []
        };
    }

    componentDidMount() {
        axios.get('/api/ProductCategories')
            .then(response => {
                const firstCategory = response.data.results[0];
                this.setState({
                    categories: response.data.results,
                    selectedCategory: localStorage.getItem('selectedCategory') || firstCategory.name // Lấy selectedCategory từ localStorage hoặc sử dụng firstCategory.name
                });
                this.fetchProductsByCategory(localStorage.getItem('selectedCategory') || firstCategory.name); // Sử dụng selectedCategory từ localStorage hoặc firstCategory.name
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }

    fetchProductsByCategory(categoryName) {
        axios.get(`/api/Products/by-category?categoryNames=${categoryName}`)
            .then(response => {
                this.setState({ products: response.data });
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedCategory !== prevState.selectedCategory) {
            if (this.state.selectedCategory) {
                localStorage.setItem('selectedCategory', this.state.selectedCategory); // Lưu selectedCategory vào localStorage
                axios.get(`/api/Products/by-category?categoryNames=${this.state.selectedCategory}`)
                    .then(response => {
                        this.setState({ products: response.data });
                    })
                    .catch(error => {
                        console.error('Error fetching products:', error);
                    });
            }
        }
    }

    handleCategoryClick = (categoryName) => {
        this.setState({ selectedCategory: categoryName });
    };

    render() {
        const { categories, products } = this.state;

        return (
            <div className="container my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-center mb-4">
                            <div className="d-flex flex-wrap">
                                {categories.map((category) => (
                                    <button
                                        key={category.name}
                                        className="btn btn-outline m-2"
                                        style={{
                                            borderColor: '#9D6330',
                                            color: '#9D6330',
                                        }}
                                        onClick={() => this.handleCategoryClick(category.name)}
                                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#9D6330', e.target.style.color = '#fff')}
                                        onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent', e.target.style.color = '#9D6330')}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='container my-5'>
                        <div className="menu-list-row">
                            <div className="row g-xxl-5 bydefault_show" id="menu-dish">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        name={product.name}
                                        price={product.price}
                                        imageUrl={product.images[0].imageUrl}
                                        productId={product.id}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;
