import {
    AUTH_ERROR,
    REGISTER_SUCCESS,
    USER_LOADED,
    LOGIN_SUCCESS,
    ACCOUNT_DELETED,
    LOGOUT
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
};

export default function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            console.log(action);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case ACCOUNT_DELETED:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        case AUTH_ERROR:
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            }
        default: return state;
    }
}
