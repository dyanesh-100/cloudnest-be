const jwt = require('jsonwebtoken')
const JWT_TOKEN = process.env.JWT_SECRET

const authenticateUser = (request,response,next) => {
    const token = request.headers.authorization?.split(' ')[1]
    if(!token){
        return response.status(403).json({message:'Token missing or invalid'})
    }
    try{
        const decoded = jwt.verify(token,JWT_TOKEN);
        request.userId = decoded.email;
        next()
    }
    catch(err){
        return response.status(403).json({message:'Invalid Token'})
    }
}

module.exports = authenticateUser