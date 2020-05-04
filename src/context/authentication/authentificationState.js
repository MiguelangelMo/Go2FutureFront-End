import React, { useReducer, useEffect } from 'react';
import Context from "./authentificationContext";
import Reducer from "./authentificationReducer";
import {
    REGISTER_SUCCESSFUL,
    REGISTER_ERROR,
    LOGIN_SUCCESSFUL,
    LOGIN_ERROR,
    GET_REGISTER,
    CLOSE_SESSION,
} from '../../types'

// axios
import axios from '../../config/axios';

// token
import tokenAuthentication from '../../config/token'

const AuthenticationState = (props) => {

    const initialsState = {
        token: localStorage.getItem('token'),
        authentication: null,
        user: null,
        message: null,
        loading: true,
    }

    const [state, dispatch] = useReducer(Reducer, initialsState);

    const registerUser = async (data) => {
        try {
            const required = await axios.post("data/users", data);
            console.log(required)
            dispatch({
                type: REGISTER_SUCCESSFUL,
                payload: required.data
            })
            authenticationUser();
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: "alert"
            }
            dispatch({
                type: REGISTER_ERROR,
                payload: alert,
            })
        }
    }

    const authenticationUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuthentication(token)
        }

        try {
            const required = await axios.get("data/auth");
            // the information is obtained because we pass the token through the header
            // console.log(required.data)
            dispatch({
                type: GET_REGISTER,
                payload: required.data.users
            })
        } catch (error) {
            dispatch({
                type: REGISTER_ERROR
            })
        }

    }

    const login = async (data) => {
        try {
            const required = await axios.post("data/auth", data);
            dispatch({
                type: LOGIN_SUCCESSFUL,
                payload: required.data
            })

            authenticationUser()
        } catch (error) {
            console.log(error.response)
            const alert = {
                msg: error.response.data.msg,
                category: "alert"
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alert,
            })
        }
    }

    const closeSession = () => {
        dispatch({
            type: CLOSE_SESSION
        })
    }

    return (
        <Context.Provider
            value={{
                token: state.token,
                authentication: state.authentication,
                user: state.user,
                message: state.message,
                loading: state.loading,

                registerUser,
                login,
                authenticationUser,
                closeSession,
            }}
        >
            {props.children}
        </Context.Provider>
    )
}

export default AuthenticationState;