import React, { Fragment, useContext } from 'react';

//Context & Reducer
import projectContext from '../../context/project/projectContext';
import taskContext from '../../context/task/taskContext';

// Components
import Task from './Task';

// Depencias de trabajo
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ListTask = () => {

    const context = useContext(projectContext);
    const contextTask = useContext(taskContext);

    const { project, projectDelete } = context;
    const { taskProyect } = contextTask;

    //const task = [] ;

    if (!project) {
        return (
            <h1>
                Selecciona una actividad
            </h1>
        );
    }

    const [projectActual] = project;
    
    return (
        <Fragment>
            <h2>
                Actividad: {projectActual.name}
            </h2>

            <ul className="listado-tareas">
                {taskProyect.length > 0
                    ?
                    <TransitionGroup>
                        {taskProyect.map(resp => (
                            <CSSTransition
                                key={resp._id}
                                timeout={300}
                                classNames="tarea"
                            >
                                <Task
                                    task={resp}
                                />
                            </CSSTransition>))}
                    </TransitionGroup>
                    :
                    <li className="tarea"> No hay detalle </li>
                }
            </ul>
            <button
                type="button"
                className="btn btn-primario"
                onClick={() => projectDelete(projectActual._id)}
            >
                Eliminar Actividad &times;
            </button>
        </Fragment>
    );
}

export default ListTask;