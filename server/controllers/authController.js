const User = require('../models/UserModel')
const bcryptjs= require('bcryptjs')
const { validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.authUser = async (req, res) => {
    //error review
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }
    //extract email and password
    const{email, password} = req.body

    try {
        //review email register user
        let user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({msg:'El usuario no existe'})
        }

        //password review
        const correctPass = await bcryptjs.compare(password, user.password)
        if(!correctPass) {
            return res.status(400).json({msg: 'Password incorrecto'})
        }

        // all correct create and sign jwt
        const payload = {
            user:{
                id: user.id
            }
        }  
        //sign jwt
        jwt.sign(payload, process.env.SECRET,{
            expiresIn: 3600 //1 hour
        }, (error,token)=>{
            if (error) throw error
            res.json({token})
        })

    } catch (error) {
        console.log(error)
    }
}

//obtain authenticated user
exports.authenticatedUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json({user})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Hubo un error'})
    }
}