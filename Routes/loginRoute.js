const express = require("express")
const { loginExistingUser } = require("../Controller/loginController")

const router = express.Router()

router.post('/login',loginExistingUser)


module.exports = router