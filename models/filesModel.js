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
      },  // Path to AWS S3
      fileFormat: {
        type: String, 
        required: true 
      },
      size: { 
        type: Number, 
        required: true 
      },  // File size in bytes
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
      }
    },
    {
        collection : 'files'
    }
)

module.exports = mongoose.model('files',filesModel)