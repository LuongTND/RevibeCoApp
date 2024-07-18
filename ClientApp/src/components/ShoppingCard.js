import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RoutePath from '../routes/RoutePath';
import { CartContext } from '../context/CartContext';

const ShoppingCard = () => {
    const { cartItems, fetchCartItems, removeFromCart } = useContext(CartContext);
    const [localCartItems, setLocalCartItems] = useState([]);

    useEffect(() => {
        setLocalCartItems(cartItems);
        console.log(cartItems);
    }, [cartItems]);

    const updateQuantity = async (productId, quantity) => {
        try {
            console.log('Updating quantity for item', productId, 'to', quantity);
            await axios.put(`api/shop/${productId}?quantity=${quantity}`);
            // Update the cart items with the new quantity
            setLocalCartItems(prevItems =>
                prevItems.map(item =>
                    item.productId === productId ? { ...item, quantity } : item
                )
            );
            fetchCartItems();
        } catch (error) {
            console.error('Error updating item quantity:', error);
            // Handle error appropriately, such as displaying an error message.
        }
    };

    const handleQuantityChange = (productId, event) => {
        const newQuantity = parseInt(event.target.value, 10);
        if (newQuantity > 0) {
            // Update the cart item quantity in state immediately for responsive UI
            setLocalCartItems(prevItems =>
                prevItems.map(item =>
                    item.productId === productId ? { ...item, quantity: newQuantity } : item
                )
            );
            // Send the update to the server
            updateQuantity(productId, newQuantity);
        }
    };

    const incrementQuantity = (productId) => {
        const item = localCartItems.find(item => item.productId === productId);
        const newQuantity = item.quantity + 1;
        setLocalCartItems(prevItems =>
            prevItems.map(item =>
                item.productId === productId ? { ...item, quantity: newQuantity } : item
            )
        );
        updateQuantity(productId, newQuantity);
    };

    const decrementQuantity = (productId) => {
        const item = localCartItems.find(item => item.productId === productId);
        const newQuantity = Math.max(1, item.quantity - 1);
        setLocalCartItems(prevItems =>
            prevItems.map(item =>
                item.productId === productId ? { ...item, quantity: newQuantity } : item
            )
        );
        updateQuantity(productId, newQuantity);
    };

    return (
        <div className="container mb-5">
            <div className="row bootstrap snippets">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="col-lg-12 col-sm-12 text-center mb-3">
                        <h2 className="title">ĐƠN HÀNG</h2>
                    </div>
                    <div className="col-lg-12 col-sm-12 hero-feature">
                        <div className="table-responsive">
                            <table className="table table-bordered tbl-cart">
                                <thead>
                                    <tr>
                                        <th className="hidden-xs">Ảnh</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                        <th className="text-center">Tổng</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {localCartItems.map(item => (
                                        <tr key={item.productId}>
                                            <td className="hidden-xs d-flex justify-content-center align-items-center">
                                                <img src={item.imageUrl[0].imageUrl} alt={item.name} title width={50} />
                                            </td>
                                            <td>{item.categoryName} {item.name}</td>
                                            <td>{item.price.toFixed(0)} VNĐ</td>
                                            <td>
                                                <div className="input-group">
                                                    <span className="input-group-btn">
                                                        <button
                                                            className="btn btn-default"
                                                            type="button"
                                                            onClick={() => decrementQuantity(item.productId)}
                                                        >
                                                            <i className="bi bi-dash-lg"></i>
                                                        </button>
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={item.quantity}
                                                        onChange={(e) => handleQuantityChange(item.productId, e)}
                                                        min="1"
                                                    />
                                                    <span className="input-group-btn">
                                                        <button
                                                            className="btn btn-default"
                                                            type="button"
                                                            onClick={() => incrementQuantity(item.productId)}
                                                        >
                                                            <i className="bi bi-plus-lg"></i>
                                                        </button>
                                                    </span>
                                                </div>
                                            </td>
                                            <td>{(item.quantity * item.price).toFixed(0)} VNĐ</td>
                                            <td className="text-center">
                                                <button className='btn btn-success' onClick={() => removeFromCart(item.productId)}>
                                                    <i className="bi bi-trash3-fill"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={6} align="right">
                                            Total: {localCartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(0)} VNĐ
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="btn-group btns-cart">
                            <Link to={RoutePath.ProductPage} className="btn btn-primary">
                                <i className="fa fa-arrow-circle-left" /> Tiếp tục mua hàng
                            </Link>
                            {/* <button type="button" className="btn btn-primary">Update Cart</button> */}
                            <Link to={RoutePath.CHECKOUT} className="btn btn-primary">
                                Thanh toán <i className="fa fa-arrow-circle-right" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCard;
