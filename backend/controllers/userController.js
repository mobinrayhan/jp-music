const audioModel = require('../models/userModel');
exports.getDownloadsById = async function (req, res, next) {
  const id = req.params.id;
  const { maxAudios, querySearch } = req.query;

  try {
    const audioInfo = await audioModel.getDownloadsById({
      userId: id,
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
