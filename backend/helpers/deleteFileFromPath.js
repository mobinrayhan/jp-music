const fs = require('node:fs');

function deleteFileFromPath(path) {
  try {
    fs.unlinkSync(path);
  } catch (err) {
    console.error('An error occurred:', err);
    throw new Error(err.message || 'An error occurred');
  }
}
exports.deleteFileFromPath = deleteFileFromPath;
