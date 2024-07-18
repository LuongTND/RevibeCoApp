import * as actionTypes from '../actionTypes';

const initialState = {
    blogs: [],
    loading: false,
    error: null
};

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_BLOGS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_BLOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                blogs: action.payload
            };
        case actionTypes.GET_BLOGS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};





export default blogReducer;
