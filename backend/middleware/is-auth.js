const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

module.exports = isAuth = async (req, res, next) => {
  const header = req.get('Authorization');
  if (!header) {
    return res.json({ message: 'Authorization header is missing' });
  }
  const token = header && header.split(' ')[1];

  if (!token) {
    const error = new Error('User is not authenticated!');
    error.status = 404;
    throw error;
  }

  let decodeToken;
  try {
    decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    const error = new Error('User is not authenticated!');
    error.status = 404;
    throw error;
  }

  if (!decodeToken) {
    const error = new Error('User is not authenticated!');
    error.status = 404;
    throw error;
  }

  // Check if the user exists and if they are active
  const user = await userModel.getUserById(decodeToken.id);
  if (!user || !user.isActive) {
    return res
      .status(403)
      .json({
        message:
          'Your account is inactive. Please contact support or check your email for more information.',
      });
  }

  req.user = decodeToken;
  next();
};
