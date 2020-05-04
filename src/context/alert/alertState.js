import React, { useReducer } from 'react';
import Context from './alertContext';
import Reducer from './alertReducer';

import { SHOW_ALERT, HIDE_ALERT} from '../../types';

const AlertState = props => {
    const initialState = {
        alert: null
    }

    const [ state, dispatch ] = useReducer(Reducer, initialState);

    const showAlert = (msg, category) => {
        dispatch({
            type:  SHOW_ALERT,
            payload: {
                msg, 
                category
            }
        });

        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 5000);
    }


    return (
        <Context.Provider
            value={{
                alert: state.alert,
                
                showAlert
            }}
        > 
            {props.children}
        </Context.Provider>
    )
}

export default AlertState;