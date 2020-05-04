import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Context & reducer
import alertContext from '../../context/alert/alertContext'
import authentificationContext from '../../context/authentication/authentificationContext'

const NewAccounts = (props) => {

    // Context & reducer
    const alerts = useContext(alertContext);
    const { alert, showAlert } = alerts;

    const auth = useContext(authentificationContext);
    const { message, authentication, registerUser } = auth;

    const [input, getInput] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',
    })

    const { name, lastName, email, password, password2 } = input;

    const handleChange = (e) => {

        getInput({
            ...input,
            [e.target.name]: e.target.value,
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.length > 0 && password.length > 0 && name.length > 0 && lastName.length > 0 && password2.length > 0) {
            if (password.length > 5 && password.length > 5) {
                if (password === password2) {
                    registerUser({ name, lastName, email, password })
                } else {
                    showAlert("Las contraseña NO son iguales", "alert")
                }
            } else {
                showAlert("Las contraseña debe tener un minimo de 5 caracteres", "alert")
            }
        } else {
            showAlert("Todos los campos son obligorio", "alert")
        }
    }

    useEffect(() => {
        if (authentication) props.history.push("/projects");
        if (message) showAlert(message.msg, message.category);
    }, [message, authentication, props.history])

    return (
        <div className="form-usuario">
            {alert ? (<div className={alert.category}> {alert.msg} </div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>
                    Crear Cuenta
                </h1>
                <form className="" onSubmit={handleSubmit}>

                    <div className="campo-form">
                        <label htmlFor="name"> Nombre:</label>
                        <input
                            type="text"
                            className=""
                            name="name"
                            id="name"
                            value={name}
                            placeholder="Escribe tu Nombre"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="lastName"> Apellido:</label>
                        <input
                            type="text"
                            className=""
                            name="lastName"
                            id="lastName"
                            value={lastName}
                            placeholder="Escribe tu apellido"
                            onChange={handleChange}
                        />
                    </div>

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
                            value={password}
                            name="password"
                            id="password"
                            placeholder="Escribe tu Contraseña"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password2"> Confirmar Password:</label>
                        <input
                            type="password"
                            className=""
                            value={password2}
                            name="password2"
                            id="password2"
                            placeholder="Escribe tu Contraseña"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Crear Cuenta"
                            name="submit"
                            id="submit"
                        />
                    </div>
                </form>

                <Link to={'/'} className="enlace-cuenta">
                    Ya tengo cuenta
                </Link>

            </div>
        </div>
    );
}

export default NewAccounts;