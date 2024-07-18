import axios from 'axios';

export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILURE = 'GET_ORDER_DETAILS_FAILURE';

export const getOrderDetails = (orderId, token) => async dispatch => {
    dispatch({ type: GET_ORDER_DETAILS_REQUEST });
    try {
        const response = await axios.get(`api/OrderDetails/ByOrder/${orderId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        dispatch({ type: GET_ORDER_DETAILS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_ORDER_DETAILS_FAILURE, payload: error.message });
    }
};
