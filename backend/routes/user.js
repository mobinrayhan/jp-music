const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
  return res.json('Hello world');
});
router.get('/downloads/:id', userController.getDownloadsById);

module.exports = router;
