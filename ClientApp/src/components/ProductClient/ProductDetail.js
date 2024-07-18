import React, { useState, useEffect, useContext  } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/ProductDetail.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { CartContext } from '../../context/CartContext';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/products/${productId}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError(error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container">
               <ToastContainer /> {/* Add ToastContainer here */}
            <div className="product-content product-wrap clearfix product-detail p-sm-0 border-0">
                <div className="row">
                    <div className="col-md-6 col-sm-12 col-xs-12">
                        <div className="product-image">
                            <div id="myCarousel-2" className="carousel slide">
                                <ol className="carousel-indicators">
                                    {product.productImages.map((image, index) => (
                                        <li key={index} data-target="#myCarousel-2" data-slide-to={index} className={index === 0 ? 'active' : ''}></li>
                                    ))}
                                </ol>
                                <div className="carousel-inner">
                                    {product.productImages.map((image, index) => (
                                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                            <img src={image.imageUrl} className="img-responsive" alt="" />
                                        </div>
                                    ))}
                                </div>
                                <a className="carousel-control-prev" href="#myCarousel-2" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#myCarousel-2" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-md-offset-1 col-sm-12 col-xs-12">
                        <h2 className="name">{product.name}</h2>
                        <div style={{ fontSize: '8px' }}>
                            <i className="fa fa-star fa-2x text-warning"></i>
                            <i className="fa fa-star fa-2x text-warning"></i>
                            <i className="fa fa-star fa-2x text-warning"></i>
                            <i className="fa fa-star fa-2x text-warning"></i>
                            <i className="fa fa-star fa-2x text-muted"></i>
                            <span className="fa fa-2x">
                                <h5>(109) Votes</h5>
                            </span>
                        </div>
                        <hr />
                        <div>
                            <h3 className="price-container">
                                {product.price} VNĐ
                            </h3>
                        </div>
                        <hr />
                        <div className="description description-tabs" style={{ minHeight: '430px' }}>
                            <ul id="myTab" className="nav nav-pills">
                                <li className="nav-item">
                                    <a href="#more-information" data-toggle="tab" className="nav-link active">Product Description</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#specifications" data-toggle="tab" className="nav-link">Specifications</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#reviews" data-toggle="tab" className="nav-link">Reviews</a>
                                </li>
                            </ul>
                            <div id="myTabContent" className="tab-content">
                                <div className="tab-pane fade show active" id="more-information" style={{ maxHeight: '219px', overflowY: 'auto', scrollbarWidth: 'none', '-ms-overflow-style': 'none'  }}>
                                    <br />
                                    <strong>Description Title</strong>
                                    <p>
                                        {product.description}
                                    </p>
                                </div>
                                <div className="tab-pane fade" id="specifications" style={{ maxHeight: '419px', overflowY: 'auto', '-ms-overflow-style': 'none'  }}>
                                    <br />
                                    <dl className="row">
                                        <p className="col-sm-9">{product.information}</p>
                                    </dl>
                                </div>
                                <div className="tab-pane fade" id="reviews" style={{ maxHeight: '219px', overflowY: 'auto', scrollbarWidth: 'none', '-ms-overflow-style': 'none'  }}>
                                    <br />
                                    <form method="post" className="well padding-bottom-10" onSubmit={(e) => e.preventDefault()}>
                                        <textarea rows="2" className="form-control" placeholder="Write a review"></textarea>
                                        <div className="margin-top-10">
                                            <button className="btn btn-sm btn-primary pull-right" type="submit">Submit Review</button>
                                            <a className="btn btn-link btn-icon-left" href="#reviews"><i className="fa fa-arrow-left"></i> Back</a>
                                        </div>
                                    </form>
                                    <hr />
                                    {product.productComments.map((comment, index) => (
                                        <div key={index} className="review">
                                            <strong>User</strong> <span className="text-muted">{comment.createdAt}</span>
                                            <div className="review-text">
                                                {comment.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <button className="btn btn-secondary btn-block" type="button" onClick={() => addToCart(productId, product.name)}>Add to cart</button>
                            </div>
                            {/* <div className="col">
                                <button className="btn btn-primary btn-block" type="button">Buy now</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
