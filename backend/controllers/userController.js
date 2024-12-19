const audioModel = require('../models/audioModel');
const userModel = require('../models/userModel');
const slugify = require('slugify');
const bcrypt = require('bcryptjs');

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
    const audio = await audioModel.geAudioInfoById(audioId);

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
    const user = await userModel.getUser(userId);
    if (!user) {
      const error = new Error('User Not Found!');
      error.statusCode = 404;
      throw error;
    }

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
    const { favorites } = await userModel.getFavoriteIds(userId);
    return res.json({ favoriteIds: favorites });
  } catch (err) {
    next(err);
  }
};

exports.postCreatePlaylist = async (req, res, next) => {
  const { playlistName } = req.body;
  const slug = slugify(playlistName, {
    lower: true,
    trim: true,
  });
  const userId = req.user.id;

  try {
    const isExistPlaylist = await userModel.getPlaylistBySlug({ slug, userId });
    const uniqueId = crypto.randomUUID();

    await userModel.createPlaylist({
      playlistName,
      slug: isExistPlaylist ? slug + '-' + uniqueId : slug,
      userId,
    });
    return res.json({ message: 'Playlist Created Successfully!' });
  } catch (e) {
    next(e);
  }
};

exports.getPlaylists = async (req, res, next) => {
  const userId = req.user.id;
  const { querySearch, maxPlaylist } = req.query;

  try {
    const { playlists, totalPlaylists } = await userModel.getPlaylists({
      userId,
      querySearch,
      maxPlaylist: +maxPlaylist,
    });

    if (!playlists.length) {
      const error = new Error('No Playlist Found!');
      error.statusCode = 404;
      throw error;
    }

    return res.json({
      message: 'Get Playlist Successfully!',
      playlists,
      totalPlaylists,
    });
  } catch (e) {
    next(e);
  }
};

exports.getPlaylist = async (req, res, next) => {
  const userId = req.user.id;
  const { slug } = req.params;

  try {
    const existedPlaylist = await userModel.getPlaylistBySlug({ userId, slug });

    if (!existedPlaylist) {
      const error = new Error('Playlist not found!');
      error.statusCode = 404;
      throw error;
    }

    return res.json({
      message: 'Get Playlist Successfully!',
      playlist: existedPlaylist,
    });
  } catch (e) {
    next(e);
  }
};

exports.postAddAudioToPlaylist = async (req, res, next) => {
  const userId = req.user.id;
  const { audioId, playlistSlug } = req.body;

  try {
    const existedPlaylist = await userModel.getPlaylistBySlug({
      slug: playlistSlug,
      userId,
    });

    if (!existedPlaylist) {
      const error = new Error('Playlist not found!');
      error.statusCode = 404;
      throw error;
    }

    await userModel.postAddAudioToPlaylist({
      slug: playlistSlug,
      userId,
      audioId,
    });

    return res.json({ message: 'Added Audio To The Playlist Successfully!' });
  } catch (e) {
    next(e);
  }
};

exports.getPlaylistAudios = async (req, res, next) => {
  const userId = req.user.id;
  const { playlistSlug } = req.params;
  const { querySearch, maxAudios } = req.query;

  try {
    const existedPlaylist = await userModel.getPlaylistBySlug({
      slug: playlistSlug,
      userId,
    });
    if (!existedPlaylist) {
      const error = new Error('Playlist not found!');
      error.statusCode = 404;
      throw error;
    }

    const { audios, totalAudios } = await userModel.getAudiosFromPlaylist({
      userId,
      playlistSlug,
      querySearch,
      maxAudios: +maxAudios,
    });

    if (!audios.length) {
      const error = new Error('No Audio Added To The Playlist!');
      error.statusCode = 404;
      throw error;
    }

    return res.json({
      message: 'Get Playlist audio successfully!',
      audios,
      totalAudios,
    });
  } catch (e) {
    next(e);
  }
};

exports.getAllUsersWithSearch = async (req, res, next) => {
  const { querySearch, page, limit } = req.query;
  const skip = (+page - 1) * +limit; // Calculate how many records to skip

  try {
    const { users, totalCount } = await userModel.getAllUsers({
      querySearch,
      skip,
      limit: +limit,
    });

    return res.json({ message: 'Get All Users!', users, totalCount });
  } catch (e) {
    next(e);
  }
};

exports.postUpdateActiveStatus = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const { modifiedCount } = await userModel.toggleActiveStatus(userId);

    if (!modifiedCount) {
      const error = new Error('No Active Status Updated!');
      error.statusCode = 204;
      throw error;
    }
    return res.json({ message: 'Updated Active Status Successfully!' });
  } catch (e) {
    next(e);
  }
};

exports.editUser = async (req, res, next) => {
  const { username, email, password, role } = req.body;

  try {
    const exitingUser = await userModel.getUser(email, {
      playlists: 0,
      downloads: 0,
      favorites: 0,
      createdAt: 0,
      lastLogin: 0,
      isActive: 0,
    });

    let updatedUser;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedUser = {
        username,
        email,
        password: hashedPassword,
        role,
      };
    } else {
      updatedUser = {
        username,
        email,
        password: exitingUser.password,
        role,
      };
    }

    const latestUser = await userModel.updateUser({
      updatedUser,
      input: exitingUser._id.toString(),
    });

    if (latestUser.modifiedCount === 1) {
      res.status(200).json({
        message: 'Updated User successfully!',
        userId: exitingUser._id.toString(),
      });
    } else {
      const error = new Error('Updated User does not match!');
      error.statusCode = 404;
      throw error;
    }
  } catch (e) {
    next(e);
  }
};

exports.getDisabledUsers = async (req, res, next) => {
  const { querySearch, page, limit } = req.query;
  const skip = (+page - 1) * +limit; // Calculate how many records to skip

  try {
    const { disabledUsers, totalCount } = await userModel.getAllDisabledUsers({
      querySearch,
      skip,
      limit: +limit,
    });

    console.log(disabledUsers);
    return res.json({
      message: 'Get All Disabled Users!',
      disabledUsers,
      totalCount,
    });
  } catch (e) {
    next(e);
  }
};
