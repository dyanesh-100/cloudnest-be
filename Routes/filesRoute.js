const express = require("express")
const { displayFilesAndFolders } = require("../Controller/filesController")

const router = express.Router()

router.post('/cloudnest',displayFilesAndFolders)


module.exports = router