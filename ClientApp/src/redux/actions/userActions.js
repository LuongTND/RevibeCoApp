import axios from 'axios';
import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE,RESTORE_USER_REQUEST, RESTORE_USER_SUCCESS,RESTORE_USER_FAILURE } from '../actionTypes';

import authService from '../../components/api-authorization/AuthorizeService';

export const fetchUsers = (page, pageSize) => {
    return async dispatch => {
        dispatch(fetchUsersRequest());
        try {
            const token = await authService.getAccessToken();
            const response = await axios.get(`api/ApplicationUsers?page=${page}&pageSize=${pageSize}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = response.data;
            dispatch(fetchUsersSuccess(data));
        } catch (error) {
            dispatch(fetchUsersFailure(error.message));
        }
    };
};

export const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    };
};

export const fetchUsersSuccess = data => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: data
    };
};

export const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    };
};

export const deleteUser = (userId) => {
    return async (dispatch) => {
        dispatch(deleteUserRequest());
        try {
            const token = await authService.getAccessToken();
            await axios.delete(`api/ApplicationUsers/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            dispatch(deleteUserSuccess(userId));
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };
};

export const deleteUserRequest = () => {
    return {
        type: DELETE_USER_REQUEST
    };
};

export const deleteUserSuccess = (userId) => {
    return {
        type: DELETE_USER_SUCCESS,
        payload: userId
    };
};

export const deleteUserFailure = (error) => {
    return {
        type: DELETE_USER_FAILURE,
        payload: error
    };
};

export const restoreUser = (userId) => {
    return async (dispatch) => {
        dispatch(restoreUserRequest());
        try {
            const token = await authService.getAccessToken();
            await axios.delete(`api/ApplicationUsers/${userId}/restore`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            dispatch(restoreUserSuccess(userId));
        } catch (error) {
            dispatch(restoreUserFailure(error.message));
        }
    };
};

export const restoreUserRequest = () => {
    return {
        type: RESTORE_USER_REQUEST
    };
};

export const restoreUserSuccess = (userId) => {
    return {
        type: RESTORE_USER_SUCCESS,
        payload: userId
    };
};

export const restoreUserFailure = (error) => {
    return {
        type: RESTORE_USER_FAILURE,
        payload: error
    };
};

