const mongoose = require('mongoose')

const filesModel = new mongoose.Schema(
    {
      fileName: { 
        type: String, 
        required: true 
      },
      filePath: { 
        type: String, 
        required: true 
      },  
      fileFormat: {
        type: String, 
        required: true 
      },
      size: { 
        type: Number, 
        required: true 
      },  
      createdAt: { 
        type: Date, 
        default: Date.now 
      },
      lastOpenedAt: { 
        type: Date, 
        default: Date.now 
      },
      userId: { 
        type: String, 
        required: true 
      }, 
      isFavourite: { 
        type: Boolean, 
        default: false 
      },
      parentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Folder', 
        default: null 
      }
    },
    {
        collection : 'files'
    }
)

module.exports = mongoose.model('files',filesModel)