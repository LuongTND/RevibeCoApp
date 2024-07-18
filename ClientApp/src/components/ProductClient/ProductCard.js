import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RoutePath from "../../routes/RoutePath";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from '../../context/CartContext';

const ProductCard = ({ name, price, imageUrl, productId }) => {
    const { addToCart } = useContext(CartContext);
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleLikeToggle = () => {
        setIsLiked(prevIsLiked => !prevIsLiked);
    };

    const handleAddToCart = () => {
        addToCart(productId, name);
    };

    const formatPrice = (price) => {
        return price.toLocaleString('en-US');
    };

    return (
        <div
            className="col-md-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="card"
                style={{ position: "relative", minHeight: "373px" }}
            >
                <div className="ccc p-2" style={{ position: "relative" }}>
                    <p className="text-center">
                        <img
                            src={imageUrl}
                            className="imw mt-5"
                            style={{
                                minHeight: "270px",
                                maxHeight: "270px",
                                boxSizing: "content-box",
                            }}
                            alt={name}
                        />
                    </p>
                    {isHovered && (
                        <div
                            className="hover-icons"
                            style={{ position: "absolute", top: "10px", right: "10px" }}
                        >
                            <Link
                                to={`${RoutePath.PRODUCTINFO.replace(":productId", productId)}`}
                                className="text-decoration-none mr-2"
                            >
                                <i className="bi bi-info-circle"></i>
                            </Link>
                            <i
                                className={`bi ${isLiked
                                    ? "bi-heart-fill text-danger"
                                    : "bi-heart-fill text-warning"
                                    }`}
                                onClick={handleLikeToggle}
                                style={{ cursor: "pointer" }}
                            ></i>
                        </div>
                    )}
                </div>
                <div className="card-body" style={{ height: "80px" }}>
                    {isHovered ? (
                        <button
                            className="btn btn-danger w-100"
                            style={{ height: "40px" }}
                            onClick={handleAddToCart}
                        >
                            Add to cart
                        </button>
                    ) : (
                        <>
                            <h5 className="text-center">{name}</h5>
                            <p className="text-center">Price: {formatPrice(price)} VNĐ</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
