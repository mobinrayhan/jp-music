const { updateGeneral, getGeneral } = require('../models/settingsModel');
const { dirname } = require('path');
const path = require('node:path');
const { deleteFileFromPath } = require('../helpers/deleteFileFromPath');

exports.updateGeneral = async (req, res, next) => {
  const { facebook, instagram, twitter } = req.body;
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

    const finalData = [
      { link: facebook, name: 'Facebook', type: 'link' },
      { link: instagram, name: 'Instagram', type: 'link' },
      { link: twitter, name: 'Twitter', type: 'link' },
      { link: logoUrl, name: 'Logo', type: 'image' },
    ];

    const data = await updateGeneral(finalData);

    res.json({ message: 'Settings Controller Update' });
  } catch (err) {
    next(err);
  }
};
