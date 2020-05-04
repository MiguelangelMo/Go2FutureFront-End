import React, { useContext, useEffect } from 'react';

// Components
import Project from './Project';

//Context & Reducer
import projectContext from '../../context/project/projectContext';
import alertContext from '../../context/alert/alertContext';

// Depencias de trabajo
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const List = () => {

    // Usamos el useContext
    const context = useContext(projectContext)
    const alerts = useContext(alertContext)

    const { message, projects, getProject } = context;
    const { alert, showAlert } = alerts;

    useEffect(() => {
        if (message) showAlert(message.msg, message.category)
        getProject();
        // eslint-disable-next-line
    }, [message]);

    if (projects.length < 1) return (
        <p className="">
            No hay proyectos.
        </p>
    );

    return (
        <ul className="listado-proyectos">
            {alert ? (<div className={alert.category}>{alert.msg}</div>) : null}
            <TransitionGroup>
                {projects.map(resp => (
                    <CSSTransition
                        key={resp._id}
                        timeout={300}
                        classNames="tarea"
                    >
                        <Project
                            project={resp}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}

export default List;