const signOutController = (request, response) => {
    console.log('Signing out...'); // Log for debugging

    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = {
        path: '/',
        secure: isProduction,
        sameSite: 'Strict',
    };

    if (isProduction) {
        cookieOptions.domain = '.vercel.app';
    }

    // Clear cookies
    response.clearCookie('authToken', cookieOptions);
    response.clearCookie('id_token', cookieOptions);
    response.clearCookie('access_token', cookieOptions);
    response.clearCookie('userProfile', cookieOptions);
    
    console.log('Cookies cleared'); // Log for debugging

    response.status(200).send({ message: 'Successfully signed out' });
};

module.exports = { signOutController };
