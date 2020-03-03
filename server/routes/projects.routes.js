const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')

//create projects
// api/projects

router.post('/',
    auth,
    [
        check('name','El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    projectController.createProject
)

//obtain all projects
router.get('/',
    auth,
    projectController.obtainProjects
)
 
//update a project
router.put('/:id',
    auth,
    [
        check('name','El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    projectController.updateProject
)

//delete a project
router.delete('/:id',
    auth,
    projectController.deleteProject
)


module.exports = router