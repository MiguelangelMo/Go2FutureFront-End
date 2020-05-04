import {
    ADD_TASKS_FOR_ID,
    ADD_TASKS_NEW,
    VALID_TASK,
    TASK_DELETE,
    STATE_TASK,
    TASK_ACTUAL,
    UPDATE_TASK,
    CLEAN_TASK,
    TASK_ERROR,
} from '../../types'

export default (state, action) => {
    switch (action.type) {
        case ADD_TASKS_FOR_ID:
            return {
                ...state,
                taskProyect: action.payload
            }
        case ADD_TASKS_NEW:
            return {
                ...state,
                taskProyect: [action.payload, ...state.taskProyect],
                errorTarea: false,
            }
        case VALID_TASK:
            return {
                ...state,
                errorTarea: action.payload
            }
        case TASK_DELETE:
            return {
                ...state,
                taskProyect: state.taskProyect.filter(resp => resp._id !== action.payload)
            }
        case UPDATE_TASK:
            return {
                ...state,
                taskProyect: state.taskProyect.map(resp => resp._id === action.payload._id ? action.payload : resp)
            }
        case TASK_ACTUAL:
            return {
                ...state,
                taskSellec: action.payload
            }
        case CLEAN_TASK:
            return {
                ...state,
                taskSellec: null
            }
        case TASK_ERROR:
            return {
                ...state,
                message: action.payload
            }
        default:
            return false;
    }
}