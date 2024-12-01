const audioModels = require('../models/audioModel');
const path = require('node:path');
const fs = require('node:fs');
const { stringToKeywords } = require('../helpers/stringToKeywords');
const { deleteFileFromPath } = require('../helpers/deleteFileFromPath');

const appDir = path.dirname(require.main.filename);

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

    if (!catWithSearchResult.totalAudios) {
      const error = new Error('No Audios Found !');
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
    const newestAudioWithSearch = await audioModels.newestAudiosWithSearch({
      querySearch,
      maxAudio: Number(maxAudios),
    });

    if (!newestAudioWithSearch.totalAudios) {
      const error = new Error('No Audios Found for this page!');
      error.statusCode = 404;
      throw error;
    }

    return res.json({
      message: 'Get Audios Successfully',
      ...newestAudioWithSearch,
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
    // const
    const audio = await audioModels.postDownloadAudio(audioId, user.id);
    if (!audio) {
      const error = new Error('No Audios Found!');
      error.statusCode = 404;
      throw error;
    }

    const filePath = path.join(
      path.dirname(require.main.filename),
      audio.previewURL
    );

    if (!fs.existsSync(filePath)) {
      const error = new Error('File not found on the server!');
      error.statusCode = 404;
      throw error;
    }

    res.download(filePath, audio.name, (err) => {
      if (err) {
        const error = new Error('Error downloading the file!');
        error.statusCode = 404;
        next(error);
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getAudioById = async (req, res, next) => {
  try {
    const audioId = req.params.id;
    const audio = await audioModels.geAudioInfoById(audioId);
    return res.json({ message: 'Get Audio by ID Successfully', audio });
  } catch (e) {
    next(e);
  }
};

exports.postUploadAudios = async (req, res, next) => {
  try {
    const { files } = req;
    if (!files) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const metadata = JSON.parse(req.body.metadata);
    const uploadPath = req.headers['x-upload-path'];

    const fileRecords = files.map((file) => {
      const mdata = Array.isArray(metadata)
        ? metadata.find((meta) => meta.id === file.originalname)
        : metadata;

      if (!mdata) {
        throw new Error(`Metadata not found for file ${file.originalname}`);
      }

      return {
        name: mdata.name,
        previewURL: `${uploadPath}/${file.filename}`,
        category: uploadPath.split('/')[2].trim(),
        keywords: stringToKeywords(mdata?.keywords),
        createdAt: new Date(),
      };
    });

    await audioModels.postUploadAudios(fileRecords);

    return res.status(200).json({
      message: 'Files uploaded and saved successfully',
      data: fileRecords,
    });
  } catch (error) {
    next(error);
  }
};

exports.postEditAudio = async (req, res, next) => {
  const { audioId, keywords, category, name } = req.body;
  const file = req.file;
  const uploadPath = req.headers['x-upload-path'];

  try {
    const audio = await audioModels.geAudioInfoById(audioId);

    if (!audio) {
      const error = new Error('No Audios Found!');
      error.statusCode = 404;
      throw error;
    }

    let previewURL;

    if (category !== audio.category) {
      const oldPath = path.join(appDir, audio.previewURL);
      const audioPathParts = audio.previewURL.split('/'); // Split the path into parts
      const fileName = audioPathParts[audioPathParts.length - 1]; // Get the file name
      const newDir = path.join(appDir, uploadPath); // New directory
      const newPath = path.join(newDir, fileName); // Full path including file name

      // Ensure the destination directory exists
      if (!fs.existsSync(newDir)) {
        fs.mkdirSync(newDir, { recursive: true });
      }

      // Move the file
      fs.renameSync(oldPath, newPath);
      previewURL = `${uploadPath}/${fileName}`;
    }

    if (file) {
      const audioPath = path.join(appDir, audio.previewURL);
      deleteFileFromPath(audioPath);
      previewURL = `${uploadPath}/${file.filename}`;
    }

    const updatedAudio = {
      keywords: stringToKeywords(keywords),
      category,
      name,
      previewURL: previewURL || audio.previewURL,
    };

    const updatedDoc = await audioModels.postUpdateAudio(audioId, updatedAudio);

    if (updatedDoc.modifiedCount === 1 || updatedDoc.matchedCount === 1) {
      return res.json({ message: 'Updated Audio Successfully!' });
    }
  } catch (e) {
    next(e);
  }
};
