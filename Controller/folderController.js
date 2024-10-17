const folder = require('../Models/folderModel')

const createFolder = async(request,response) => {
    const {folderName} = request.body;
    const userId = request.userId;
    const parentId = request.params.parentid || null;

    try{
        const newFolder = new folder({
            folderName,
            userId,
            parentId
        })
        await newFolder.save()

        response.status(201).json({message: 'Folder is created sucessfully', data: newFolder})

    }
    catch(error){
        response.status(500).json({message: error.message})
    }
}

const getFolder = async(request,response) => {
    const userId = request.userId
    const {parentId} = request.params

    try{
        const folders = await folder.find({userId, parentId })
        response.status(200).json({message:'Folders retrieved successfully', data:folders})
    }
    catch(error){
        response.status(500).json({message: error.message})
    }
}
const updateLastOpenedAt = async (req, res) => {
    const { folderid } = req.params;
    try {
      const folder = await folder.findById(folderid);
  
      if (!folder) {
        return res.status(404).json({ message: "Folder not found" });
      }
  
      
      folder.lastOpenedAt = new Date();
      await folder.save();
  
      res.status(200).json({ message: "Last opened time updated", folder });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };


module.exports = {createFolder,getFolder,updateLastOpenedAt}