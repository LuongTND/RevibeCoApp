// src/redux/actions/orderActions.js
import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getOrdersRequest = () => ({
    type: actionTypes.GET_ORDERS_REQUEST
});

export const getOrdersSuccess = (orders) => ({
    type: actionTypes.GET_ORDERS_SUCCESS,
    payload: orders
});

export const getOrdersFailure = (error) => ({
    type: actionTypes.GET_ORDERS_FAILURE,
    payload: error
});

export const getOrders = (token) => {
    return async (dispatch) => {
        dispatch(getOrdersRequest());
        try {
            const response = await axios.get('api/orders', {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });
            dispatch(getOrdersSuccess(response.data));
        } catch (error) {
            dispatch(getOrdersFailure(error.message));
        }
    };
};
