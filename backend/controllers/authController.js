const authModels = require('../models/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createNewUser = async function (req, res, next) {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await authModels.createNewUser({
      username,
      password: hashedPassword,
      email,
      role,
    });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await authModels.findUser(email);

    if (!user) {
      const error = new Error('User not found!');
      error.statusCode = 404;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error('Invalid credentials!');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { email: user.email, id: user._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      userId: user._id.toString(),
    });
  } catch (err) {
    next(err);
  }
};
