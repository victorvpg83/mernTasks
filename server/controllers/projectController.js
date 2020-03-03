const Project = require('../models/ProjectModel')
const {validationResult} = require('express-validator')


exports.createProject = async (req,res)=> {

    //error review
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }


    try {
        //create new project
        const project = new Project(req.body)
        // save creator with jwt
        project.creator = req.user.id

        //save project
        project.save()
        res.json(project)
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

//obtain all actual users project
exports.obtainProjects = async (req, res) => {
    try {
        const projects = await Project.find({creator: req.user.id}).sort({created: -1})
        res.json({projects})
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

//update a project
exports.updateProject = async (req,res)=> {

    //error review
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }
    //extract project info
    const {name} = req.body
    const newProject = {}

    if(name){
        newProject.name= name
    }
    try {
        //review id
        let project = await Project.findById(req.params.id)

        //project exist?
        if(!project){
            return res.status(404).json({msg:'Proyecto no encontrado'})
        }
        //review creator
        if(project.creator.toString() !== req.user.id){
            return res.status(401).json({msg:'No autorizado'})
        }
        //update
        project = await Project.findByIdAndUpdate({_id: req.params.id},{$set: newProject}, {new: true})

        res.json({project})
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error enel servidor')
    }
}

//delete project
exports.deleteProject = async (req,res)=>{
    try {
        //review id
        let project = await Project.findById(req.params.id)
        
        //project exist?
        if(!project){
            return res.status(404).json({msg:'Proyecto no encontrado'})
        }
        //review creator
        if(project.creator.toString() !== req.user.id){
            return res.status(401).json({msg:'No autorizado'})
        }
        //Delete project
        await Project.findOneAndRemove({_id: req.params.id})
        res.json('Proyecto eliminado ')

    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor')
    }
}