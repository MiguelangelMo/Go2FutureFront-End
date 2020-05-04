import {
    NEW_PROJECT,
    GET_PROJECT,
    ADD_PROJECT,
    VALID_FORM,
    PROJECT_ACTUAL,
    PROJECT_DELETE,
    PROJECT_ERROR,
} from '../../types/index';

export default (state, action) => {
    switch (action.type) {
        case NEW_PROJECT:
            return {
                ...state,
                newProject: true,
            }
        case GET_PROJECT:
            return {
                ...state,
                projects: action.payload,
            }
        case ADD_PROJECT:
            return {
                ...state,
                projects: [action.payload, ...state.projects],
                newProject: false,
                error: false,
            }
        case VALID_FORM:
            return {
                ...state,
                error: true,
            }
        case PROJECT_ACTUAL:
            return {
                ...state,
                project: state.projects.filter(resp => resp._id === action.payload),
            }
        case PROJECT_DELETE:
            return {
                ...state,
                projects: state.projects.filter(resp => resp._id !== action.payload),
                project: null,
            }
        case PROJECT_ERROR:
            return {
                ...state,
                message: action.payload,
            }
        default:
            return false;
    }
}