const { request, response } = require('express');
const filesModel = require('../Models/filesModel');
const s3 = require('../Config/awsS3Config')
const mongoose = require('mongoose'); 
const { PutObjectCommand} = require('@aws-sdk/client-s3');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const displayFilesAndFoldersMetaData = async (request, response) => {
    try {
        const loggedInUserEmail = request.userId;
        
        const authenticatedUserFiles = await filesModel.find({ userId: loggedInUserEmail });

        if (authenticatedUserFiles.length === 0) {
            return response.status(404).json({ message: 'No data available for this user' });
        }

        let totalStorageUsed = 0;
        let documentSize = 0, videoSize = 0, imageSize = 0, audioSize = 0;


        authenticatedUserFiles.forEach(file => {
            totalStorageUsed += file.size || 0;

            switch (file.fileFormat) {
                case 'video/mp4':
                case 'video/mkv':
                case 'video/avi':
                    videoSize += file.size;
                    break;
                case 'audio/mp3':
                case 'audio/wav':
                case 'audio/aac':
                    audioSize += file.size;
                    break;
                case 'image/jpeg':
                case 'image/jpg':
                case 'image/png':
                case 'image/gif':
                    imageSize += file.size;
                    break;
                case 'application/pdf':
                    documentSize += file.size;
                    break;
                default:
                    documentSize += file.size; // Consider anything else as a document
                    break;
            }
        });

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

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const uploadFile = async (request, response) => {
    if (!request.file) {
        return response.status(400).json({ message: 'No file provided' });
    }
    
    const { originalname, buffer,size } = request.file;
    const userId = request.userId;
    const parentId = request.params.parentid || null;


    const fileKey = `upload/${userId}/${Date.now()}_${originalname}`

    try {
        if (parentId && !isValidObjectId(parentId)) {
            return response.status(400).json({ message: 'Invalid parent folder ID' });
        }
        
        const authenticatedUserFiles = await filesModel.find({ userId: userId });
        let totalStorageUsed = 0;

        authenticatedUserFiles.forEach(file => {
            totalStorageUsed += (file.size || 0);
        });

        const maxStorage = 3 * 1024 * 1024 * 1024; 

        
        if (totalStorageUsed + size > maxStorage) {
            return response.status(403).json({ message: 'Storage limit reached. Cannot upload more files.' });
        }
        const params ={
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileKey,
            Body: buffer,
            ContentType: request.file.mimetype,
            ServerSideEncryption:"AES256"
        }
        await s3.send(new PutObjectCommand(params));

        const fileMetadata = new filesModel({
            fileName: originalname,
            filePath : fileKey,
            type: 'file',
            size: request.file.size,
            userId: userId,
            parentId: parentId,
            fileFormat: request.file.mimetype,
            
        });

        await fileMetadata.save();
        response.status(200).json({ message: 'File uploaded successfully', data: fileMetadata });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const downloadFile = async(request,response) =>{
    const{fileid} = request.params
    console.log("Fetched File:", fileid);

    try{
        const file = await filesModel.findById(fileid)
        

        if(!file){
            return response.status(404).json({message:'File not found'})
        }

        const s3Params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key : file.filePath,
        }
        const command = new GetObjectCommand(s3Params);
        const s3Client = new S3Client({ region: process.env.AWS_REGION })
        const downloadUrl =await getSignedUrl(s3Client,command,{expiresIn: 3600})
        file.lastOpenedAt = Date.now()
        await file.save()

        response.status(200).json({downloadUrl})
    }
    catch(error){
        console.error('Upload error:', error)
        response.status(500).json({message:error.message})
    }
}
const deleteFile = async(request,response) => {
    const {fileid} = request.params
    const userId = request.userId

    try{
        file = await filesModel.findOne({_id: fileid,userId})
        if(!file){
            return response.status(404).json({message:'file not found'})
        }

        if(file.userId !== userId){
            return response.status(403).json({ error: 'You are not authorized to delete this file' })
        }
        await file.deleteOne({ _id: fileid });
        
        return response.status(200).json({message:'File deleted successfully'})
    }
    catch(error){
        console.error('Error deleting file:', error);
        return response.status(500).json({ error: 'Server error' });
    }
}

const toggleFavourite = async (request, response) => {
    const { fileid } = request.params;
    const userId = request.userId;

    try {
        const file = await filesModel.findOne({ _id: fileid, userId });
        
        if (!file) {
            return response.status(404).json({ message: 'File or folder not found' });
        }

        file.isFavourite = !file.isFavourite;  
        await file.save();

        response.status(200).json({ message: `File or folder ${file.isFavourite ? 'added to' : 'removed from'} favourites`, file });
    } catch (error) {
        response.status(500).json({ message: 'Error toggling favourite status', error: error.message });
    }
};

const getFavouriteFilesAndFolders = async (request, response) => {
    const userId = request.userId;

    try {
        const favourites = await filesModel.find({ userId, isFavourite: true });

        if (!favourites.length) {
            return response.status(404).json({ message: 'No favourite files or folders found' });
        }

        response.status(200).json({ message: 'Favourite files and folders retrieved successfully', favourites });
    } catch (error) {
        response.status(500).json({ message: 'Error retrieving favourite files or folders', error: error.message });
    }
};



module.exports = { displayFilesAndFoldersMetaData,uploadFile,downloadFile,toggleFavourite,getFavouriteFilesAndFolders,deleteFile};
