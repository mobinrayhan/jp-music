const router = require('express').Router();
const userController = require('../controllers/userController');
const isAuth = require('../middleware/isAuth');
const existedUserWithRole = require('../middleware/existedUserWithRole');

router.get('/all', userController.getAllUsersWithSearch);
router.get('/downloads', userController.getDownloads);
router.get('/favorites', userController.getFavorites);
router.post('/create-playlist', userController.postCreatePlaylist);
router.post(
  '/add-audio-to-playlist',

  userController.postAddAudioToPlaylist
);
router.get('/get-playlist', userController.getPlaylists);
router.get(
  '/get-playlist-audios/:playlistSlug',
  userController.getPlaylistAudios
);
router.get('/get-playlist/:slug', userController.getPlaylist);
router.get('/favorites-ids', userController.getFavoriteIds);
router.post('/toggle-favorites', userController.postToggleFavourites);
router.put('/toggle-active-status', userController.postUpdateActiveStatus);
router.put('/update-user', userController.editUser);

module.exports = router;
