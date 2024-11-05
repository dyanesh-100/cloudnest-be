const { OAuth2Client } = require('google-auth-library')
require('dotenv').config()


const redirectURL = 'https://cloudnest-be.vercel.app/api/v1/gauth/verify-user'
const oAuth2Client = new OAuth2Client(
  process.env.GAUTH_CLIENT_ID,
  process.env.GAUTH_CLIENT_SECRET,
  redirectURL
)

module.exports = oAuth2Client