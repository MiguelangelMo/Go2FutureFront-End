import React, { useContext, useEffect } from 'react';
import authentificationContext from '../../context/authentication/authentificationContext'

const Navbar = (props) => {
    const auth = useContext(authentificationContext);
    const { user, authenticationUser, closeSession } = auth

    useEffect(() => {
        authenticationUser()
    }, [])

    const closeSesion = () => {
        closeSession()
    }
    return (
        <header className="app-header">
            {user ?
                <p className="nombre-usuario">
                    Hola <span> {user.name} {user.lastName} </span>
                </p>
                :
                null}

            <nav className="nav-principal">
                <a className="btn btn-black cerrar-sesion" href="/" onClick={() => closeSesion()} > Cerrar Sesión </a>
            </nav>
        </header>
    );
}

export default Navbar;