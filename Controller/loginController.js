const userModel = require('../Models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_TOKEN = process.env.JWT_SECRET

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
                response.cookie('authToken', AUTH_TOKEN, {
                    httpOnly: true, 
                    secure: true, 
                    sameSite: 'None'
                });
                return response.status(201).json({firstName : validUser.firstName, lastName : validUser.lastName})
            }
        response.status(401).send({message:'Invalid password'})
    }
    catch(error) {
        response.status(500).send({message : error.message})
        
    }
    
}

module.exports = {loginExistingUser}