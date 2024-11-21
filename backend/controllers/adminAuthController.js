const bcrypt = require('bcryptjs');
const authModels = require('./../models/authModel');

exports.createUserByAdmin = async function (req, res, next) {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(username, email, password, role, hashedPassword);

  try {
    const user = await authModels.findUser(email);

    if (user && user.isActive) {
      const error = new Error('User already exists!');
      error.statusCode = 409;
      throw error;
    }

    const createdUser = await authModels.createNewUser({
      username,
      password: hashedPassword,
      isActive: true,
      email,
      role,
    });

    console.log(createdUser);

    return res.json({ message: 'User created successfully.' });
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};
