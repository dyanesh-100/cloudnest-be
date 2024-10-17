const express = require("express")
const {displayFilesAndFoldersMetaData, uploadFile, downloadFile, toggleFavourite, getFavouriteFilesAndFolders } = require("../Controller/filesController")
const upload = require("../Middleware/multer")
const authenticateUser = require("../Middleware/authenticateUser")

const router = express.Router()

router.post('/upload/:parentid?',authenticateUser,upload,uploadFile)

router.get('/download/:fileid',authenticateUser,downloadFile)

router.post('/files',authenticateUser,displayFilesAndFoldersMetaData)

router.get('/files',authenticateUser,displayFilesAndFoldersMetaData)

router.post('/favourite/:fileid', authenticateUser, toggleFavourite);

router.get('/favourites', authenticateUser, getFavouriteFilesAndFolders);


module.exports = router