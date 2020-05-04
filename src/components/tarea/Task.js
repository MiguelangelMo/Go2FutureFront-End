import React, { useContext } from 'react';

//Conext & Reducer
import taskContext from '../../context/task/taskContext';
import projectContext from '../../context/project/projectContext';

const Task = ({ task }) => {
    // UseContext para obtener el Context
    const context = useContext(taskContext);
    const contextProject = useContext(projectContext);

    // Destroshow del Context
    const { deleteTask, taskXId, saveTaskActual, updateTask } = context
    const { project } = contextProject

    const handelDelete = (id) => {
        const [projectActual] = project;
        deleteTask(id, projectActual._id)
        taskXId(projectActual.id)
    }

    const handleState = (tasks) => {

        if (tasks.state) tasks.state = false
        else tasks.state = true
        updateTask(tasks);
    }

    const handleUpdate = (tasks) => {
        saveTaskActual(tasks)
    }

    return (
        <div className="tarea sombra">
            <p className="">
                {task.name}
            </p>
            <div className="estado">
                {task.state ?
                    (<button
                        type="button"
                        className="completo"
                        onClick={() => handleState(task)}
                    >
                        Completo
                    </button>)
                    :
                    (<button
                        type="button"
                        className="incompleto"
                        onClick={() => handleState(task)}
                    >
                        Incompleto
                    </button>)
                }
            </div>

            <div className="acciones">

                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => handleUpdate(task)}
                >
                    Editas
                </button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => handelDelete(task._id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}

export default Task;