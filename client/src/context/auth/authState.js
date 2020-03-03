import React, { useReducer } from "react"
import AuthContext from './authContext'
import AuthReducer from './authReducer'

import axiosClient from '../../config/axiosConfig'
import authToken from '../../config/authToken'

import {
    REGISTRY_SUCCESSFUL,
    REGISTRY_ERROR,
    OBTAIN_USER,
    LOGIN_SUCCESSFUL,
    LOGIN_ERROR,
    CLOSE_SESSION
} from '../../types'

const AuthState = props =>{
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null,
        loading: true
    }
    const[state, dispatch] = useReducer(AuthReducer, initialState)

    const signupUser = async data =>{
        try {
            const response = await axiosClient.post('/api/users',data)
            console.log(response.data)
            dispatch({
                type: REGISTRY_SUCCESSFUL,
                payload: response.data
            })
            //Obtain user
            authenticatedUser()
        } catch (error) {
            const alert ={
                msg:error.response.data.msg,
                categoria: 'alerta-error'

            }
            dispatch({
                type: REGISTRY_ERROR,
                payload: alert
            })
        }
    }
    // return authenticated user
    const authenticatedUser = async ()=> {
        const token= localStorage.getItem('token')
        if(token) {
            // function to send token by headers
            authToken(token)
        }
        try {
            const response = await axiosClient.get('api/auth')
            // console.log(response)
            dispatch({
                type: OBTAIN_USER,
                payload: response.data.user
            })

        } catch (error) {
            console.log(error.response)
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    //Login

    const userLogin = async data=>{
        try {
            const response = await axiosClient.post('/api/auth', data)
            dispatch({
                type: LOGIN_SUCCESSFUL,
                payload: response.data
            })
            //Obtain user
            authenticatedUser()
        } catch (error) {
            console.log(error.response.data.msg)
            const alert ={
                msg:error.response.data.msg,
                categoria: 'alerta-error'

            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            })
        }
    }
    //Close session
    const closeSession = ()=>{
        dispatch({
            type: CLOSE_SESSION
        })
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                loading: state.loading,
                signupUser,
                userLogin,
                authenticatedUser,
                closeSession
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState