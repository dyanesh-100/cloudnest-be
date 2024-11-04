const { generateAuthUrl, getUserDataFromCode, verifyAccessToken} = require("../Services/googleAuthServices")
const { setResponseBody } = require("../Utils/setResponseBody")
const userModel = require('../Models/userModel')

const getGoogleAuthPageUrl = (request, response) => {
    response.header('Access-Control-Allow-Origin',process.env.CLIENT_URL)
    response.header('Referrer-Policy', 'no-referer-when-downgrade')

    try {
        const url = generateAuthUrl()
        response.status(200).send(setResponseBody("Url Generated successfully", null, url))
    } 
    catch(error) {
        response.status(500).send(setResponseBody(error.message, "server_error", null))
    }
} 

const handleGoogleAuthCallback = async (request, response) => {
    const code = request.query.code

    try {
        const userData = await getUserDataFromCode(code, response)
        // console.log('User Data:', userData);
        response.cookie('userProfile', JSON.stringify(userData), {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000, 
        });
        // response.status(200).send(userData)

        response.redirect(`${process.env.CLIENT_URL}/google-account-verification`)
    } 
    catch(error) {
        console.error(error)
        response.status(500).send(setResponseBody(error.message, "server_error", null))
    }
}

const verifyToken = async (request, response) => {
    const accessToken = request.cookies.access_token;
    const idToken = request.cookies.id_token;


    if (!accessToken) {
        return response.status(401).send('No access token provided')
    }

    try {
        const userData = await verifyAccessToken(idToken)
        
        const formattedUserData = {
            firstName: userData.given_name,
            lastName: userData.family_name,
            profilePic: userData.picture,
            email: userData.email,
        }

        const existingUser = await userModel.findOne({ email: formattedUserData.email })

        if(!existingUser) {
            const newUser = new userModel({
                accountType: 'google',
                firstName: formattedUserData.firstName,
                lastName: formattedUserData.lastName,
                profilePic: formattedUserData.profilePic,
                email: formattedUserData.email
            })
            await newUser.save()
        }
        
        response.status(200).send(setResponseBody("Data Fetched", null, formattedUserData))
    } catch (error) {
        console.error('Error verifying token:', error);
        response.status(401).send('Invalid ID token');
    }
}

module.exports = {
    getGoogleAuthPageUrl,
    handleGoogleAuthCallback,
    verifyToken
}