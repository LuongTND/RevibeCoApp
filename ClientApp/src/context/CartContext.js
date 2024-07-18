import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('/api/shop');
            const items = response.data;
            setCartItems(items);
            const count = items.reduce((total, item) => total + item.quantity, 0);
            setCartItemCount(count);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const addToCart = async (productId, productName) => {
        try {
            await axios.post(`/api/shop/${productId}`);
            fetchCartItems();
            toast.success(`${productName} added to cart successfully!`);
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Failed to add item to cart!');
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`/api/shop/${productId}`);
            fetchCartItems();
            toast.success('Item removed from cart successfully!');
        } catch (error) {
            console.error('Error removing item from cart:', error);
            toast.error('Failed to remove item from cart!');
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <CartContext.Provider value={{ cartItems, cartItemCount, fetchCartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
