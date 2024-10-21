const express = require("express")
const authenticateUser = require("../Middleware/authenticateUser")
const { createFolder, getFolder, updateLastOpenedAt, deleteFolder } = require("../Controller/folderController")

const router = express.Router()

router.post('/create-folder/:parentid?',authenticateUser,createFolder)

router.get('/folders',authenticateUser,getFolder)

router.delete('/folders/:folderid',authenticateUser,deleteFolder)

router.put('/folders/:folderid/open',authenticateUser, updateLastOpenedAt);




module.exports = router