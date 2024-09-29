const { dirname, join } = require('path');
const fs = require('fs');

exports.getAllAudios = async function () {
  const audios = fs.readFileSync(
    join(dirname(require.main.filename), 'audioDb.json')
  );
  return JSON.parse(audios);
};
