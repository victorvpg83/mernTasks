import {
    REGISTRY_SUCCESSFUL,
    REGISTRY_ERROR,
    OBTAIN_USER,
    LOGIN_SUCCESSFUL,
    LOGIN_ERROR,
    CLOSE_SESSION
} from '../../types'

export default (state, action) => {
    switch(action.type) {
        case REGISTRY_SUCCESSFUL:
        case LOGIN_SUCCESSFUL:
            localStorage.setItem('token', action.payload.token)
            return{
                ...state,
                authenticated: true,
                message: null,
                loading: false
            }
        case OBTAIN_USER:
            return{
                ...state,
                authenticated:true,
                user: action.payload,
                loading: false
            }
        case CLOSE_SESSION:
        case LOGIN_ERROR:
        case REGISTRY_ERROR:
            localStorage.removeItem('token')
            return{
                ...state,
                token: null,
                user: null,
                authenticated: null,
                message: action.payload,
                loading: false
            }
        default:
            return state
    }
}