import React, {useContext, useState, useEffect} from 'react';
import  projectContext  from "../../context/projects/projectContext"
import taskContext from '../../context/tasks/taskContext'


const FormTask = () => {

    //Extract if project is active
    const projectsContext = useContext(projectContext)
    const {project} = projectsContext

    //obtain task functions
    const tasksContext = useContext(taskContext)
    const {selectedtask,taskerror,addTask, validateTask, obtainTasks, updateTask, clearTask} = tasksContext

    // useeffect for secterd task
    useEffect(()=>{
        selectedtask !== null ? saveTask(selectedtask) : saveTask({name:''})
    },[selectedtask])

    //Form state
    const [task, saveTask] = useState({
        name:''
    })

    //Extract project name
    const {name} = task


    //no proyect select
    if(!project) return null

    //array destructuring actual project
    const [actualProject] = project

    //read form values
    const handleChange = e=> {
        saveTask({
            ...task,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit= e=> {
        e.preventDefault()

        //validate form
        if(name.trim() ==='') {
            validateTask()
            return
        }

        // edit or new task
        if(selectedtask===null){
            //new task
            task.project = actualProject._id
            addTask(task)
        } else {
            // update task
            updateTask(task)
            // clear task
            clearTask()
        }


        // obtain and filter tasks actual project
        obtainTasks(actualProject._id)

        //init form
        saveTask({
            name:''
        })
    }

    return (
        <div className='formulario'>
            <form
                onSubmit={onSubmit}
            >
                <div className='contenedor-input'>
                    <input 
                        type='text'
                        className='input-text'
                        placeholder='Nombre tarea'
                        name='name'
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className='contenedor-input'>
                    <input 
                        type='submit'
                        className='btn btn-primario btn-block btn-submit'
                        value={selectedtask? 'Editar tarea': 'Agregar tarea'}
                    />
                </div>
            </form>
            {taskerror? <p className='mensaje error'>El nombre es obligatorio</p> :null}
        </div>
    );
};

export default FormTask;