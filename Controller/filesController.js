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
        let totalStorageUsed = 0;
        let documentSize = 0, videoSize = 0, imageSize = 0, audioSize = 0 ;

        authenticatedUserFiles
            .filter(item => item.type === 'file')
            .forEach(file => {
                totalStorageUsed += (file.size || 0)

                switch(file.fileFormat){
                    case 'mp4':
                    case 'mkv':
                    case 'avi':
                        videoSize += file.size;
                        break;
                    case 'mp3':
                    case 'wav':
                    case 'aac':
                        audioSize += file.size;
                        break;
                    case 'jpeg':
                    case 'jpg':
                    case 'png':
                    case 'gif':
                        imageSize += file.size;
                        break;
                    default:
                        documentSize += file.size;
                        break;
                }
            })
            
        response.status(200).json({
            message: 'Files and folders retrieved successfully',
            data: authenticatedUserFiles,
            totalStorageUsed: totalStorageUsed,
            categorizedSizes: {
                documentSize,
                videoSize,
                audioSize,
                imageSize
            }
        });
    } catch (error) {
        response.status(500).send({ message: error.message });
    }

};

module.exports = { displayFilesAndFolders };
