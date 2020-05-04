import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import FormTask from '../tarea/FormTask';
import ListTask from '../tarea/ListTask';

// Context & Reducer
import authentificationContext from '../../context/authentication/authentificationContext'

const Projects = () => {

    const auth = useContext(authentificationContext);
    const { authenticationUser } = auth;

    useEffect(() => {
        authenticationUser()
    }, [])

    return (
        <div className="contenedor-app">
            <Sidebar />

            <div className="seccion-principal">

                <Navbar />

                <main>
                    <FormTask />
                    <div className="contenedor-tareas">
                        <ListTask />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Projects;