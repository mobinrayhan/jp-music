const audioModels = require('../models/audioModel');

exports.getAllAudios = async function (req, res, next) {
  const allAudios = await audioModels.getAllAudios();
  return res.json({ message: 'Get Audio Successfully', allAudios });
};
