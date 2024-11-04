const express = require("express")
const router = express.Router()

const { signOutController } = require("../Controller/signOutController");
router.post('/signout', signOutController);

module.exports = router