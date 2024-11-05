const jwt = require('jsonwebtoken');
const { verifyAccessToken } = require('../Services/googleAuthServices');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateUser = async (request, response, next) => {
    const authToken = request.cookies.authToken;
    const googleIdToken = request.cookies.id_token;

    if (!authToken && !googleIdToken) {
        return response.status(403).json({ message: 'Token missing or invalid' });
    }

    try {
        if (authToken) {
            const decoded = jwt.verify(authToken, JWT_SECRET);
            request.userId = decoded.email;
            
            next();
        } else if (googleIdToken) {
            const googleUser = await verifyAccessToken(googleIdToken);
            if (!googleUser) {
                return response.status(403).json({ message: 'Invalid Google token' });
            }
            request.userId = googleUser.email;
           
            next();
        }
    } catch (error) {
        console.error('Authentication error:', error.message);
        return response.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticateUser;
