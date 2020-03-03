import React, {useContext, useEffect} from 'react';
import Sidebar from '../layout/Sidebar'
import Bar from '../layout/Bar'
import FormTask from '../tasks/FormTask'
import TasksList from '../tasks/Taskslist'
import AuthContext from '../../context/auth/authContext' 

const Projects = () => {

    //extract auth info
    const authContext = useContext(AuthContext)
    const {authenticatedUser} = authContext

    useEffect(()=> {
        authenticatedUser()
        // eslint-disable-next-line
    },[])

    return (
        <div className='contenedor-app'>
            <Sidebar />
            <div className='seccion-principal'>
                <Bar />
                <main>
                    <FormTask />
                    <div className='contenedor-tareas'>
                        <TasksList />
                    </div>
                </main>
            </div>


        </div>
    );
};

export default Projects;