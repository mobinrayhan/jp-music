const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 4000;
const path = require('path');
const { connectToDatabase } = require('./models/db');

const categoryRouter = require('./routes/category');
const audioRouter = require('./routes/audio');

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per windowMs
// });

// app.use(limiter);
// app.use(morgan('combined'));
app.use(helmet());

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://jp-music.vercel.app/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
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
app.get('/audio-files/preview/:category/:name', (req, res) => {
  const { category, name } = req.params;
  const audioFilePath = path.join(
    __dirname,
    'audio-files',
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

  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

  const allowedOrigins = [
    'https://jp-music.vercel.app',
    'http://localhost:3000',
    'https://soundei.netlify.app',
    'https://soundei.com',
    'https://dev-front.soundei.com',
    'https://dev-admin.soundei.com',
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Headers', 'Range');
  res.setHeader(
    'Access-Control-Expose-Headers',
    'Content-Range, Accept-Ranges'
  );

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

app.use('/audios', audioRouter);
app.use('/category', categoryRouter);

app.use('/', (req, res) => {
  res.json({ message: 'api is working' });
});

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
