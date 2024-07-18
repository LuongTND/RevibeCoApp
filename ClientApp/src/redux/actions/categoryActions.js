// src/redux/actions/categoryActions.js
import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getCategoriesRequest = () => ({
    type: actionTypes.GET_CATEGORIES_REQUEST
});

export const getCategoriesSuccess = (categories) => ({
    type: actionTypes.GET_CATEGORIES_SUCCESS,
    payload: categories
});

export const getCategoriesFailure = (error) => ({
    type: actionTypes.GET_CATEGORIES_FAILURE,
    payload: error
});

export const getCategories = (token) => {
    return async (dispatch) => {
        dispatch(getCategoriesRequest());
        try {
            const response = await axios.get('api/productCategories', {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });
            dispatch(getCategoriesSuccess(response.data));
        } catch (error) {
            dispatch(getCategoriesFailure(error.message));
        }
    };
};
