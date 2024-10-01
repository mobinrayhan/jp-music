const audioModels = require('../models/audioModel');

exports.getAllAudios = async function (req, res, next) {
  const allAudios = await audioModels.getAllAudios();
  return res.json({ message: 'Get Audio Successfully', allAudios });
};

exports.getAudiosByCategory = async (req, res, next) => {
  const { category } = req.params;
  const allAudios = await audioModels.getAllAudios();

  const categoryAudios = allAudios.filter(
    (audio) => audio.category === category
  );

  if (!categoryAudios.length) {
    return res.status(404).json({ message: 'No category found' });
  }

  return res.json({
    message: 'Get Category Audio Successfully',
    allAudios: categoryAudios,
  });
};
