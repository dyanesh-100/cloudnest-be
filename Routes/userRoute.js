const express = require("express");
const { getAllUsers } = require("../Controller/userDataController");
const authenticateUser = require("../Middleware/authenticateUser");

const router = express.Router();

router.get('/userdata', authenticateUser, getAllUsers); // Protected route

module.exports = router;
