const router = require('express').Router();
const userController = require('../controllers/userController');
const isAuth = require('../middleware/isAuth');
const isExistUser = require('../middleware/isUserExist');

router.get('/downloads', isAuth, userController.getDownloads);
router.get('/favorites', isAuth, userController.getFavorites);
router.post('/create-playlist', isAuth, userController.postCreatePlaylist);
router.post(
  '/add-audio-to-playlist',
  isAuth,
  isExistUser(),
  userController.postAddAudioToPlaylist
);
router.get('/get-playlist', isAuth, userController.getPlaylists);
router.get(
  '/get-playlist-audios/:playlistSlug',
  isAuth,
  isExistUser(),
  userController.getPlaylistAudios
);
router.get(
  '/get-playlist/:slug',
  isAuth,
  isExistUser(),
  userController.getPlaylist
);
router.get(
  '/favorites-ids',
  isAuth,
  isExistUser(),
  userController.getFavoriteIds
);
router.post(
  '/toggle-favorites',
  isAuth,
  isExistUser(),
  userController.postToggleFavourites
);

module.exports = router;
