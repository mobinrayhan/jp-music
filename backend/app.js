const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;
const path = require('path');
const { connectToDatabase } = require('./model/db');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

app.use(cors());
app.use(limiter);
// app.use(morgan('combined'));
app.use(helmet());

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  }
  next();
};
app.use(apiKeyMiddleware);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/', (req, res) => {
  res.json({ message: 'api is working' });
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
