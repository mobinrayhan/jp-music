const audioModels = require('../models/audioModel');
const path = require('node:path');

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
    const catWithSearchResult = await audioModels.categoryAudiosWithSearch({
      querySearch: querySearch.trim(),
      category,
      maxAudio: Number(maxAudios),
    });

    console.log(catWithSearchResult);
    if (!catWithSearchResult.totalAudios) {
      const error = new Error('No Audios Found of this category!');
      error.statusCode = 404;
      throw error;
    }

    return res.json({
      message: 'Get Category Audios Successfully',
      ...catWithSearchResult,
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
    const newesAudioWithSearch = await audioModels.newestAudiosWithSearch({
      querySearch,
      maxAudio: Number(maxAudios),
    });

    console.log(newesAudioWithSearch);

    if (!newesAudioWithSearch.totalAudios) {
      const error = new Error('No Audios Found for this page!');
      error.statusCode = 404;
      throw error;
    }

    return res.json({
      message: 'Get Audios Successfully',
      ...newesAudioWithSearch,
    });
  } catch (err) {
    err.statusCode = 404;
    next(err);
  }
};

exports.postDownloadAudio = async (req, res, next) => {
  const audioId = req.query.id;
  const user = req.user;

  try {
    const audio = await audioModels.downloadAudio(audioId);
    if (!audio) {
      const error = new Error('No Audios Found!');
      error.statusCode = 404;
      throw error;
    }

    const filePath = path.join(
      path.dirname(require.main.filename),
      audio.previewURL
    );
    res.download(filePath, audio.name, (err) => {
      if (err) {
        console.log(err);
        const error = new Error('Error downloading the file!');
        error.statusCode = 404;
        next(error);
      }
    });

    console.log(
      req.user,
      audio,
      path.join(path.dirname(require.main.filename), audio.previewURL)
    );
  } catch (err) {
    next(err);
  }
};
