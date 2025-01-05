const { Router } = require('express');
const { updateGeneral } = require('../controllers/settingsController');
const { upload } = require('../config/multerConfig');
const router = Router();

router.put('/general', upload.single('logo'), updateGeneral);

module.exports = router;
