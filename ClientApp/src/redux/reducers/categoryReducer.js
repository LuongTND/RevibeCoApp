// src/redux/reducers/categoryReducer.js
import * as actionTypes from '../actionTypes';

const initialState = {
    categories: [],
    loading: false,
    error: null
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                loading: false,
                error: null
            };
        case actionTypes.GET_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default categoryReducer;
