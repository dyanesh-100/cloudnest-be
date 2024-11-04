const express = require('express');
const router = express.Router();

const { getGoogleAuthPageUrl, handleGoogleAuthCallback, verifyToken } = require('../Controller/googleAuthController');


router.get('/page-request', getGoogleAuthPageUrl);
router.get('/gauth/verify-user', handleGoogleAuthCallback);


router.get('/verify', verifyToken);

module.exports = router;
