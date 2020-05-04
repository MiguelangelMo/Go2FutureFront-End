import {
    REGISTER_SUCCESSFUL,
    REGISTER_ERROR,
    LOGIN_SUCCESSFUL,
    LOGIN_ERROR,
    GET_REGISTER,
    CLOSE_SESSION,
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case LOGIN_SUCCESSFUL:
        case REGISTER_SUCCESSFUL:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                token: action.payload,
                authentication: true,
                message: null,
                loading: false,
            }
        case GET_REGISTER:
            return {
                ...state,
                authentication: true,
                user: action.payload,
                loading: false,
            }
        case LOGIN_ERROR:
        case CLOSE_SESSION:
        case REGISTER_ERROR:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                authentication: null,
                message: action.payload,
                loading: false,
                user: null,
            }
        default:
            return state
    }
}