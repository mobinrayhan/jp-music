const authModels = require('../models/authModel');
const userModels = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { productionFrontURL, localhostFrontURL } = require('../constants/links');

exports.createNewUser = async function (req, res, next) {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const transporter = nodemailer.createTransport({
      // service: process.env.EMAIL_SERVICE,
      host: 'smtp.gmail.com', // Define Gmail's SMTP host
      port: 587, // Port for TLS
      secure: false, // True for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const isExistUser = await userModels.getActiveStatus(email);
    const isActiveUser = await userModels.getActiveStatus(email);

    if (isExistUser && !isActiveUser) {
      const error = new Error(
        'User already exists. Please try logging in or use a different email.'
      );
      error.statusCode = 409;
      throw error;
    }

    if (isExistUser && isActiveUser) {
      const error = new Error(
        'Your account has been disabled by the administrator. Please contact support for further assistance.'
      );
      error.statusCode = 409;
      throw error;
    }

    if (!isExistUser) {
      await authModels.createNewUser({
        username,
        password: hashedPassword,
        isActive: false,
        email,
        role,
      });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    const verificationLink = `${
      process.env.NODE_ENV === 'production'
        ? productionFrontURL
        : localhostFrontURL
    }/verify-email?token=${token}`;

    // Send verification email
    await transporter.sendMail({
      to: email,
      subject: 'Verify your email',
      html: `<a href="${verificationLink}">Click here to verify your email</a>`,
    });

    res.status(200).json({ message: 'Verification email sent' });
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};

exports.createNewUserByProvider = async function (req, res, next) {
  const { username, email, role } = req.body;

  try {
    const user = await authModels.findUser(email);

    if (user) {
      if (user.isActive) {
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
          isActive: user.isActive,
        });
      } else {
        return res.status(409).json({
          message: 'User is disable by admin',
        });
      }
    }

    const createdUser = await authModels.createNewUser({
      username,
      email,
      role,
      isActive: true,
    });

    const token = jwt.sign(
      { email, id: createdUser.insertedId.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      isActive: true,
      userId: createdUser.insertedId.toString(),
    });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
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

exports.verifyEmail = async (req, res, next) => {
  const { token } = req.query;

  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await authModels.updateActiveStatus(decodedToken.email, true);

    if (!user.modifiedCount) {
      const error = new Error('Failed to update user! Try Again Later !');
      error.statusCode = 400;
      throw error;
    }

    return res.json({ message: 'E-mail verified Successfully!' });
  } catch (e) {
    next(e);
  }
};

exports.getActiveStatus = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userModels.getUser(userId);

    return res.json({
      isActive: user.isActive,
      message: 'Get User Status Successfully',
    });
  } catch (err) {
    next(err);
  }
};

exports.getForgetPassword = async (req, res, next) => {
  const { email } = req.query;

  try {
    const transporter = nodemailer.createTransport({
      // service: process.env.EMAIL_SERVICE,
      host: 'smtp.gmail.com', // Define Gmail's SMTP host
      port: 587, // Port for TLS
      secure: false, // True for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const user = await authModels.findUser(email);

    if (!user || !user.password || !user.isActive) {
      const error = new Error('User Not Found!');
      error.statusCode = 404;
      throw error;
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '5m',
    });
    const resetLink = `${
      process.env.NODE_ENV === 'production'
        ? productionFrontURL
        : localhostFrontURL
    }/reset-password?token=${token}`;

    // Send verification email
    await transporter.sendMail({
      to: email,
      subject: 'Password Reset Request',
      html: `<p>You requested for a password reset. Click the link below to reset your password:</p>
           <a href="${resetLink}">Reset Password</a>`,
    });

    res.status(200).json({ message: 'Verification email sent' });
  } catch (err) {
    next(err);
  }
};

// NOT SURE WHERE I USED IT😭
exports.isValidToken = async (req, res, next) => {
  const { token } = req.query;

  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await authModels.findUser(decodedToken.email);

    if (!user) {
      const error = new Error('User Not Found!');
      error.statusCode = 404;
      throw error;
    }

    return res.json({ message: 'User Found!', userId: user._id.toString() });
  } catch (e) {
    next(e);
  }
};

exports.postForgetPassword = async (req, res, next) => {
  const { userId, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const result = await authModels.updatePasswordById(userId, hashedPassword);

    if (!result.modifiedCount) {
      const error = new Error('Failed to update user! Try Again Later !');
      error.statusCode = 400;
      throw error;
    }

    return res.json({ message: 'Update Password Successfully!' });
  } catch (e) {
    next(e);
  }
};
