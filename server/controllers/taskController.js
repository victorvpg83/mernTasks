const Task = require('../models/TaskModel')
const Project = require('../models/ProjectModel')
const {
    validationResult
} = require('express-validator')

exports.createTask = async (req, res) => {

    //error review
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }



    try {

        //extract project and exist?

        const {
            project
        } = req.body

        const existProject = await Project.findById(project)
        if (!existProject) {
            return res.status(404).json({
                msg: 'Proyecto no encontrado'
            })
        }

        //review project and user???
        if (existProject.creator.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'No autorizado'
            })
        }

        //create task
        const task = new Task(req.body)
        await task.save()
        res.json({
            task
        })

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

//obtain projects tasks

exports.obtainTasks = async (req, res) => {
    try {

        //extract project and exist?

        const {
            project
        } = req.query

        const existProject = await Project.findById(project)
        if (!existProject) {
            return res.status(404).json({
                msg: 'Proyecto no encontrado'
            })
        }

        //review project and user???
        if (existProject.creator.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'No autorizado'
            })
        }

        //obtain tasks
        const tasks = await Task.find({project}).sort({created: -1 })
        res.json({tasks})

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')

    }
}

//update task
exports.updateTask = async (req,res) =>{
    try {
        //extract project and exist?
        const { project, name, state } = req.body

        //exist task?
        let task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).json({msg: 'No existe la tarea'})
        }
        //extract project
        const existProject = await Project.findById(project)

        //review project and user???
        if (existProject.creator.toString() !== req.user.id) {
            return res.status(401).json({msg: 'No autorizado'})
        }

        //create object with new info
        const newTask = {}

        newTask.name=name
        newTask.state=state
        
        // save task
        task = await Task.findOneAndUpdate({_id: req.params.id}, newTask, {new: true})
        res.json({task})

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

//delete task
exports.deleteTask = async (req,res)=>{
    try {
        //extract project and exist?
        const { project} = req.query

        //exist task?
        let task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).json({msg: 'No existe la tarea'})
        }
        //extract project
        const existProject = await Project.findById(project)

        //review project and user???
        if (existProject.creator.toString() !== req.user.id) {
            return res.status(401).json({msg: 'No autorizado'})
        }
        // delete
        await Task.findOneAndRemove({_id: req.params.id})
        res.json({msg:'Tarea eliminada'})
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}