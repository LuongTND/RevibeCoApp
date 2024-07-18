// src/redux/reducers/orderReducer.js
import * as actionTypes from '../actionTypes';

const initialState = {
    orders: [],
    loading: false,
    error: null
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.GET_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.payload,
                loading: false,
                error: null
            };
        case actionTypes.GET_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default orderReducer;
