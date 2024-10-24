const router = require('express').Router();
const userController = require('../controllers/userController');
const isAuth = require('../middleware/is-auth');

router.get('/downloads', isAuth, userController.getDownloads);
router.get('/favorites', isAuth, userController.getFavorites);
router.get('/favorites-ids', isAuth, userController.getFavoriteIds);
router.post('/toggle-favorites', isAuth, userController.postToggleFavourites);

module.exports = router;
