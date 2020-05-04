import React, { useContext, useState, useEffect } from 'react';

//Context & reducer
import projectContext from '../../context/project/projectContext';
import taskContext from '../../context/task/taskContext';

const FormTask = () => {

    // Context & Reducer
    const context = useContext(projectContext);
    const contextTask = useContext(taskContext);

    // Extraccion de los reducer
    const { project } = context;
    const { taskSellec, 
        errorTarea,
        addTask,
        validTask,
        taskXId,
        updateTask,
        cleanTask } = contextTask;

    // State Local
    const [name, setstate] = useState({
        name: '',
    })

    useEffect(() => {
        if (taskSellec) {
            setstate(taskSellec)
        }
        else {
            setstate({
                name: '',
            })
        }
    }, [taskSellec])

    if (!project) return null;

    const [projectActual] = project;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name.name.length < 1) {
            validTask(true)
            return null;
        }

        if (!taskSellec) {
            name.headline = projectActual._id;
            addTask(name);
        } else {
            updateTask(name);
            cleanTask();
        }

        taskXId(projectActual.id)

        setstate({
            name: '',
            projectID: 0
        });
    }

    return (

        <div className="formulario">
            <form
                onSubmit={handleSubmit}
                className=""
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        placeholder="Nombre de la tarea"
                        className="input-text"
                        name="name"
                        onChange={(e) => setstate({
                            ...name,
                            [e.target.name]: e.target.value,
                        })}
                        value={name.name}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={taskSellec ? "Editar Detalles" : "Crear Nuevo Detalle"}
                    />
                </div>
            </form>
            {errorTarea ? <p className="mensaje error"> Este campo debe estar completado </p> : null}
        </div>
    );
}

export default FormTask;