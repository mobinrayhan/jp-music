const express = require('express');
const { getCategoryList } = require('../models/categoryModel');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getAllCategories);

module.exports = router;
