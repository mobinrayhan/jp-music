const { updateGeneral, getGeneral } = require('../models/settingsModel');
const { dirname } = require('path');
const path = require('node:path');
const { deleteFileFromPath } = require('../helpers/deleteFileFromPath');

exports.updateGeneral = async (req, res, next) => {
  const { facebook, instagram, twitter, youtube } = req.body;
  const file = req.file;
  const uploadPath = req.headers['x-upload-path'];

  try {
    const general = await getGeneral();
    const logo = general?.find((gen) => gen.name === 'Logo')?.link;

    const appDir = dirname(require.main.filename);
    const imageDir = path.join(appDir, logo);

    let logoUrl;

    if (file?.filename) {
      deleteFileFromPath(imageDir);
      logoUrl = uploadPath + '/' + file.filename;
    } else {
      logoUrl = logo;
    }

    const links = req.body;
    const transformToArray = Object.entries(links).map(([name, link]) => ({
      name,
      link,
      type: 'link',
    }));

    const finalData = [
      ...transformToArray,
      { link: logoUrl, name: 'Logo', type: 'image' },
    ];

    await updateGeneral(finalData);

    res.json({ message: 'Settings Update Successfully!' });
  } catch (err) {
    next(err);
  }
};

exports.getGeneral = async (req, res, next) => {
  try {
    const general = await getGeneral();

    res.json({ message: 'Get General successfully!', general });
  } catch (e) {
    next(e);
  }
};
