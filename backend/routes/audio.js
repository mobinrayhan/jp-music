const router = require('express').Router();
const audioController = require('../controllers/audioController');
const isAuth = require('../middleware/isAuth');

// router.get('/all', audioController.getAllAudios);
// router.get('/category/:category', audioController.getAudiosByCategory);
router.get('/search/:category', audioController.getCategoryAudiosWithSearch);
router.get('/newest', audioController.getNewestAudiosWithSearch);
router.post('/download', isAuth, audioController.postDownloadAudio);
router.get('/:id', audioController.getAudioById);

module.exports = router;
