const router = require('express').Router();
const audioController = require('../controllers/audioController');
const isAuth = require('../middleware/isAuth');
const isExistUser = require('../middleware/existedUserWithRole');
const { upload } = require('../config/multerConfig');

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

router.post('/upload-audios', upload.array('files', Infinity), (req, res) => {
  try {
    const { files } = req;
    if (!files) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    res.status(200).json({
      message: 'File uploaded successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/:id', audioController.getAudioById);

module.exports = router;
