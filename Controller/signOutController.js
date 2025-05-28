const signOutController = (request, response) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax', // Use 'None' if your frontend and backend are on different domains
        path: '/',
    };

    response.clearCookie('authToken', cookieOptions);
    response.clearCookie('id_token', cookieOptions);
    response.clearCookie('access_token', cookieOptions);
    response.clearCookie('userProfile', cookieOptions);

    response.status(200).send({ message: 'Successfully signed out' });
};
