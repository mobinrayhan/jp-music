const jwt = require('jsonwebtoken');

module.exports = isAuth = (req, res, next) => {
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

  req.user = decodeToken;
  next();
};
