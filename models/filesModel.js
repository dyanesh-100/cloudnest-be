const mongoose = require('mongoose')

const filesModel = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
          },
          name: {
            type: String,
            required: true
          },
          type: {
            type: String,
            required: true,
            enum: ['file', 'folder']
          },
          size: {
            type: Number,  
            default: null
          },
          parentId: {
            type: String,  
            default: null
          },
          createdAt: {
            type: Date,
            required: true,
            default: Date.now
          },
          lastModifiedAt: {
            type: Date,
            required: true,
            default: Date.now
          },
          userId: {
            type: String,
            required: true  
          },
          fileFormat: { 
            type: String, 
            default: null 
        }
    },
    {
        collection : 'files'
    }
)

module.exports = mongoose.model('files',filesModel)