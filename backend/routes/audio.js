const router = require('express').Router();
const audioController = require('../controllers/audioController');

router.get('/all', audioController.getAllAudios);

module.exports = router;
