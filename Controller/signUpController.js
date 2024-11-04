const userModel = require('../Models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_TOKEN = process.env.JWT_SECRET

const registerNewUser = async(request,response) => {
    const encryptedPassword = await bcrypt.hash(request.body.password,10)
    
    const user = new userModel({
        firstName : request.body.firstName,
        lastName : request.body.lastName,
        email : request.body.email,
        password : encryptedPassword
    })

    try{
        const existingUser = await userModel.findOne({email : request.body.email})

        if(existingUser)
            {
                return response.status(409).send({message : 'Already existing user'})
            }
        const newUser = await user.save()
        const AUTH_TOKEN = jwt.sign({email:newUser.email}, JWT_TOKEN)
                response.cookie('authToken', AUTH_TOKEN, {
                    httpOnly: true, 
                    secure: true, 
                    sameSite: 'None'
                });
            return response.status(201).send({ status: "success", code: 201, message: "User registered successfully"})    

    }
    catch(error) {
        response.status(500).send({message : error.message})
        
    }
}

module.exports = {registerNewUser}