// routes to auth
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')

//Init session
// api/auth
router.post('/',
 
    authController.authUser
)
//obtain authenticated user
router.get('/',
    auth,
    authController.authenticatedUser
)
module.exports = router