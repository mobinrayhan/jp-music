const audioModel = require('../models/userModel');
exports.getDownloadsById = async function (req, res, next) {
  const id = req.params.id;
  try {
    const audioList = await audioModel.getDownloadsById(id);
    return res.json({ audios: audioList });
  } catch (e) {
    next(e);
  }
};
