const router = require('express').Router();
const audioController = require('../controllers/audioController');

// router.get('/all', audioController.getAllAudios);
// router.get('/category/:category', audioController.getAudiosByCategory);
router.get('/search/:category', audioController.getCategoryAudiosWithSearch);
router.get('/newest', audioController.getNewestAudiosWithSearch);

module.exports = router;
