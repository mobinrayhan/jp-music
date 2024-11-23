const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

module.exports = isAuth = async (req, res, next) => {
  try {
    const header = req.get('Authorization');

    if (!header) {
      const error = new Error('Authorization header is missing!');
      error.status = 401;
      return next(error); // Pass error to error-handling middleware
    }

    const token = header.split(' ')[1]; // Extract token from Bearer token

    if (!token) {
      const error = new Error('User is not authenticated!');
      error.status = 401;
      return next(error);
    }

    let decodeToken;
    try {
      decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      const error = new Error('Invalid token!');
      error.status = 403;
      return next(error);
    }

    if (!decodeToken) {
      const error = new Error('User is not authenticated!');
      error.status = 401;
      return next(error);
    }

    req.user = decodeToken; // Attach the decoded token to the request
    next(); // Call the next middleware
  } catch (err) {
    next(err); // Pass any unexpected error to the error-handling middleware
  }
};
