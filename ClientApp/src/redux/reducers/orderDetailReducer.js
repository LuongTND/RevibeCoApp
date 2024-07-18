import { 
    GET_ORDER_DETAILS_REQUEST, 
    GET_ORDER_DETAILS_SUCCESS, 
    GET_ORDER_DETAILS_FAILURE 
} from '../actions/orderDetailActions';

const initialState = {
    orderDetails: [],
    loading: false,
    error: null
};

export const orderDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                orderDetails: action.payload
            };
        case GET_ORDER_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default orderDetailReducer;
