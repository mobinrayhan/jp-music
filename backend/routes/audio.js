const router = require('express').Router();
const audioController = require('../controllers/audioController');
const isAuth = require('../middleware/isAuth');
const isExistUser = require('../middleware/existedUserWithRole');

// router.get('/all', audioController.getAllAudios);
// router.get('/category/:category', audioController.getAudiosByCategory);
router.get('/search/:category', audioController.getCategoryAudiosWithSearch);
router.get('/newest', audioController.getNewestAudiosWithSearch);
router.post(
  '/download',
  isAuth,
  isExistUser(),
  audioController.postDownloadAudio
);
router.get('/:id', audioController.getAudioById);

module.exports = router;
