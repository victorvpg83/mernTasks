// routes to create users
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const {check} = require('express-validator')

//create user
// api/users
router.post('/',
[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Escribe un email válido').isEmail(),
    check('password', 'El password debe tener 6 caracteres o más').isLength({min:6})
], 
    userController.createUser
)
module.exports = router