const signOutController = (request, response) => {
    response.clearCookie('authToken'); 
    response.status(200).send({ message: 'Successfully signed out' });
};

module.exports = { signOutController };
