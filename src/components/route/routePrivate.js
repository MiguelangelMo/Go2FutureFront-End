import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authentificationContext from '../../context/authentication/authentificationContext'

const RoutePrivate = ({ component: Component, ...props }) => {

    //console.log(props)
    const auth = useContext(authentificationContext);
    const { authentication, authenticationUser, loading } = auth

    useEffect(() => {
        authenticationUser()
    }, [])

    return (
        <Route
            {...props}
            render={props => !authentication && !loading ? (
                <Redirect to="/" />
            ) : (
                    <Component {...props} />
                )}
        />
    )
}

export default RoutePrivate;