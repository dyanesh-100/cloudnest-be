const mongoose = require('mongoose')

const userModel = new mongoose.Schema(
    {
        accountType: {
            type: String,
            enum: ['google', 'email'],
            default: 'email'
        },
        firstName : {
            type : String,
            required : true
        },
        lastName : {
            type : String,
            required : true
        },
        profilePic: {
            type: String, 
        },
        email : {
            type : String,
            required : true,
            unique : true
        },
        password : {
            type : String,
            required: function() {
                return this.signInType === 'email';
            },
        }
    },
    {
        collection : 'users'
    }
)

module.exports = mongoose.model('users',userModel)