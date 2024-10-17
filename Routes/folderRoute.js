const express = require("express")
const authenticateUser = require("../Middleware/authenticateUser")
const { createFolder, getFolder, updateLastOpenedAt } = require("../Controller/folderController")

const router = express.Router()

router.post('/create-folder/:parentid?',authenticateUser,createFolder)

router.get('/folders/:parentid?',authenticateUser,getFolder)

router.put('/folders/:folderid/open', updateLastOpenedAt);




module.exports = router