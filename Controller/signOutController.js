const signOutController = (request, response) => {
    response.clearCookie('authToken'); 
    response.clearCookie('id_token');
    response.clearCookie('access_token');
    response.clearCookie('userProfile');
    response.status(200).send({ message: 'Successfully signed out' });

};

module.exports = { signOutController };
