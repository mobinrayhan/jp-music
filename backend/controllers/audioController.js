const audioModels = require('../models/audioModel');

exports.getAllAudios = async function (req, res, next) {
  const allAudios = await audioModels.getAllAudios();
  return res.json({ message: 'Get Audio Successfully', audios: allAudios });
};

exports.getAudiosByCategory = async (req, res, next) => {
  const { category } = req.params;
  try {
    const categoryAudios = await audioModels.getAudioByCategoryName(category);

    if (!categoryAudios.length) {
      const error = new Error('No Audios Found in this category!');
      error.statusCode = 404;
      throw error;
    }

    return res.json({
      message: 'Get Category Audio Successfully',
      audios: categoryAudios,
    });
  } catch (err) {
    err.statusCode = 404;
    next(err);
  }
};

exports.getAudioBySearch = async (req, res, next) => {
  const { query } = req.query;
  const { category } = req.params;
  try {
    const searchResultAudios = await audioModels.getAudioBySearch(
      query,
      category
    );

    if (!searchResultAudios.length) {
      const error = new Error('No Audios Found in this search text!');
      error.statusCode = 404;
      throw error;
    }

    return res.json({
      message: 'Get Search Audios Successfully',
      audios: searchResultAudios,
    });
  } catch (err) {
    err.statusCode = 404;
    next(err);
  }
};
