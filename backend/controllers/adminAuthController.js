const bcrypt = require('bcryptjs');
const authModels = require('./../models/authModel');
const jwt = require('jsonwebtoken');

exports.createUserByAdmin = async function (req, res, next) {
  const { username, email, password, role } = req.body;

  try {
    const user = await authModels.findUser(email);

    if (user) {
      const error = new Error('User Already Found With This Email!');
      error.statusCode = 401;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await authModels.createNewUser({
      username,
      password: hashedPassword,
      isActive: true,
      email,
      role,
    });

    return res.json({ message: 'User created successfully.' });
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};

exports.postLoginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await authModels.findUser(email);
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

    await authModels.updateLastLogin(email);

    return res.status(200).json({
      message: 'Login successful',
      token,
      userId: user._id.toString(),
      isActive: user.isActive,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAdminUserById = async (req, res, next) => {
  const { email } = req.user;

  try {
    const user = await authModels.findUser(email);

    if (!user) {
      const error = new Error('User not Found!');
      error.statusCode = 401;
      throw error;
    }

    return res.status(200).json({ message: 'Admin user found!', user });
  } catch (e) {
    next(e);
  }
};
