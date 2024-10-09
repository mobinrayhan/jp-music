const audioModels = require('../models/audioModel');

// exports.getAllAudios = async function (req, res, next) {
//   const allAudios = await audioModels.getAllAudios();
//   return res.json({ message: 'Get Audio Successfully', audios: allAudios });
// };
//
// exports.getAudiosByCategory = async (req, res, next) => {
//   const { category } = req.params;
//   try {
//     const categoryAudios = await audioModels.getAudioByCategoryName(category);
//
//     if (!categoryAudios.length) {
//       const error = new Error('No Audios Found in this category!');
//       error.statusCode = 404;
//       throw error;
//     }
//
//     return res.json({
//       message: 'Get Category Audio Successfully',
//       audios: categoryAudios,
//     });
//   } catch (err) {
//     err.statusCode = 404;
//     next(err);
//   }
// };

exports.getCategoryAudiosWithSearch = async (req, res, next) => {
  const { querySearch } = req.query;
  const { category } = req.params;
  const { maxAudios } = req.query;

  try {
    const searchResultAudios = await audioModels.categoryAudiosWithSearch({
      querySearch,
      category,
      maxAudio: Number(maxAudios),
    });

    if (!searchResultAudios.totalAudios) {
      const error = new Error('No Audios Found of this category!');
      error.statusCode = 404;
      throw error;
    }

    return res.json({
      message: 'Get Category Audios Successfully',
      ...searchResultAudios,
    });
  } catch (err) {
    err.statusCode = 404;
    next(err);
  }
};

exports.getNewestAudiosWithSearch = async (req, res, next) => {
  const { querySearch } = req.query;
  const { maxAudios } = req.query;

  try {
    const searchResultAudios = await audioModels.newestAudiosWithSearch({
      querySearch,
      maxAudio: Number(maxAudios),
    });

    console.log(searchResultAudios);

    if (!searchResultAudios.totalAudios) {
      const error = new Error('No Audios Found for this page!');
      error.statusCode = 404;
      throw error;
    }

    return res.json({
      message: 'Get Audios Successfully',
      ...searchResultAudios,
    });
  } catch (err) {
    err.statusCode = 404;
    next(err);
  }
};
