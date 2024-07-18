// reducers/couponReducer.js
import * as actionTypes from '../actionTypes';

const initialState = {
    coupons: [],
    loading: false,
    error: null
};

const couponReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_COUPONS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.GET_COUPONS_SUCCESS:
            return {
                ...state,
                loading: false,
                coupons: action.payload,
                error: null
            };
        case actionTypes.GET_COUPONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default couponReducer;
