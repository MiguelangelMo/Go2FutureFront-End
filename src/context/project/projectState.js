import React, { useReducer } from 'react';

// Importar uuid
// import { v4 as uuid } from 'uuid';

// Elementos Manejo Del State
import Context from './projectContext';
import Reducer from './projectReducer';

// Acciones del Dispach
import {
    NEW_PROJECT,
    GET_PROJECT,
    ADD_PROJECT,
    VALID_FORM,
    PROJECT_ACTUAL,
    PROJECT_DELETE,
    PROJECT_ERROR,
} from '../../types/index';

// axios
import axios from '../../config/axios'



const ProjectState = (props) => {

    /*const projects = [
        { name: "Desarrollo Web", id: 1 },
        { name: "Diseño Web", id: 2 },
        { name: "Marketing", id: 3 },
    ];*/

    const initialsState = {
        projects: [],
        newProject: false,
        error: false,
        project: null,
        message: null
    }

    // dispach para ejecutar las acciones
    const [state, dispatch] = useReducer(Reducer, initialsState);

    // Series de funciones para CRUD
    const mostrarForm = () => {
        dispatch({
            type: NEW_PROJECT,
        })
    }

    // Obtener proyectos
    const getProject = async () => {
        try {
            const required = await axios.get("data/project")
            dispatch({
                type: GET_PROJECT,
                payload: required.data.project
            })
        } catch (error) {
            const alert = {
                msg: "Ha ocurrido un error",
                category: "alert",
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert,
            })
        }
    }

    // Agregar nuevos proyectos
    const addProject = async (projects) => {

        try {
            const required = await axios.post("data/project", projects)
            dispatch({
                type: ADD_PROJECT,
                payload: required.data
            })
        } catch (error) {
            const alert = {
                msg: "Ha ocurrido un error",
                category: "alert",
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert,
            })
        }

    }

    const showError = () => {
        dispatch({
            type: VALID_FORM,
        })
    }

    const projectActual = (projects) => {
        dispatch({
            type: PROJECT_ACTUAL,
            payload: projects,
        })
    }

    const projectDelete = async (projectsID) => {
        try {
            await axios.delete(`data/project/${projectsID}`);
            dispatch({
                type: PROJECT_DELETE,
                payload: projectsID,
            })
        } catch (error) {
            const alert = {
                msg: "Ha ocurrido un error",
                category: "alert",
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert,
            })
        }

    }

    return (
        <Context.Provider
            value={{
                projects: state.projects,
                newProject: state.newProject,
                error: state.error,
                project: state.project,
                message: state.message,

                mostrarForm,
                getProject,
                addProject,
                showError,
                projectActual,
                projectDelete,
            }}
        >
            {props.children}
        </Context.Provider>
    )
}

export default ProjectState;