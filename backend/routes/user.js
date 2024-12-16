const router = require('express').Router();
const userController = require('../controllers/userController');

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

module.exports = router;
