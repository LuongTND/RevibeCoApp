// actions/couponActions.js
import axios from 'axios';
import * as actionTypes from '../actionTypes';

export const getCouponsRequest = () => ({
    type: actionTypes.GET_COUPONS_REQUEST
});

export const getCouponsSuccess = (coupons) => ({
    type: actionTypes.GET_COUPONS_SUCCESS,
    payload: coupons
});

export const getCouponsFailure = (error) => ({
    type: actionTypes.GET_COUPONS_FAILURE,
    payload: error
});

export const getCoupons = (token) => {
    return async (dispatch) => {
        dispatch(getCouponsRequest());
        try {
            const response = await axios.get('/api/coupons', {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });
            dispatch(getCouponsSuccess(response.data));
        } catch (error) {
            dispatch(getCouponsFailure(error.message));
        }
    };
};
export const getCouponCodeRequest = () => ({
    type: actionTypes.GET_COUPON_CODE_REQUEST
});

export const getCouponCodeSuccess = (couponCode) => ({
    type: actionTypes.GET_COUPON_CODE_SUCCESS,
    payload: couponCode
});

export const getCouponCodeFailure = (error) => ({
    type: actionTypes.GET_COUPON_CODE_FAILURE,
    payload: error
});

export const getCouponCode = (couponId, token) => {
    return async (dispatch) => {
        dispatch(getCouponCodeRequest());
        try {
            const response = await axios.get(`/api/Coupons/${couponId}`, {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });
            dispatch(getCouponCodeSuccess(response.data.code));
        } catch (error) {
            dispatch(getCouponCodeFailure(error.message));
        }
    };
};