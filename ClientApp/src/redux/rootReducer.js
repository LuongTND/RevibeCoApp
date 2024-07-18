// src/redux/rootReducer.js
import { combineReducers } from 'redux';
import userReducer from '../redux/reducers/userReducer'; // Import userReducer từ file userReducer.js
import productReducer from '../redux/reducers/productReducer'; // Import productReducer từ file productReducer.js



const rootReducer = combineReducers({
    userReducer: userReducer, // Đặt tên cho reducer và gán reducer tương ứng vào đó
    products: productReducer // Đặt tên cho reducer và gán reducer tương ứng vào đó
});

export default rootReducer;
