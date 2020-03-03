import React, {useReducer} from 'react'
import alertReducer from './alertReducer'
import alertContext from './alertContext'

import {SHOW_ALERT, CLOSE_ALERT} from '../../types'

const AlertState = props => {

    const initialState = {
        alerta: null
    }

    const [state, dispatch] = useReducer(alertReducer, initialState)

    //Functions

    const showAlert = (msg, categoria) => {
        dispatch({
            type: SHOW_ALERT,
            payload: {
                msg,
                categoria
            }
        })

        //after 5 seconds clear alarm
        setTimeout(()=>{
            dispatch({
                type: CLOSE_ALERT
            })
        }, 5000)
    }

    return (
        <alertContext.Provider
            value={{
                alerta: state.alerta,
                showAlert
            }}
        >
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState