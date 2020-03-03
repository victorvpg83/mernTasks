import React, {useContext} from 'react';
import projectContext from '../../context/projects/projectContext'
import taskContext from '../../context/tasks/taskContext'

const Task = ({task}) => {

    //Extract if project is active
    const projectsContext = useContext(projectContext)
    const {project} = projectsContext

    //obtain task functions
    const tasksContext = useContext(taskContext)
    const {deleteTask, obtainTasks, updateTask, extractActualTask} = tasksContext

    //Extract project
    const [actualProject] = project

    //function press eliminar
    const taskDelete = id =>{
        deleteTask(id, actualProject._id)
        obtainTasks(actualProject._id)
    }
    //Function to change state task
    const changeState = task =>{
        task.state? task.state = false : task.state = true
        updateTask(task)
    }
    // select task for edit
    const selectTask = task => {
        extractActualTask(task)
    }


    return (
        <li className='tarea sombra'>
            <p> {task.name} </p>
            <div className='estado'>
                {task.state
                ?
                    (
                        <button
                            type='button'
                            className='completo'
                            onClick={()=> changeState(task)}
                        >Completo</button>
                    )
                :
                    (
                        <button
                            type='button'
                            className='incompleto'
                            onClick={()=> changeState(task)}
                        >Incompleto</button>
                    )
                }
            </div>
            <div className='acciones'>
                <button
                    type='button'
                    className='btn btn-primario'
                    onClick={()=> selectTask(task)}
                >Editar</button>
                <button
                    type='button'
                    className='btn btn-secundario'
                    onClick={()=> taskDelete(task._id)}
                >Eliminar</button>
            </div>

        </li>
    );
};

export default Task;
