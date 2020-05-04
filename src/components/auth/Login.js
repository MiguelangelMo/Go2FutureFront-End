import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Context & reducer
import alertContext from '../../context/alert/alertContext'
import authentificationContext from '../../context/authentication/authentificationContext'

const Login = (props) => {

    const alerts = useContext(alertContext);
    const auth = useContext(authentificationContext);

    const { alert, showAlert } = alerts;
    const { message, authentication, login } = auth;

    const [input, getInput] = useState({
        email: '',
        password: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.length > 0 && password.length > 0) {
            login({ email, password })
        } else {
            showAlert("Todos los campos deben estar completados", "alert")
        }
    }

    const { email, password } = input;

    const handleChange = (e) => {

        getInput({
            ...input,
            [e.target.name]: e.target.value,
        })

    }

    useEffect(() => {
        if (authentication) props.history.push("/projects");
        if (message) showAlert(message.msg, message.category);
    }, [message, authentication])

    return (
        <div className="form-usuario">
            {alert ? (<div className={alert.category}> {alert.msg} </div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>
                    Iniciar Sesión
                </h1>
                <form className="" onSubmit={handleSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email"> E-Mail:</label>
                        <input
                            type="email"
                            className=""
                            name="email"
                            id="email"
                            value={email}
                            placeholder="Escribe tu E-Mail"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password"> Password:</label>
                        <input
                            type="password"
                            className=""
                            name="password"
                            id="password"
                            placeholder="Escribe tu Contraseña"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión"
                            name="submit"
                            id="submit"
                        />
                    </div>
                </form>

                <Link to={'newAccount'} className="enlace-cuenta">
                    Crear Cuenta
                </Link>

            </div>
        </div>
    );
}

export default Login;