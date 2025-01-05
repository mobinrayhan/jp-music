const { Router } = require('express');
const { postGeneral } = require('../controllers/settingsController');
const router = Router();

router.post('/general', postGeneral);

module.exports = router;
