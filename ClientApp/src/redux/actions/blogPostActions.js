// src/redux/actions/blogPostActions.js
import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getBlogPostsRequest = () => ({
    type: actionTypes.GET_BLOGPOSTS_REQUEST
});

export const getBlogPostsSuccess = (blogPosts) => ({
    type: actionTypes.GET_BLOGPOSTS_SUCCESS,
    payload: blogPosts
});

export const getBlogPostsFailure = (error) => ({
    type: actionTypes.GET_BLOGPOSTS_FAILURE,
    payload: error
});

export const getBlogPosts = (token) => {
    return async (dispatch) => {
        dispatch(getBlogPostsRequest());
        try {
            const response = await axios.get('api/blogposts', {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });
            dispatch(getBlogPostsSuccess(response.data));
        } catch (error) {
            dispatch(getBlogPostsFailure(error.message));
        }
    };
};
