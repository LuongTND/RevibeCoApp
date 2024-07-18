import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE, RESTORE_USER_REQUEST, RESTORE_USER_SUCCESS, RESTORE_USER_FAILURE } from '../actionTypes';

const initialState = {
    loadingUsers: true,
    loadingDelete: false,
    users: [],
    error: '',
    totalPages: 0
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loadingUsers: true
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loadingUsers: false,
                users: action.payload.results,
                totalPages: action.payload.totalPages,
                error: ''
            };
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loadingUsers: false,
                users: [],
                error: action.payload
            };
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loadingDelete: true
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loadingDelete: false,
                users: state.users.map(user =>
                    user.id === action.payload ? { ...user, isDeleted: true } : user
                ),
                error: ''
            };
        case DELETE_USER_FAILURE:
            return {
                ...state,
                loadingDelete: false,
                error: action.payload
            };
        case RESTORE_USER_REQUEST:
            return {
                ...state,
                loadingDelete: true
            };
        case RESTORE_USER_SUCCESS:
            return {
                ...state,
                loadingDelete: false,
                users: state.users.map(user =>
                    user.id === action.payload ? { ...user, isDeleted: false } : user
                ),
                error: ''
            };
        case RESTORE_USER_FAILURE:
            return {
                ...state,
                loadingDelete: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;
