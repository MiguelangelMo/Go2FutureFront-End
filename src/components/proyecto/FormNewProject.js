import React, { Fragment, useState, useContext } from 'react';
import projectContext from '../../context/project/projectContext';

const FormNewProject = () => {

    // Context
    const context = useContext(projectContext)

    // Destroshow Context
    const { newProject, error, mostrarForm, addProject, showError } = context;

    // State Local
    const [projects, setInput] = useState({
        name: ''
    })

    // Guardar Valor de Formulario
    const saveInput = (e) => {
        setInput({
            ...projects,
            name: e.target.value,
        })
    }

    // Evento Formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (projects.name.length < 1) {
            showError();
            return null;
        } else {

            addProject(projects);

            setInput({
                name: ''
            });
        }

    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => mostrarForm()}
            >
                Agregar una Actividad
            </button>

            {newProject ? (
                <form
                    onSubmit={handleSubmit}
                    className="formulario-nuevo-proyecto"
                >

                    <input
                        type="text"
                        placeholder="Escribe tu Proyecto"
                        className="input-text"
                        name="newProyect"
                        id="newProyect"

                        onChange={saveInput}
                        value={projects.name}
                    />

                    <input
                        className="btn btn-primario btn-block"
                        type="submit"
                        value="Agregar Proyecto"
                    />

                </form>
            ) :
                null
            }

            {error ?
                (<p className="mensaje error"> No guarda mensajes vacios</p>)
                :
                null
            }

        </Fragment>
    );
}

export default FormNewProject;
