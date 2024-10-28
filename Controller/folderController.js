const folderModel = require('../Models/folderModel');
const mongoose = require('mongoose');
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const createFolder = async (request, response) => {
    const { folderName } = request.body;
    const userId = request.userId;
    const parentId = request.params.parentid || null;

    try {

        if (parentId && !isValidObjectId(parentId)) {
            return response.status(400).json({ message: 'Invalid parent folder ID' });
        }

        const existingFolder = await folderModel.findOne({ folderName, userId, parentId });
        if (existingFolder) {
            return response.status(400).json({ message: 'Folder with this name already exists in the parent folder' });
        }

        const newFolder = new folderModel({
            folderName,
            userId,
            parentId
        });
        await newFolder.save();

        response.status(201).json({ message: 'Folder created successfully', data: newFolder });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const getFolder = async (request, response) => {
    const userId = request.userId;
    
    try {
        
        const folders = await folderModel.find({userId:userId});
        response.status(200).json({ message: 'Folders retrieved successfully', data: folders });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};
const deleteFolder = async(request,response) => {
  const {folderid} = request.params
  const userId = request.userId

  try{
      folder = await folderModel.findOne({_id: folderid,userId})
      if(!folder){
          return response.status(404).json({message:'file not found'})
      }

      if(folder.userId !== userId){
          return response.status(403).json({ error: 'You are not authorized to delete this folder' })
      }
      await folder.deleteOne({ _id: folderid });
      
      return response.status(200).json({message:'Folder deleted successfully'})
  }
  catch(error){
      console.error('Error deleting folder:', error);
      return response.status(500).json({ error: 'Server error' });
  }
}

const updateLastOpenedAt = async (request, response) => {
    const { folderid } = request.params;
    try {
        
        if (!isValidObjectId(folderid)) {
            return response.status(400).json({ message: 'Invalid folder ID' });
        }

        const folderData = await folderModel.findById(folderid);

        if (!folderData) {
            return response.status(404).json({ message: 'Folder not found' });
        }

        folderData.lastOpenedAt = new Date();
        await folderData.save();

        response.status(200).json({ message: 'Last opened time updated', folder: folderData });
    } catch (error) {
        response.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {createFolder,getFolder,updateLastOpenedAt,deleteFolder};
