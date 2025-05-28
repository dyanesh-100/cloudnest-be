require('dotenv').config()

const express = require("express")
const cors = require('cors')
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT
const filesRoute = require('./Routes/filesRoute')
const folderRoute = require('./Routes/folderRoute')
const loginRoute = require('./Routes/loginRoute')
const signUpRoute = require('./Routes/signUpRoute')
const signOutRoute = require('./Routes/signOutRoute')
const userRoute = require('./Routes/userRoute')
const googleAuthRoute = require('./Routes/googleAuthRoute')
const app = express()

const mongoose =require('mongoose')

app.use(cors({
    origin: true, 
    credentials: true
}));

app.use(express.json())
app.use(cookieParser());

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error',(errorMessage) => console.log(errorMessage))
db.once('open',() => console.log('Connected to db successfully'))


app.use
(
    '/api/v1',
    loginRoute,
    filesRoute,
    folderRoute,
    signUpRoute,
    signOutRoute,
    userRoute,
    googleAuthRoute
)


app.get('/',(request,response)=>{
    response.status(200).send({message:"Hello world"})
})


app.listen(PORT, console.log(`Server running at http://localhost:${PORT}/api/v1`))