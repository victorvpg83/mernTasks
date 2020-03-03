import { 
    FORM_PROJECT,
    OBTAIN_PROJECT,
    ADD_PROJECT,
    PROJECT_ERROR,
    VALIDATE_FORM,
    ACTUAL_PROJECT,
    DELETE_PROJECT
} from '../../types'

export default (state, action) =>{
    switch(action.type){
        case FORM_PROJECT:
            return{
                ...state,
                form: true
            }
        case OBTAIN_PROJECT:
            return{
                ...state,
                projects: action.payload
            }
        case ADD_PROJECT:
            return{
                ...state,
                projects:[...state.projects, action.payload],
                form: false,
                errorform: false
            }
        case VALIDATE_FORM:
            return{
                ...state,
                errorform: true
            }
        case ACTUAL_PROJECT:
            return{
                ...state,
                project: state.projects.filter(project => project._id === action.payload)
            }
        case DELETE_PROJECT:
            return{
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                project: null
            }
        case PROJECT_ERROR:
            return{
                ...state,
                message: action.payload
            } 
        default:
            return state
    }
}