const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 4000;
const path = require('path');
const { connectToDatabase } = require('./models/db');

const isAuth = require('./middleware/isAuth');
const existedUserWithRole = require('./middleware/existedUserWithRole');

const categoryRouter = require('./routes/category');
const audioRouter = require('./routes/audio');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const adminAuthRouter = require('./routes/adminAuth');
const { allowedTypes } = require('./helpers/allowedTypesForFile');
const { productionFrontURL, localhostFrontURL } = require('./constants/links');

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per windowMs
// });

const allowedOrigins = [
  'http://103.163.246.130:4001',
  'http://192.168.0.107:3000',
  'http://localhost:3000',
  'https://soundei.com',
  'https://vps-front.soundei.com',
  'http://localhost:3030',
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(limiter);
// app.use(morgan('combined'));
app.use(helmet());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'x-api-key',
      'X-Upload-Path',
    ],
  })
);

// Serve static images
app.use(
  '/images',
  express.static(path.join(__dirname, 'images'), {
    setHeaders: (res, path) => {
      res.setHeader('Cross-Origin-Resource-Policy', 'same-site'); // If on the same domain
    },
  })
);

// Serve audio files with proper CORS and resource policy headers
app.get('/all-audios/preview/:category/:name', (req, res) => {
  const { category, name } = req.params;
  const audioFilePath = path.join(
    __dirname,
    'all-audios',
    'preview',
    category,
    name
  );

  if (!fs.existsSync(audioFilePath)) {
    return res.status(404).send('Audio file not found');
  }

  const stat = fs.statSync(audioFilePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  res.setHeader(
    'Access-Control-Allow-Origin',
    process.env.NODE_ENV === 'production'
      ? productionFrontURL
      : localhostFrontURL
  );
  res.setHeader('Access-Control-Allow-Headers', 'Range');
  res.setHeader(
    'Access-Control-Expose-Headers',
    'Content-Range, Accept-Ranges'
  );
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); // Set CORP header

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const fileStream = fs.createReadStream(audioFilePath, { start, end });

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': 'inline', // Ensure in-browser playback
      'Cache-Control': 'public, max-age=3600', // Allow caching
      'X-Content-Type-Options': 'nosniff',
    });

    fileStream.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': 'inline', // Ensure in-browser playback
      'Cache-Control': 'public, max-age=3600', // Allow caching
      'X-Content-Type-Options': 'nosniff',
    });

    fs.createReadStream(audioFilePath).pipe(res);
  }
});

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  }
  next();
};
app.use(apiKeyMiddleware);

app.use('/auth', authRouter);
app.use('/users', isAuth, existedUserWithRole(), userRouter);
app.use('/audios', audioRouter);
app.use('/category', categoryRouter);
app.use('/admin', adminAuthRouter);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  console.log(error);
  res.status(status).json({ message });
});

async function startServer() {
  try {
    const db = await connectToDatabase();
    app.listen(port, () => {
      console.log(
        `Connected to the database and server is running on port ${port}`
      );
    });
  } catch (error) {
    console.error('Failed to connect to the database. Server not started.');
    process.exit(1); // Exit the process with failure code
  }
}

startServer();
