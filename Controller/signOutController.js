const signOutController = (request, response) => {
    response.clearCookie('authToken', { domain: '.vercel.app', path: '/', secure: true, sameSite: 'Strict' });
    response.clearCookie('id_token', { domain: '.vercel.app', path: '/', secure: true, sameSite: 'Strict' });
    response.clearCookie('access_token', { domain: '.vercel.app', path: '/', secure: true, sameSite: 'Strict' });
    response.clearCookie('userProfile', { domain: '.vercel.app', path: '/', secure: true, sameSite: 'Strict' });
    
    response.status(200).send({ message: 'Successfully signed out' });

};

module.exports = { signOutController };
