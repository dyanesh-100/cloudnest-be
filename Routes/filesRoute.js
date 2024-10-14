const express = require("express")
const { displayFilesAndFolders } = require("../Controller/filesController")
const { displayUserData } = require("../Controller/userController")


const router = express.Router()

router.post('/cloudnest',displayFilesAndFolders,displayUserData)


module.exports = router