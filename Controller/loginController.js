const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_TOKEN = 'qpliofoytmvefagouexmzehdsvusgidvfsdiv'

const loginExistingUser = async (request,response) => {
    const {email,password} = request.body

    try{
        const validUser = await userModel.findOne({email:email})
        if(!validUser)
            {
                return response.status(401).send({message:'Invalid email'})
            }
        if(await bcrypt.compare(password,validUser.password))
            {
                const AUTH_TOKEN = jwt.sign({email:validUser.email}, JWT_TOKEN)
                return response.status(201).json({token : AUTH_TOKEN, firstName : validUser.firstName, lastName : validUser.lastName})
            }
        response.status(401).send({message:'Invalid password'})
    }
    catch(error) {
        response.status(500).send({message : error.message})
        
    }
    
}

module.exports = {loginExistingUser}