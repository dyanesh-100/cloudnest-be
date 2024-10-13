require('dotenv').config()
const express = require("express")
const cors = require('cors')
const PORT = process.env.PORT
const filesRoute = require('./Routes/filesRoute')
const loginRoute = require('./Routes/loginRoute')
const signUpRoute = require('./Routes/signUpRoute')
const app = express()

const mongoose =require('mongoose')
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error',(errorMessage) => console.log(errorMessage))
db.once('open',() => console.log('Connected to db successfully'))
app.get('/',(request,response)=>{
    response.status(200).send({message:"Hello world"})
})


app.use('/api/v1',loginRoute)
app.use('/api/v1',signUpRoute)
app.use('/api/v1',filesRoute)


app.listen(PORT, console.log(`Server running at http://localhost:${PORT}/api/v1`))