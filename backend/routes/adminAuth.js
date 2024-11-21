const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminAuthController');
const { body } = require('express-validator');
const isAuth = require('../middleware/is-auth');

router.post(
  '/create-account',
  body('name')
    .isString()
    .withMessage('Name must be a string.')
    .notEmpty()
    .withMessage('Name is required.'),
  body('email').isEmail().withMessage('Email is not valid.').normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
  body('role')
    .isString()
    .withMessage('Role Must be String!')
    .notEmpty()
    .withMessage('Role is required.'),
  isAuth,
  adminController.createUserByAdmin
);

router.post(
  '/login',
  body('email').isEmail().withMessage('Email is not valid.').normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
  adminController.postLoginUser
);

router.get('/user/:userId', isAuth, adminController.getAdminUserById);

module.exports = router;
