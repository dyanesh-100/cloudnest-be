const oAuth2Client = require('../Config/googleOAuthConfig')

const generateAuthUrl = () => {
    const scopes = ['openid', 'profile', 'email']
    return oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
        prompt: 'consent',
        scope: scopes
    })
}

const getUserDataFromCode = async (code, response) => {
    try {
        const { tokens } = await oAuth2Client.getToken(code)
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        }
        response.cookie('access_token', tokens.access_token, options)
        response.cookie('id_token', tokens.id_token, options)
        return await fetchUserData(tokens.access_token)
    } catch (error) {
        
        throw new Error('Failed to get user data')
    }
}


const fetchUserData = async (accessToken) => {
   
    
    try {
        const response = await fetch(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
        )
     
       
        if (!response.ok) {
            throw new Error(`Error fetching user data: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        
        data.accessToken = accessToken
        console.log(data);
        return data
        
        
        
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch user data")
    }
}

const verifyAccessToken = async (idToken) => {
    try {
        const ticket = await oAuth2Client.verifyIdToken({
            idToken: idToken,
            audience: process.env.GAUTH_CLIENT_ID,
        })
        const payload = ticket.getPayload()
        return payload
    } catch (error) {
        throw new Error('Invalid access token')
    }
}


module.exports = {
    generateAuthUrl,
    getUserDataFromCode,
    verifyAccessToken
}