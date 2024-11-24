const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { allowedTypes } = require('../helpers/allowedTypesForFile');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = req.headers['x-upload-path'] || 'uploads'; // Use custom header
    const fullPath = path.join(__dirname, '../', uploadPath);

    // Ensure the directory exists
    fs.mkdirSync(fullPath, { recursive: true });

    cb(null, fullPath); // Set the upload destination
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${crypto.randomUUID()}-soundei`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 50 }, // 50 MB
  fileFilter: (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          'Invalid file type. Only specific audio, zip, and image files are allowed.'
        )
      );
    }
  },
});

exports.upload = upload;
