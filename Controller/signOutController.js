const signOutController = (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  };

  res.clearCookie('authToken', options);
  res.clearCookie('id_token', options);
  res.clearCookie('access_token', options);
  res.clearCookie('userProfile', options);

  return res.status(200).json({ message: 'Successfully signed out' });
};

module.exports = { signOutController };
