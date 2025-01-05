const { Router } = require('express');
const {
  updateGeneral,
  getGeneral,
} = require('../controllers/settingsController');
const { upload } = require('../config/multerConfig');
const isAuth = require('../middleware/isAuth');
const existedUserWithRole = require('../middleware/existedUserWithRole');
const router = Router();

router.get('/general', getGeneral);

router.put(
  '/general',
  isAuth,
  existedUserWithRole({
    from: 'JWT',
    accessibleRole: 'admin',
    checkIsActive: true,
  }),
  upload.single('logo'),
  updateGeneral
);

module.exports = router;
