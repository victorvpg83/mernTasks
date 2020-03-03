import React, {useState, useContext} from 'react';

import projectContext from '../../context/projects/projectContext'

const NewProject = () => {

    //obtain form state

    const projectsContext = useContext(projectContext) 
    const {form,errorform, showForm, addProject, showError} = projectsContext

    //project state
    const [project, saveProject] = useState({
        name:''
    })

    const onChangeProject = e=> {
        saveProject({
            ...project,
            [e.target.name]: e.target.value
        })
    }

    const {name} = project

    const onSubmitProject= e=> {
        e.preventDefault()

        //validate project
        if(name==='') {
            showError()
            return
        }
        // add to state
        addProject(project)
        //init form
        saveProject({
            name:''
        })
    }

    const onClickForm= ()=>{
        showForm()
    }

    return (

        <>
            <button
                type='button'
                className='btn btn-block btn-primario'
                onClick={onClickForm}
            >Nuevo proyecto</button>

            {form ?
                (
                <form
                    className='formulario-nuevo-proyecto'
                    onSubmit={onSubmitProject}
                >
                    <input
                        type='text'
                        className='input-text'
                        placeholder='Nombre proyecto'
                        name='name'
                        value={name}
                        onChange={onChangeProject}
                    />
                    <input
                        type='submit'
                        className='btn btn-block btn-primario'
                        value='Agregar proyecto'
                    />
                </form>
                ): null}
            {errorform? <p className='mensaje error'>El nombre del proyecto es obligatorio</p> :null}
        </>
    );
};

export default NewProject;