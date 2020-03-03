const User = require('../models/UserModel')
const bcryptjs= require('bcryptjs')
const { validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.createUser = async (req,res)=>{

    //error review
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }

    //extract email and password
    const {email,password} = req.body

    try {
        //unique user
        let user = await User.findOne({email})

        if (user) {
            return res.status(400).json({msg: 'El usuario ya existe'})
        }
        //create new user
        user = new User(req.body)

        //hash password
        const salt = await bcryptjs.genSalt(10)
        user.password= await bcryptjs.hash(password, salt)

        //save new user
        await user.save()

        //create and sign jwt
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
        res.status(400).send('Hubo un error')
    }
}