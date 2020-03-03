import React, { useContext, useEffect } from 'react'
import Project from './Project'
import  projectContext  from "../../context/projects/projectContext"
import AlertContext from '../../context/alerts/alertContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const ListProjects = () => {


    //Extract projects from initial state
    const projectsContext = useContext(projectContext)
    const {message, projects, obtainProjects} = projectsContext

    const alertContext = useContext(AlertContext)
    const {alerta, showAlert} = alertContext

    //obtain projects
    useEffect(()=>{
        //Error?
        if(message) {
            showAlert(message.msg, message.categoria)
        }

        obtainProjects()
        // eslint-disable-next-line
    },[message])

    //view projects content
    if (projects.length===0) return <p>No hay proyectos, comienza creando uno</p>



    return (
        <ul className= 'listado-proyectos'>
            {alerta? ( <div className={`alerta ${alerta.categoria}`} > {alerta.msg} </div> ) :null}
            <TransitionGroup>
            {projects.map(project => (
                <CSSTransition
                key={project._id}
                timeout={200}
                classNames='proyecto'
                >
                    <Project
                    
                    project={project}
                />
                </CSSTransition>
            ))}
            </TransitionGroup>
        </ul>
    );
};

export default ListProjects;