import React, { useReducer } from 'react'

import  projectContext  from "./projectContext"
import  projectReducer  from "./projectReducer"
import { 
    FORM_PROJECT,
    OBTAIN_PROJECT,
    ADD_PROJECT,
    PROJECT_ERROR,
    VALIDATE_FORM,
    ACTUAL_PROJECT,
    DELETE_PROJECT
    } from '../../types'

    import axiosClient from '../../config/axiosConfig'


const ProjectState = props =>{

    const initialState = {
        projects: [],
        form: false,
        errorform:false,
        project: null,
        message: null
    }

    //dispatch for actions
    const[state, dispatch] = useReducer(projectReducer, initialState)

    //functions CRUD
    const showForm = () => {
        dispatch({
            type: FORM_PROJECT
        })
    }

    // obtain projects
    const obtainProjects = async () =>{
        try {
            const result = await axiosClient.get('/api/projects')
            dispatch({
                type: OBTAIN_PROJECT,
                payload: result.data.projects
            })
        }catch (error) {
            const alerta = {
                msg:'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alerta
            })
        }
    }

    //Add new project
    const addProject = async project=>{
        try {
            const result = await axiosClient.post('/api/projects', project)
            console.log(result)
            //insert project to state
            dispatch({
                type: ADD_PROJECT,
                payload: result.data
            })
        }catch (error) {
            const alerta = {
                msg:'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alerta
            })
        }
    }

    //validate error form
    const showError = ()=>{
        dispatch({
            type: VALIDATE_FORM
        })
    }

    //select project click

    const actualProject = projectId=>{
        dispatch({
            type: ACTUAL_PROJECT,
            payload: projectId
        })
    }

    //Delete a project
    const deleteProject = async projectId =>{
        try {
            await axiosClient.delete(`/api/projects/${projectId}`)
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })
        } catch (error) {
            const alerta = {
                msg:'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alerta
            })
        }
    }


    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                form: state.form,
                errorform: state.errorform,
                project: state.project,
                message: state.message,
                showForm,
                obtainProjects,
                addProject,
                showError,
                actualProject,
                deleteProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}
export default ProjectState