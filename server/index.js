const express = require('express')
const connectDB = require('./config/db')
const cors = require ('cors')


// create server
const app = express()

//connect database
connectDB()

//Enable cors
app.use(cors())

//express.json
app.use(express.json({extended: true}))

//app port
const PORT = process.env.PORT || 5000

//import routes
app.use('/api/users', require('./routes/users.routes'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/projects', require('./routes/projects.routes'))
app.use('/api/tasks', require('./routes/tasks.routes'))

//start app
app.listen(PORT, ()=>{
    console.log(`El servidor esta arrancado en el puerto ${PORT}`)
})