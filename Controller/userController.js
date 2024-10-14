const { request } = require('express');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_TOKEN = 'qpliofoytmvefagouexmzehdsvusgidvfsdiv';


const displayUserData = async (request, response) => {
    const { token } = request.body;

    try {
       
        const loggedInUser = jwt.verify(token, JWT_TOKEN);
        const loggedInUserEmail = loggedInUser.email;

        let authenticatedUserData = await userModel.findOne({ email: loggedInUserEmail });
        
        if (!authenticatedUserData) {
            return response.status(404).json({
                message: 'User not found'
            });
        }
        
        
        response.status(200).json({
            message: 'Data retrieved successfully',
            data: authenticatedUserData,
            
        });
    } catch (error) {
        response.status(500).send({ message: error.message });
    }

};

module.exports = { displayUserData };
