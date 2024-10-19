const router = require('express').Router();
const userController = require('../controllers/userController');
const isAuth = require('../middleware/is-auth');

router.get('/downloads/:id', isAuth, userController.getDownloadsById);

module.exports = router;
