const mongoose = require('mongoose');

const folderModel = new mongoose.Schema(
    {
        folderName: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Folder',
            default: null 
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        lastOpenedAt: {
            type: Date, 
            default: null
          }
    },
    {
        collection : 'folders'
    }

);


module.exports = mongoose.model('folders', folderModel);
