const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')

// create task
// api/tasks
router.post('/',
    auth,
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('project', 'El proyecto es obligatorio').not().isEmpty()
    ],
    taskController.createTask
)

// obtain projecs tasks
router.get('/',
    auth,
    taskController.obtainTasks
)

// update task
router.put('/:id',
    auth,
    taskController.updateTask
)
// delete task
router.delete('/:id',
    auth,
    taskController.deleteTask
)

module.exports = router
