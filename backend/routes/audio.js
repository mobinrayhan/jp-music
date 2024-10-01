const router = require('express').Router();
const audioController = require('../controllers/audioController');

router.get('/all', audioController.getAllAudios);
router.get('/category/:category', audioController.getAudiosByCategory);

module.exports = router;
