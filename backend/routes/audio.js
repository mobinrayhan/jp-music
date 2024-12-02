const router = require('express').Router();
const audioController = require('../controllers/audioController');
const isAuth = require('../middleware/isAuth');
const existedUserWithRole = require('../middleware/existedUserWithRole');
const isExistUser = require('../middleware/existedUserWithRole');
const { upload } = require('../config/multerConfig');

// router.get('/all', audioController.getAllAudios);
// router.get('/category/:category', audioController.getAudiosByCategory);
router.get('/search/:category', audioController.getCategoryAudiosWithSearch);
router.get('/newest', audioController.getNewestAudiosWithSearch);
router.post(
  '/download',
  isAuth,
  existedUserWithRole(),
  audioController.postDownloadAudio
);

router.post(
  '/upload-audios',
  isAuth,
  existedUserWithRole({ from: 'JWT', accessibleRole: 'admin' }),
  upload.array('files', Infinity),
  audioController.postUploadAudios
);

router.post(
  '/edit',
  isAuth,
  upload.single('file'),
  existedUserWithRole({ from: 'JWT', accessibleRole: 'admin' }),
  audioController.postEditAudio
);

router.delete(
  '/delete',
  isAuth,
  existedUserWithRole({ from: 'JWT', accessibleRole: 'admin' }),
  audioController.deleteAudio
);
router.get('/:id', audioController.getAudioById);

module.exports = router;
