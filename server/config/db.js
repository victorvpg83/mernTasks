const mongoose = require('mongoose')
require('dotenv').config({path:'vars.env'})

const connectDB = async() => {
    try {
       await mongoose.connect(process.env.DB_MONGO,{
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useFindAndModify:false
       })
       console.log('connected to database') 
    } catch (error) {
        console.log(error)
        process.exit(1) // stop app
    }
}

module.exports = connectDB