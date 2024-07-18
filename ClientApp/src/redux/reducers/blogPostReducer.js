// src/redux/reducers/blogPostReducer.js
import * as actionTypes from '../actionTypes';

const initialState = {
    blogPosts: [],
    loading: false,
    error: null
};

const blogPostReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_BLOGPOSTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.GET_BLOGPOSTS_SUCCESS:
            return {
                ...state,
                blogPosts: action.payload,
                loading: false,
                error: null
            };
        case actionTypes.GET_BLOGPOSTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default blogPostReducer;
