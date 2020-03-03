import {SHOW_ALERT, CLOSE_ALERT} from '../../types'

export default (state, action) => {
    switch(action.type) {
        case SHOW_ALERT:
            return {
                alerta: action.payload
            }
        case CLOSE_ALERT:
            return {
                alerta: null
            }
        default:
            return state
    }
}