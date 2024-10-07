const categoryModels = require('../models/categoryModel');

exports.getAllCategories = async function (req, res, next) {
  try {
    const category = await categoryModels.getAllCategories();
    return res.json({
      message: 'Get All Categories Successfully',
      category,
    });
  } catch (err) {
    next(err);
  }
};
