import React, {useContext} from 'react'
import projectContext from '../../context/projects/projectContext'
import taskContext from '../../context/tasks/taskContext'

const Project = ({project}) => {

    //obtain form state projects

    const projectsContext = useContext(projectContext) 
    const { actualProject } = projectsContext

    //obtain task functions
    const tasksContext = useContext(taskContext)
    const {obtainTasks} = tasksContext

    //add actual project
    const selectProject = id => {
        actualProject(id)
        obtainTasks(id)
    }

    return (
        <li>
            <button
                type='button'
                className='btn btn-blank'
                onClick={()=> selectProject(project._id)}
            > {project.name} </button>
        </li>
    );
};

export default Project;