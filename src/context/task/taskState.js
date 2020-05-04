import React, { useReducer } from 'react';

//importo el context
import Context from './taskContext';

//Importo el reducer
import Reducer from './taskReducer';

// crear id
// import { v4 as uuid } from 'uuid';

// dispach
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

//axios
import axios from '../../config/axios'

const TaskState = (props) => {

    // aca creamos el state
    const initialstate = {
        taskProyect: [],
        errorTarea: false,
        taskSellec: null,
        message: null,
    }

    // array destroyed
    const [state, dispatch] = useReducer(Reducer, initialstate);

    const taskXId = async (headline) => {

        try {
            const required = await axios.get(`data/task`, { params: { headline } });
            // console.log(required)
            dispatch({
                type: ADD_TASKS_FOR_ID,
                payload: required.data.task,
            })
        } catch (error) {
            const alert = {
                msg: "Ha ocurrido un Error",
                category: "alert",
            }
            console.log("ERROR " + error.response)
            dispatch({
                type: TASK_ERROR,
                payload: alert,
            })
        }

    }

    const addTask = async (tasks) => {
        // console.log(tasks)
        try {
            const required = await axios.post(`data/task`, tasks)
            // console.log("OK " + required)
            dispatch({
                type: ADD_TASKS_NEW,
                payload: required.data,
            })
        } catch (error) {
            const alert = {
                msg: "Ha ocurrido un Error",
                category: "alert",
            }
            console.log("ERROR " + error.response)
            dispatch({
                type: TASK_ERROR,
                payload: alert,
            })
        }

    }

    const validTask = (error) => {
        dispatch({
            type: VALID_TASK,
            payload: error,
        })
    }

    const deleteTask = async (id, headline) => {
        try {
            await axios.delete(`data/task/${id}`, { params: { headline } })
            dispatch({
                type: TASK_DELETE,
                payload: id,
            })
        } catch (error) {
            const alert = {
                msg: "Ha ocurrido un Error",
                category: "alert",
            }
            console.log("ERROR " + error.response)
            dispatch({
                type: TASK_ERROR,
                payload: alert,
            })
        }
    }

    const saveTaskActual = (tasks) => {
        dispatch({
            type: TASK_ACTUAL,
            payload: tasks,
        })
    }

    const updateTask = async (tasks) => {
        try {
            const required = await axios.put(`data/task/${tasks._id}`, tasks);
            dispatch({
                type: UPDATE_TASK,
                payload: required.data,
            })
        } catch (error) {
            const alert = {
                msg: "Ha ocurrido un Error",
                category: "alert",
            }
            dispatch({
                type: TASK_ERROR,
                payload: alert,
            })
        }
    }

    const cleanTask = () => {
        dispatch({
            type: CLEAN_TASK,
        })
    }

    return (
        <Context.Provider
            value={{
                taskProyect: state.taskProyect,
                errorTarea: state.errorTarea,
                taskSellec: state.taskSellec,
                message: state.message,

                taskXId,
                addTask,
                validTask,
                deleteTask,
                saveTaskActual,
                updateTask,
                cleanTask,
            }}
        >
            {props.children}
        </Context.Provider>
    )
}

export default TaskState;