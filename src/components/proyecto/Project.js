import React, { useContext } from 'react';

// Context & Reducer
import projectContext from '../../context/project/projectContext';
import taskContext from '../../context/task/taskContext';

const Project = ({ project }) => {

    const context = useContext(projectContext);
    const contextTask = useContext(taskContext);

    const { projectActual } = context;
    const { taskXId } = contextTask;

    const execProjectTask = (id) => {
        projectActual(id); // filtrar el proyecto actual
        taskXId(id); // filtrar  las tareas actuales
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-black"
                onClick={() => execProjectTask(project._id)}
            >
                {project.name}
            </button>
        </li>
    );
}

export default Project;
