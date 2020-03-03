import React, {useReducer} from 'react'
import TaskContext from './taskContext'
import TaskReducer from './taskReducer'

import {
    TASKS_PROJECT,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    ACTUAL_TASK,
    UPDATE_TASK,
    CLEAR_TASK
} from '../../types'

import axiosClient from '../../config/axiosConfig'

const TaskState = props => {
    const initialState = {
        tasksproject: [],
        taskerror: false,
        selectedtask: null
    }

    //create dispatch and state
    const [state, dispatch] = useReducer(TaskReducer, initialState)

    //Functions

    //projects tasks
    const obtainTasks = async project =>{
        try {
            const result = await axiosClient.get('/api/tasks', { params: {project}})
            dispatch({
                type: TASKS_PROJECT,
                payload: result.data.tasks
            })
        } catch (error) {
            console.log(error)
        }
    }
    //add task to project
    const addTask = async task =>{
        try {
            const result = await axiosClient.post('/api/tasks', task)
            console.log(result)
            dispatch({
                type: ADD_TASK,
                payload: task
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Validate and show error task form
    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK
        })
    }

    //Delete task id
    const deleteTask = async (id, project) => {
        try {
            await axiosClient.delete(`/api/tasks/${id}`, {params:{project}})
            dispatch({
                type:DELETE_TASK,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }

    //update task
    const updateTask = async task => {

        try {
            const result = await axiosClient.put(`/api/tasks/${task._id}`, task)
            console.log(result)
            dispatch({
                type: UPDATE_TASK,
                payload: result.data.task
            })
        } catch (error) {
            console.log(error)
        }
    }
    // extract task for edition
    const extractActualTask = task => {
        dispatch({
            type: ACTUAL_TASK,
            payload: task
        })
    }
    // clear task
    const clearTask = ()=>{
        dispatch({
            type: CLEAR_TASK
        })
    }

    return(
        <TaskContext.Provider
            value={{
                tasksproject: state.tasksproject,
                taskerror: state.taskerror,
                selectedtask: state.selectedtask,
                obtainTasks,
                addTask,
                validateTask,
                deleteTask,
                extractActualTask,
                updateTask,
                clearTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState


