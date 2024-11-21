const router = require('express').Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator');

router.post(
  '/signup',
  body('name')
    .isString()
    .withMessage('Name must be a string.')
    .notEmpty()
    .withMessage('Name is required.'),
  body('email').isEmail().withMessage('Email is not valid.').normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
  authController.createNewUser
);

router.post('/providers', authController.createNewUserByProvider);
router.patch('/verify-email', authController.verifyEmail);
router.get('/check-active-status/:userId', authController.getActiveStatus);
router.get('/forget-password', authController.getForgetPassword);
router.patch('/forget-password', authController.postForgetPassword);
router.get('/is-valid-token', authController.isValidToken);

router.post(
  '/login',
  body('email').isEmail().withMessage('Email is not valid.').normalizeEmail(),
  authController.loginUser
);

module.exports = router;
