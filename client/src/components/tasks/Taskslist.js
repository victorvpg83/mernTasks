import React, {useContext} from 'react'
import Task from './Task'
import  projectContext  from "../../context/projects/projectContext"
import taskContext from '../../context/tasks/taskContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const Taskslist = () => {

    //Extract Tasks from initial state
    const projectsContext = useContext(projectContext)
    const {project, deleteProject} = projectsContext

    //obtain task project
    const tasksContext = useContext(taskContext)
    const {tasksproject} = tasksContext

    //no proyect select
    if(!project) return <h2>Selecciona un proyecto</h2>

    //array destructuring actual project
    const [actualProject] = project


    //Delete a project
    const onClickDelete = ()=> {
        deleteProject(actualProject._id)
    }

    return (
        
        <>
            <h2>Proyecto: {actualProject.name}</h2>
            <ul className='listado-tareas'>
                {tasksproject.length===0
                    ? (<li className='tarea'> <p>No hay tareas</p> </li>)
                    :
                    <TransitionGroup>
                    {tasksproject.map(task =>(
                        <CSSTransition
                            key={task.id}
                            timeout={200}
                            classNames='tarea'
                        >
                            <Task   
                            task={task}
                        />
                        </CSSTransition>

                    ))}
                    </TransitionGroup>
                }
            </ul>
            <button
                type='button'
                className='btn btn-eliminar'
                onClick={onClickDelete}
            >Eliminar proyecto &times;</button>
        </>
    );
};

export default Taskslist;