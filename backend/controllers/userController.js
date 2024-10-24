const audioModel = require('../models/audioModel');
const userModel = require('../models/userModel');

exports.getDownloads = async function (req, res, next) {
  const { maxAudios, querySearch } = req.query;
  const userId = req.user.id;

  try {
    const audioInfo = await userModel.getDownloadsById({
      userId,
      maxAudios: Number(maxAudios),
      querySearch,
    });

    return res.json({
      message: 'Get downloads by audio list successfully',
      ...audioInfo,
    });
  } catch (e) {
    next(e);
  }
};

exports.postToggleFavourites = async function (req, res, next) {
  const { audioId } = req.body;
  const userId = req.user.id;

  try {
    const user = await userModel.getUserById(userId);
    const audio = await audioModel.geAudioInfoById(audioId);

    if (!user) {
      const error = new Error('User Not Found!');
      error.statusCode = 404;
      throw error;
    }

    if (!audio) {
      const error = new Error('Audio Not Found!');
      error.statusCode = 404;
      throw error;
    }

    const { message } = await userModel.postToggleFavourites({
      audioId,
      userId,
    });

    return res.json({ message });
  } catch (e) {
    next(e);
  }
};

exports.getFavorites = async function (req, res, next) {
  const userId = req.user.id;
  const { maxAudios, querySearch } = req.query;

  try {
    const favorites = await userModel.getFavorites({
      userId,
      maxAudios: Number(maxAudios),
      querySearch,
    });

    if (!favorites.length) {
      const error = new Error("You Don't have Favorite Audio! Please Add!");
      error.statusCode = 404;
      throw error;
    }

    return res.json({
      message: 'Favorite Audio Get Successfully',
      audios: favorites,
    });
  } catch (e) {
    next(e);
  }
};

exports.getFavoriteIds = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await userModel.getUserById(userId);
    if (!user) {
      const err = new Error('User Not Found!');
      err.statusCode = 404;
      throw err;
    }
    const { favorites } = await userModel.getFavoriteIds(userId);
    return res.json({ favoriteIds: favorites });
  } catch (err) {
    next(err);
  }
};
