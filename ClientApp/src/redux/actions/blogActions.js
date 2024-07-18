import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getBlogsRequest = () => ({
    type: actionTypes.GET_BLOGS_REQUEST
});

export const getBlogsSuccess = (blogs) => ({
    type: actionTypes.GET_BLOGS_SUCCESS,
    payload: blogs
});

export const getBlogsFailure = (error) => ({
    type: actionTypes.GET_BLOGS_FAILURE,
    payload: error
});

export const getBlogs = (token) => {
    return async (dispatch) => {
        dispatch(getBlogsRequest());
        try {
            const response = await axios.get('/api/blogs', {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });
            dispatch(getBlogsSuccess(response.data));
        } catch (error) {
            dispatch(getBlogsFailure(error.message));
        }
    };
};

