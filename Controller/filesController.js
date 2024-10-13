const { request } = require('express');
const filesModel = require('../models/filesModel');
const jwt = require('jsonwebtoken');
const JWT_TOKEN = 'qpliofoytmvefagouexmzehdsvusgidvfsdiv';
const initialData = require('../Data/filesData'); // Assuming you have dummy data in this file

const displayFilesAndFolders = async (request, response) => {
    const { token } = request.body;

    try {
       
        const loggedInUser = jwt.verify(token, JWT_TOKEN);
        const loggedInUserEmail = loggedInUser.email;

       
        let authenticatedUserFiles = await filesModel.find({ userId: loggedInUserEmail });

        
        if (authenticatedUserFiles.length === 0) {
            
            const userInitialData = initialData.filter(item => item.userId === loggedInUserEmail);

            
            if (userInitialData.length > 0) {
                authenticatedUserFiles = await filesModel.create(userInitialData);
            } else {
                return response.status(404).json({ message: 'No data available for this user' });
            }
        }

        
        response.status(200).json({
            message: 'Files and folders retrieved successfully',
            data: authenticatedUserFiles
        });
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
};

module.exports = { displayFilesAndFolders };
