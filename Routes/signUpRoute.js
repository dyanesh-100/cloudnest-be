const express = require("express")
const { registerNewUser } = require("../Controller/signUpController")


const router = express.Router()


router.post('/signup',registerNewUser)

module.exports = router